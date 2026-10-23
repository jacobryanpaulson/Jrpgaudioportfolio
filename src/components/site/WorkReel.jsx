import { useEffect, useState } from 'react';
import { Play, X } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function WorkReel({ videos }) {
  const [open, setOpen] = useState(null);
  const [playError, setPlayError] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="work" className="relative border-b-2 border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <span className="hud-label">03</span>
              <span className="h-px w-10 bg-border" />
            </div>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              Reels &amp; cuts
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            SFX and cinematic mixes — each built as a system,
            not a single pass.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <button
              key={video.id}
              type="button"
              onClick={() => {
                setPlayError(false);
                setOpen(video);
              }}
              className="bevel-out group relative flex flex-col border-2 border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/70"
            >
              <div className="relative mb-6 aspect-video w-full overflow-hidden border-2 border-border bg-secondary/40">
                {video.poster_url ? (
                  <Image
                    src={video.poster_url}
                    alt=""
                    fittingType="fill"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : video.media_url ? (
                  <video
                    src={video.media_url}
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(e) => {
                      e.currentTarget.currentTime = 0.2;
                    }}
                    className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="absolute inset-0 tech-grid opacity-60" />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(160deg,hsl(var(--primary)/0.16),transparent_55%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center border-2 border-primary bg-background/70 text-primary backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 h-4 w-4" />
                  </span>
                </div>
                <span className="absolute left-3 top-3 font-mono text-[12px] tracking-[0.12em] text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {video.duration && (
                  <span className="absolute bottom-3 right-3 border border-border bg-background/90 px-2 py-0.5 font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
                    {video.duration}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span className="hud-label text-primary">{video.category}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-[-0.015em]">
                {video.title}
              </h3>
              {video.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {video.description}
                </p>
              )}
              {video.engine && (
                <span className="mt-5 inline-flex w-fit border border-border bg-panel px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {video.engine}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative w-full max-w-5xl border-2 border-border bg-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute -top-12 right-0 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-foreground hover:text-primary"
            >
              Close <X className="h-4 w-4" />
            </button>
            <div className="aspect-video w-full bg-background">
              {open.media_url && !playError ? (
                <video
                  key={open.id}
                  src={open.media_url}
                  poster={open.poster_url || undefined}
                  controls
                  playsInline
                  muted={false}
                  onLoadedMetadata={(e) => {
                    e.currentTarget.volume = 1;
                  }}
                  onError={() => setPlayError(true)}
                  className="h-full w-full"
                />
              ) : open.media_url ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 tech-grid px-6 text-center">
                  <span className="hud-label">This browser can&apos;t play the file</span>
                  <a
                    href={open.media_url}
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-border bg-card px-4 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    Open the reel
                  </a>
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 tech-grid">
                  <span className="hud-label">No file attached</span>
                  <p className="max-w-sm px-6 text-center text-sm text-muted-foreground">
                    Add a video URL in sampleContent.js to play this reel.
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-4">
              <h3 className="font-display text-lg">{open.title}</h3>
              <span className="hud-label">{open.engine}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}