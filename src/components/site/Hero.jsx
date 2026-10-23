import { useMemo } from 'react';
import { ArrowDownRight } from 'lucide-react';

export default function Hero({ profile }) {
  const bars = useMemo(
    () =>
      Array.from({ length: 84 }, (_, i) => {
        const v =
          Math.abs(Math.sin(i * 0.37) * 0.6 + Math.sin(i * 0.11 + 1.7) * 0.4) * 0.9 +
          0.1;
        return v;
      }),
    []
  );

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,hsl(var(--primary)/0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="hud-label">01 </span>
          <span className="h-px w-10 bg-border" />
          <span className="hud-label text-primary">{profile.role_line}</span>
        </div>

        <h1 className="mt-8 max-w-4xl font-display text-[clamp(2rem,4.8vw,3.9rem)] font-semibold leading-[1.04] tracking-[-0.025em]">
          {profile.headline}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            {profile.intro}
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="#mixer"
              className="group flex items-center justify-between gap-4 border-2 border-primary bg-primary px-5 py-3 font-mono text-[13px] uppercase tracking-[0.14em] text-primary-foreground shadow-[4px_4px_0_0_hsl(40_12%_44%/0.35)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_hsl(40_12%_44%/0.35)]"
            >
              Enter the mixer
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#work"
              className="group flex items-center justify-between gap-4 border-2 border-border bg-card px-5 py-3 font-mono text-[13px] uppercase tracking-[0.14em] text-foreground transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[2px_2px_0_0_hsl(var(--primary)/0.3)]"
            >
              View work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="relative mt-14 border-y-2 border-border py-6">
          <div className="flex h-28 items-center gap-[3px] sm:h-36">
            {bars.map((v, i) => (
              <div
                key={i}
                className="flex-1 origin-center bg-primary/60"
                style={{
                  height: `${v * 100}%`,
                  animation: `wave ${2.6 + (i % 7) * 0.18}s ease-in-out ${i * 0.014}s infinite`,
                }}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="hud-label">48 kHz / 24-bit · Wwise · FMOD · Unreal</span>
            <span className="hud-label">
              Reel 01 — adaptive systems &amp; sound
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}