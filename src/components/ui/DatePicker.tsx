import * as React from 'react';
import { Popover } from '@base-ui/react/popover';
import { DayPicker } from 'react-day-picker';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import { cn } from '@/lib/cn';

type Props = {
  value?: string;
  onChange: (iso: string) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};

export function DatePicker({
  value,
  onChange,
  placeholder = 'Select a date',
  disabled,
  invalid,
  minDate,
  maxDate,
  className,
}: Props) {
  const parsed = React.useMemo(() => {
    if (!value) return undefined;
    const d = parseISO(value);
    return isValid(d) ? d : undefined;
  }, [value]);

  const [open, setOpen] = React.useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          'flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[15px] text-slate-900 transition',
          'hover:border-slate-300',
          'data-[popup-open]:border-brand-500 data-[popup-open]:ring-4 data-[popup-open]:ring-brand-500/15',
          'focus-visible:outline-none focus-visible:border-brand-500 focus-visible:ring-4 focus-visible:ring-brand-500/15',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'aria-[invalid=true]:border-rose-400',
          'cursor-pointer',
          className
        )}
      >
        <span className={cn(!parsed && 'text-slate-400')}>
          {parsed ? format(parsed, 'EEE, MMM d, yyyy') : placeholder}
        </span>
        <CalendarIcon className="h-4 w-4 text-slate-400" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={6} className="z-50 outline-none">
          <Popover.Popup
            className={cn(
              'rounded-xl border border-slate-200 bg-white p-3 shadow-[0_24px_60px_-12px_rgba(15,23,42,0.18)] outline-none',
              'origin-[var(--transform-origin)] transition-[opacity,transform] duration-150',
              'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
              'data-[ending-style]:opacity-0 data-[ending-style]:scale-95'
            )}
          >
            <DayPicker
              mode="single"
              selected={parsed}
              onSelect={(d) => {
                if (d) {
                  onChange(format(d, 'yyyy-MM-dd'));
                  setOpen(false);
                }
              }}
              disabled={[
                minDate ? { before: minDate } : undefined,
                maxDate ? { after: maxDate } : undefined,
              ].filter(Boolean) as never[]}
              showOutsideDays
              className="rdp-root text-slate-900 [&_.rdp-day]:cursor-pointer"
              classNames={{
                months: 'flex flex-col gap-3',
                month_caption: 'flex items-center justify-center px-1 py-1 font-medium text-sm',
                nav: 'absolute right-2 top-1 flex gap-1',
                button_previous:
                  'h-7 w-7 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 inline-flex items-center justify-center cursor-pointer',
                button_next:
                  'h-7 w-7 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 inline-flex items-center justify-center cursor-pointer',
                month_grid: 'border-collapse',
                weekdays: 'flex',
                weekday: 'w-9 text-[11px] font-medium text-slate-400 uppercase tracking-wider',
                week: 'flex',
                day: 'w-9 h-9 text-sm',
                day_button:
                  'w-9 h-9 rounded-md hover:bg-brand-50 hover:text-brand-700 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed',
                selected: '[&>button]:!bg-brand-600 [&>button]:!text-white [&>button]:!hover:bg-brand-700',
                today: '[&>button]:font-semibold [&>button]:text-brand-700',
                outside: 'text-slate-300',
                month: 'relative',
              }}
              components={{
                Chevron: ({ orientation }) =>
                  orientation === 'left' ? (
                    <ChevronLeft className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  ),
              }}
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
