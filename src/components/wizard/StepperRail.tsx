import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

type Step = { slug: string; shortTitle: string };

type Props = {
  steps: Step[];
  currentIndex: number;
  onStepClick?: (index: number) => void;
};

export function StepperRail({ steps, currentIndex, onStepClick }: Props) {
  return (
    <nav aria-label="Form progress">
      <ol className="flex flex-col">
        {steps.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          const clickable = i <= currentIndex && onStepClick;
          return (
            <li key={step.slug} className="relative flex items-start gap-3 py-2.5">
              {/* connector line */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className={cn(
                    'absolute left-[11px] top-9 h-[calc(100%-12px)] w-px',
                    done ? 'bg-brand-500' : 'bg-slate-200'
                  )}
                />
              )}
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick?.(i)}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'group relative z-10 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-[10px] font-semibold transition shadow-[0_0_0_4px_white] mt-0.5',
                  done && 'bg-brand-600 text-white',
                  active && 'bg-white text-brand-700 ring-2 ring-brand-500',
                  !done && !active && 'bg-white text-slate-400 ring-1 ring-slate-300',
                  clickable && 'cursor-pointer'
                )}
              >
                {done ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
              </button>
              <div className="min-w-0 flex-1 pt-px">
                <div
                  className={cn(
                    'text-[13px] leading-snug',
                    active
                      ? 'font-semibold text-slate-900'
                      : done
                        ? 'text-slate-700'
                        : 'text-slate-500'
                  )}
                >
                  {step.shortTitle}
                </div>
                <div className="text-[11px] text-slate-400">
                  {done ? 'Complete' : active ? 'In progress' : 'Pending'}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
