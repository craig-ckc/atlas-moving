import * as React from 'react';
import { cn } from '@/lib/cn';
import type { SubmissionStatus } from '@/lib/schema/quote';

type Tone = 'slate' | 'blue' | 'amber' | 'violet' | 'emerald' | 'rose';

const tones: Record<Tone, string> = {
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
  blue: 'bg-brand-50 text-brand-700 ring-brand-200',
  amber: 'bg-amber-50 text-amber-800 ring-amber-200',
  violet: 'bg-violet-50 text-violet-800 ring-violet-200',
  emerald: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  rose: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export function Badge({
  tone = 'slate',
  className,
  children,
  dot,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap',
        tones[tone],
        className
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotColor(tone))} />}
      {children}
    </span>
  );
}

function dotColor(tone: Tone) {
  return {
    slate: 'bg-slate-400',
    blue: 'bg-brand-500',
    amber: 'bg-amber-500',
    violet: 'bg-violet-500',
    emerald: 'bg-emerald-500',
    rose: 'bg-rose-500',
  }[tone];
}

export const STATUS_TONES: Record<SubmissionStatus, Tone> = {
  new: 'blue',
  quoted: 'amber',
  booked: 'violet',
  done: 'emerald',
};

export const STATUS_LABELS: Record<SubmissionStatus, string> = {
  new: 'New',
  quoted: 'Quoted',
  booked: 'Booked',
  done: 'Done',
};

export function StatusBadge({ status }: { status: SubmissionStatus }) {
  return (
    <Badge tone={STATUS_TONES[status]} dot>
      {STATUS_LABELS[status]}
    </Badge>
  );
}
