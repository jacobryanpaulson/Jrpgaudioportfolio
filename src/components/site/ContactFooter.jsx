import { ArrowUpRight, Mail } from 'lucide-react';

export default function ContactFooter({ profile }) {
  const links = profile.links || [];

  return (
    <footer id="contact" className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-25" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-center gap-4">
          <span className="hud-label">06</span>
          <span className="h-px w-10 bg-border" />
        </div>

        <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.3rem)] font-semibold leading-[1.04] tracking-[-0.025em]">
          Hiring for game audio? 
          Let's talk.
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="bevel-out border-2 border-border bg-card p-6">
            <div className="hud-label">Status</div>
            <div className="mt-2 flex items-center gap-2 font-mono text-sm text-primary">
              <span
                className="h-2 w-2 bg-primary"
                style={{ animation: 'signal-pulse 2s ease-in-out infinite' }}
              />
              Available for deployment
            </div>
          </div>
          <div className="bevel-out border-2 border-border bg-card p-6">
            <div className="hud-label">Location</div>
            <div className="mt-2 font-mono text-sm text-foreground">
              {profile.location}
            </div>
          </div>
          <div className="bevel-out border-2 border-border bg-card p-6">
            <div className="hud-label">Reel / resume</div>
            <div className="mt-2 font-mono text-sm text-foreground">
              {profile.resume_url ? (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  Download PDF <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="text-muted-foreground">Available on request</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-8 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`mailto:jrpgaudio@gmail.com`}
            className="group inline-flex items-center gap-3 font-heading text-[19px] font-semibold tracking-[-0.01em] transition-colors hover:text-primary sm:text-[24px]"
          >
            <Mail className="h-5 w-5 text-primary" />
            jrpgaudio@gmail.com
            <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>

          <div className="flex flex-wrap items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <span className="hud-label">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <div className="flex items-center gap-6">
            <span className="hud-label">Sound design portfolio — built for play</span>
          </div>
        </div>
      </div>
    </footer>
  );
}