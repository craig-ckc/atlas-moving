import { cn } from '@/lib/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 select-none', className)}>
      <span
        aria-hidden
        className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.6)]"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path d="M3 12l9-7 9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-slate-900">
        Atlas <span className="text-slate-400">Moving</span>
      </span>
    </span>
  );
}
