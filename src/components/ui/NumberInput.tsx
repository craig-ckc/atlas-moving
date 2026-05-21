import { NumberField } from '@base-ui/react/number-field';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

type Props = {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function NumberInput({
  value,
  defaultValue = 0,
  onValueChange,
  min = 0,
  max = 99,
  step = 1,
  disabled,
  className,
  ariaLabel,
}: Props) {
  return (
    <NumberField.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v) => onValueChange?.(v)}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
    >
      <NumberField.Group
        className={cn(
          'inline-flex h-10 items-stretch rounded-lg border border-slate-200 bg-white overflow-hidden shadow-[inset_0_1px_0_rgba(15,23,42,0.02)]',
          'focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15',
          className
        )}
      >
        <NumberField.Decrement
          className={cn(
            'flex w-9 items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900',
            'disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
          )}
        >
          <Minus className="h-3.5 w-3.5" />
        </NumberField.Decrement>
        <NumberField.Input
          aria-label={ariaLabel}
          className="w-10 bg-transparent text-center text-sm font-medium text-slate-900 outline-none tabular-nums"
        />
        <NumberField.Increment
          className={cn(
            'flex w-9 items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900',
            'disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
          )}
        >
          <Plus className="h-3.5 w-3.5" />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}
