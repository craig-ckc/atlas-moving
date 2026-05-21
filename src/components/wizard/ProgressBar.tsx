import { cn } from '@/lib/cn';

type Step = { slug: string; shortTitle: string };

type Props = {
  steps: Step[];
  currentIndex: number;
};

export function ProgressBar({ steps, currentIndex }: Props) {
  const current = steps[currentIndex];
  const pct = ((currentIndex + 1) / steps.length) * 100;
  return (
    <div className="flex flex-col gap-2 px-1">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Step <span className="font-medium text-slate-900">{currentIndex + 1}</span> of {steps.length}
        </span>
        <span className="font-medium text-slate-900">{current?.shortTitle}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80">
        <div
          className={cn('h-full rounded-full bg-brand-600 transition-[width] duration-500 ease-out')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
