import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Mixer', href: '#mixer' },
  { label: 'Work', href: '#work' },
  { label: 'Adaptive music', href: '#sfx' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function SiteHeader({ profile }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? 'border-b-2 border-border bg-background/90 backdrop-blur-md'
          : 'border-b-2 border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="h-2.5 w-2.5 bg-primary" />
          <span className="font-heading text-[13px] font-semibold uppercase tracking-[0.16em] text-foreground">
            {profile.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="flex items-center gap-2 border-2 border-border bg-card px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <span
            className="h-2 w-2 bg-primary"
            style={{ animation: 'signal-pulse 2.4s ease-in-out infinite' }}
          />
          Open
        </a>
      </div>
    </header>
  );
}