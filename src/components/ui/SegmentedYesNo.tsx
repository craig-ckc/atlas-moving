import { cn } from '@/lib/cn';

type Props = {
  value?: boolean;
  onChange: (v: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
  ariaLabel?: string;
  className?: string;
};

/** A segmented yes/no control. Visually a pair of pills with the active one filled. */
export function SegmentedYesNo({
  value,
  onChange,
  yesLabel = 'Yes',
  noLabel = 'No',
  ariaLabel,
  className,
}: Props) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5',
        className
      )}
    >
      <button
        type="button"
        role="radio"
        aria-checked={value === true}
        onClick={() => onChange(true)}
        className={cn(
          'min-w-[64px] rounded-md px-4 py-1.5 text-sm font-medium transition cursor-pointer',
          value === true
            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
            : 'text-slate-500 hover:text-slate-900'
        )}
      >
        {yesLabel}
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={value === false}
        onClick={() => onChange(false)}
        className={cn(
          'min-w-[64px] rounded-md px-4 py-1.5 text-sm font-medium transition cursor-pointer',
          value === false
            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
            : 'text-slate-500 hover:text-slate-900'
        )}
      >
        {noLabel}
      </button>
    </div>
  );
}
