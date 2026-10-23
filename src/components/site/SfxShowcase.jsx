import { useMemo, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const BAR_HEIGHTS = Array.from({ length: 56 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 0.55) * 0.5 + Math.sin(i * 0.19 + 2.1) * 0.5);
  return 0.18 + v * 0.82;
});

export default function SfxShowcase({ items }) {
  const audioRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playError, setPlayError] = useState(false);

  const playable = useMemo(() => items.some((i) => i.audio_url), [items]);

  const toggle = (item) => {
    if (!item.audio_url) return;
    const el = audioRef.current;
    if (!el) return;
    if (selectedId === item.id && !el.paused) {
      el.pause();
      return;
    }
    if (selectedId !== item.id) {
      el.src = item.audio_url;
      el.currentTime = 0;
      setCurrentTime(0);
      setDuration(0);
      setSelectedId(item.id);
    }
    el.volume = volume;
    setPlayError(false);
    el.play().catch(() => setPlayError(true));
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const updateVolume = (event) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    if (audioRef.current) audioRef.current.volume = nextVolume;
  };

  const seek = (event) => {
    const nextTime = Number(event.target.value);
    setCurrentTime(nextTime);
    if (audioRef.current) audioRef.current.currentTime = nextTime;
  };

  return (
    <section id="sfx" className="relative border-b-2 border-border bg-panel/40">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <span className="hud-label">04</span>
              <span className="h-px w-10 bg-border" />
            </div>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3.2vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
            Adaptive music
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Cues, ambiences and full tracks in one bank — each built from layers
              for adaptive playback. Click the play buttons to preview the audio.
            </p>
            



















            
          </div>

          <div className="divide-y-2 divide-border border-y-2 border-border">
            {items.map((item, i) => {
              const isSelected = selectedId === item.id;
              const isActive = isSelected && playing;
              return (
                <div key={item.id} className="py-5">
                  <div className="group flex items-center gap-4 sm:gap-6">
                    <button
                      type="button"
                      onClick={() => toggle(item)}
                      disabled={!item.audio_url}
                      aria-label={isActive ? 'Pause' : 'Play'}
                      className={`flex h-11 w-11 shrink-0 items-center justify-center border-2 transition-colors ${
                        item.audio_url
                          ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                          : 'cursor-not-allowed border-border text-muted-foreground/50'
                      }`}
                    >
                      {isActive ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="ml-0.5 h-4 w-4" />
                      )}
                    </button>

                    <div className="flex h-10 flex-1 items-center gap-[2px] overflow-hidden">
                      {BAR_HEIGHTS.map((h, idx) => (
                        <span
                          key={idx}
                          className={`flex-1 origin-center transition-colors ${
                            isActive ? 'bg-primary/70' : 'bg-muted-foreground/30'
                          }`}
                          style={{ height: `${h * 100}%` }}
                        />
                      ))}
                    </div>

                    <div className="w-40 shrink-0 text-right sm:w-56">
                      <div className="font-heading text-[15px] font-semibold leading-tight tracking-[-0.01em]">
                        {item.title}
                      </div>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {[item.category, item.duration].filter(Boolean).join(' · ')}
                      </div>
                    </div>

                    <span className="hidden w-6 shrink-0 font-mono text-[12px] text-muted-foreground lg:block">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="mt-5 grid gap-4 pl-14 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-center sm:pl-16">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                          {formatTime(currentTime)}
                        </span>
                        <input
                          type="range"
                          min="0"
                          max={duration || 0}
                          step="0.01"
                          value={Math.min(currentTime, duration || 0)}
                          onChange={seek}
                          disabled={!duration}
                          aria-label={`Seek ${item.title}`}
                          className="h-2 w-full cursor-pointer accent-primary disabled:cursor-not-allowed"
                        />
                        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                          {formatTime(duration)}
                        </span>
                      </div>
                      <label className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                        Volume
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={updateVolume}
                          aria-label={`Volume for ${item.title}`}
                          className="h-2 min-w-0 flex-1 cursor-pointer accent-primary"
                        />
                        <span className="w-9 text-right tabular-nums">
                          {Math.round(volume * 100)}%
                        </span>
                      </label>
                      {playError && (
                        <p role="alert" className="font-mono text-[11px] text-signal sm:col-span-2">
                          Audio could not be played. Check the file and try again.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {!playable &&
            <p className="py-5 font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                Files pending upload — add them in the Studio
              </p>
            }
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setCurrentTime(0);
        }}
        onError={() => setPlayError(true)}
        className="hidden"
      />
    </section>);

}