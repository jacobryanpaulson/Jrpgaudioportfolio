import { useRef } from 'react';

export default function Fader({ value, onChange, label, hint, index }) {
  const trackRef = useRef(null);
  const draggingRef = useRef(false);

  const updateFromEvent = (e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = 1 - (e.clientY - rect.top) / rect.height;
    const next = Math.round(Math.min(1, Math.max(0, ratio)) * 100) / 100;
    onChange(next);
  };

  const onPointerDown = (e) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromEvent(e);
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    updateFromEvent(e);
  };

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 0.1 : 0.02;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      e.preventDefault();
      onChange(Math.min(1, Math.round((value + step) * 100) / 100));
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      e.preventDefault();
      onChange(Math.max(0, Math.round((value - step) * 100) / 100));
    }
  };

  const pct = Math.round(value * 100);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full items-baseline justify-between">
        <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
          {String(index).padStart(2, '0')}
        </span>
        <span
          className={`font-mono text-[12px] tabular-nums ${
            value > 0.75 ? 'text-signal' : 'text-primary'
          }`}
        >
          {value <= 0 ? '-∞' : `${pct}%`}
        </span>
      </div>

      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label={`${label} level`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
        onKeyDown={onKeyDown}
        className="relative h-52 w-full cursor-pointer touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:h-60"
      >
        <div className="absolute inset-x-3 inset-y-0 border-2 border-border bg-background/80" />
        <div className="pointer-events-none absolute inset-y-0 left-3 right-3">
          {[0, 25, 50, 75, 100].map((tick) => (
            <span
              key={tick}
              className="absolute left-0 h-px w-2 bg-border"
              style={{ bottom: `${tick}%` }}
            />
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-x-3 bottom-0"
          style={{
            height: `${value * 100}%`,
            background:
              'linear-gradient(to top, hsl(var(--primary) / 0.85), hsl(var(--primary) / 0.12))',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-1 h-4 border-2 border-background bg-foreground"
          style={{
            bottom: `calc(${value * 100}% - 8px)`,
            boxShadow: '0 0 18px hsl(var(--primary) / 0.45)',
          }}
        />
      </div>

      <div className="text-center">
        <div className="font-heading text-[13px] font-semibold uppercase leading-tight tracking-[0.05em]">
          {label}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-muted-foreground">
          {hint}
        </div>
      </div>
    </div>
  );
}