import { useCallback, useEffect, useRef, useState } from 'react';

const toVolume = (v) => Math.min(1, Math.pow(Math.max(0, Math.min(1, v ?? 0)), 1.5));

/**
 * Decode every stem before playback and start Web Audio loop sources together.
 * This avoids HTML media loop gaps and periodic seeking to correct drift.
 */
export default function useMixerAudio(stems) {
  const contextRef = useRef(null);
  const buffersRef = useRef(new Map());
  const nodesRef = useRef({});
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasAudio = stems.some((s) => s.audio_url);

  const clear = useCallback(() => {
    Object.values(nodesRef.current).forEach(({ source, gain }) => {
      source.stop();
      source.disconnect();
      gain.disconnect();
    });
    nodesRef.current = {};
  }, []);

  const stop = useCallback(() => {
    clear();
    setPlaying(false);
  }, [clear]);

  const start = useCallback(
    async (levels) => {
      const playable = stems.filter((s) => s.audio_url);
      if (!playable.length) return false;

      clear();
      setLoading(true);

      try {
        const AudioContextClass = window.AudioContext;
        if (!AudioContextClass) throw new Error('Web Audio is not supported by this browser.');

        const context = contextRef.current || new AudioContextClass();
        contextRef.current = context;
        if (context.state === 'suspended') await context.resume();

        const decoded = await Promise.all(
          playable.map(async (stem) => {
            let buffer = buffersRef.current.get(stem.audio_url);
            if (!buffer) {
              const response = await fetch(stem.audio_url);
              if (!response.ok) {
                throw new Error(`Could not load audio file: ${stem.audio_url}`);
              }
              buffer = await context.decodeAudioData(await response.arrayBuffer());
              buffersRef.current.set(stem.audio_url, buffer);
            }
            return { stem, buffer };
          })
        );

        const startAt = context.currentTime + 0.05;
        decoded.forEach(({ stem, buffer }) => {
          const source = context.createBufferSource();
          const gain = context.createGain();
          source.buffer = buffer;
          source.loop = true;
          gain.gain.setValueAtTime(
            toVolume(levels?.[stem.id] ?? stem.default_level ?? 0.5),
            startAt
          );
          source.connect(gain);
          gain.connect(context.destination);
          source.start(startAt);
          nodesRef.current[stem.id] = { source, gain };
        });
        setPlaying(true);
        return true;
      } finally {
        setLoading(false);
      }
    },
    [stems, clear]
  );

  const setLevel = useCallback((id, value) => {
    const gain = nodesRef.current[id]?.gain;
    if (gain && contextRef.current) {
      gain.gain.setValueAtTime(toVolume(value), contextRef.current.currentTime);
    }
  }, []);

  const rampLevels = useCallback((levels, ms = 900) => {
    const context = contextRef.current;
    if (!context) return;
    const now = context.currentTime;
    Object.entries(levels).forEach(([id, value]) => {
      const param = nodesRef.current[id]?.gain.gain;
      if (!param) return;
      param.cancelScheduledValues(now);
      param.setValueAtTime(param.value, now);
      param.linearRampToValueAtTime(toVolume(value), now + ms / 1000);
    });
  }, []);

  useEffect(
    () => () => {
      clear();
      if (contextRef.current && contextRef.current.state !== 'closed') {
        contextRef.current.close();
      }
      contextRef.current = null;
    },
    [clear]
  );

  return { playing, loading, hasAudio, start, stop, setLevel, rampLevels };
}