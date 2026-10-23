import { useMemo, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import Fader from '@/components/site/Fader';
import { Image } from '@/components/ui/image';
import useMixerAudio from '@/lib/useMixerAudio';

export default function AdaptiveMixer({ session }) {
  const stems = session.stems || [];
  const initial = useMemo(
    () =>
      Object.fromEntries(
        stems.map((stem, i) => [
          stem.id,
          typeof stem.default_level === 'number' ? stem.default_level : 0.5,
        ])
      ),
    [stems]
  );

  const [levels, setLevels] = useState(initial);
  const [preset, setPreset] = useState('manual');
  const [error, setError] = useState(null);
  const presets = session.presets || [];
  const audio = useMixerAudio(stems);

  const average = stems.length
    ? stems.reduce((sum, stem) => sum + (levels[stem.id] ?? 0), 0) / stems.length
    : 0;

  const handleLevel = (id, value) => {
    setLevels((prev) => ({ ...prev, [id]: value }));
    setPreset('manual');
    audio.setLevel(id, value);
  };

  const applyPreset = (option) => {
    setLevels(option.levels);
    setPreset(option.id);
    audio.rampLevels(option.levels);
  };

  const toggleTransport = async () => {
    if (audio.playing) {
      audio.stop();
      return;
    }
    setError(null);
    try {
      const started = await audio.start(levels);
      if (!started) setError('Audio could not start — check the stem files.');
    } catch {
      setError('Audio could not load — check the stem files.');
    }
  };

  const activeLayers = stems.filter((stem) => (levels[stem.id] ?? 0) > 0.35).length;

  return (
    <section id="mixer" className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,hsl(var(--primary)/0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <span className="hud-label">02</span>
              <span className="h-px w-10 bg-border" />
              <span className="hud-label text-signal">Live mix</span>
            </div>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.7rem,3.2vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              {session.title}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {session.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTransport}
              disabled={!audio.hasAudio || audio.loading}
              className={`flex items-center gap-3 border-2 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.14em] transition-all ${
                audio.hasAudio
                  ? 'border-primary bg-primary text-primary-foreground shadow-[4px_4px_0_0_hsl(40_12%_44%/0.35)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none'
                  : 'cursor-not-allowed border-border bg-card text-muted-foreground'
              }`}
            >
              {audio.playing ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="ml-0.5 h-3.5 w-3.5" />
              )}
              {audio.loading
                ? 'Loading'
                : audio.playing
                  ? 'Stop mix'
                  : audio.hasAudio
                    ? 'Play mix'
                    : 'Stems pending'}
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
          {/* Scene monitor */}
          <div className="bevel-in relative flex min-h-[280px] flex-col justify-between overflow-hidden border-2 border-border bg-card p-6 sm:min-h-[360px]">
            <div className="absolute inset-0 tech-grid opacity-30" />
            {session.scene_url &&
              (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(session.scene_url) ? (
                <video
                  src={session.scene_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
              ) : (
                <Image
                  src={session.scene_url}
                  alt=""
                  fittingType="fill"
                  className="absolute inset-0 h-full w-full object-cover opacity-35"
                />
              ))}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 60%, hsl(var(--primary) / 0.16), transparent 65%)',
                opacity: 0.4 + average * 0.8,
              }}
            />

            <div className="relative flex items-center justify-between">
              <span className="hud-label">Cue / Ice Caves</span>
              <span className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-signal">
                <span
                  className="h-2 w-2 bg-signal"
                  style={{ animation: 'signal-pulse 1.6s ease-in-out infinite' }}
                />
                {audio.playing ? 'Running' : 'Idle'}
              </span>
            </div>

            <div className="relative mt-10 flex flex-1 items-center justify-center gap-[3px] px-2">
              {Array.from({ length: 40 }).map((_, i) => {
                const phase = Math.sin((i / 40) * Math.PI);
                const h = 8 + phase * (18 + average * 150);
                return (
                  <span
                    key={i}
                    className="w-full rounded-full bg-primary/60 transition-[height] duration-300"
                    style={{
                      height: `${h}px`,
                      animation: audio.playing
                        ? `wave ${1.6 + (i % 5) * 0.2}s ease-in-out ${i * 0.02}s infinite`
                        : 'none',
                    }}
                  />
                );
              })}
            </div>

            <div className="relative mt-8 grid grid-cols-3 gap-4 border-t border-border pt-4">
              <div>
                <div className="hud-label">Intensity</div>
                <div className="mt-1 font-mono text-sm text-primary">
                  {Math.round(average * 100)}%
                </div>
              </div>
              <div>
                <div className="hud-label">Layers</div>
                <div className="mt-1 font-mono text-sm text-primary">
                  {activeLayers} / {stems.length}
                </div>
              </div>
              <div>
                <div className="hud-label">Sync</div>
                <div className="mt-1 font-mono text-sm text-primary">
                  {audio.playing ? 'Locked' : 'Standby'}
                </div>
              </div>
            </div>
          </div>

          {/* Console */}
          <div className="bevel-out border-2 border-border bg-panel p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="hud-label">Mix console</span>
              <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                {preset === 'manual' ? 'Manual' : preset}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {stems.map((stem, i) => (
                <Fader
                  key={stem.id}
                  index={i + 1}
                  label={stem.label}
                  hint={stem.hint}
                  value={levels[stem.id] ?? 0}
                  onChange={(v) => handleLevel(stem.id, v)}
                />
              ))}
            </div>

            <div className="mt-8 border-t border-border pt-5">
              <div className="hud-label">Game state presets</div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {presets.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => applyPreset(option)}
                    className={`border-2 px-2 py-2 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors ${
                      preset === option.id
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-[0.08em] text-muted-foreground">
                {audio.hasAudio
                  ? 'Drag the faders — every layer is the same cue, re-voiced by state.'
                  : 'Add stem files in the Studio to hear the console.'}
              </p>
              {error && (
                <p className="mt-2 font-mono text-[11px] tracking-[0.08em] text-signal">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}