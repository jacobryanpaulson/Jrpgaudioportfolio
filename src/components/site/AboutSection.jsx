const SPECS = [
  { label: 'Focus', value: 'Adaptive music systems, SFX, Sound design' },
  { label: 'Middleware', value: 'Wwise · FMOD · Unreal · Unity' },
  { label: 'Tools', value: 'Pro Tools · Izotope RX · Melodyne · GitHub' },
  { label: 'Implementation', value: 'State machines, transitions, dynamic audio, adaptive music' },
];

export default function AboutSection({ profile }) {
  return (
    <section id="about" className="border-b-2 border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-20">
          <div>
            <div className="flex items-center gap-4">
              <span className="hud-label">05</span>
              <span className="h-px w-10 bg-border" />
            </div>
            <h2 className="mt-4 max-w-md font-display text-[clamp(1.7rem,3.2vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              Built for the
              <br />
              reactive moment
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {profile.about}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                {profile.location}
              </span>
              <span className="h-px w-8 bg-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                Available for full-time roles
              </span>
            </div>
          </div>

          <div className="relative border-2 border-border">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              {profile.about_photo_url && (
                <img
                  src={profile.about_photo_url}
                  alt={`${profile.name} portrait`}
                  className="absolute inset-0 h-full w-full object-cover opacity-95"
                />
              )}
              <div className="absolute inset-0 tech-grid opacity-20" />
              <div className="absolute inset-0 bg-[linear-gradient(200deg,hsl(var(--primary)/0.18),transparent_55%)]" />
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="flex items-start justify-between">
                  <span className="hud-label">Fig. 01</span>
                  <span className="hud-label">About Me</span>
                </div>
                <div className="flex items-end gap-[3px]">
                  {Array.from({ length: 26 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-full bg-primary/50"
                      style={{
                        height: `${20 + Math.abs(Math.sin(i * 0.6)) * 90}px`,
                        animation: `wave ${2.4 + (i % 6) * 0.2}s ease-in-out ${i * 0.03}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <dl className="divide-y divide-border">
              {SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-4"
                >
                  <dt className="hud-label whitespace-nowrap pt-1">{spec.label}</dt>
                  <dd className="min-w-0 break-words text-sm leading-relaxed text-foreground/90">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}