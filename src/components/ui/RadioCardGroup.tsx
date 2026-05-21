import * as React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { Radio } from '@base-ui/react/radio';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export type RadioOption<T extends string = string> = {
  value: T;
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
};

type Props<T extends string> = {
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  name?: string;
  options: ReadonlyArray<RadioOption<T>>;
  columns?: 1 | 2 | 3;
  /** 'card' for the bigger boxed style (used for property type, packing, etc.). 'inline' for the simple radio dot list. */
  variant?: 'card' | 'inline';
  className?: string;
};

export function RadioCardGroup<T extends string>({
  value,
  defaultValue,
  onValueChange,
  name,
  options,
  columns = 1,
  variant = 'inline',
  className,
}: Props<T>) {
  const cols =
    columns === 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : columns === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1';
  return (
    <RadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v) => onValueChange?.(v as T)}
      name={name}
      className={cn(variant === 'card' ? `grid ${cols} gap-3` : 'flex flex-col gap-3', className)}
    >
      {options.map((opt) =>
        variant === 'card' ? (
          <CardOption key={opt.value} option={opt} />
        ) : (
          <InlineOption key={opt.value} option={opt} />
        )
      )}
    </RadioGroup>
  );
}

function CardOption({ option }: { option: RadioOption }) {
  return (
    <Radio.Root
      value={option.value}
      className={cn(
        'group relative flex flex-col items-start gap-2 rounded-xl border border-slate-200 bg-white p-4 text-left transition',
        'hover:border-slate-300 hover:shadow-sm',
        'data-[checked]:border-brand-500 data-[checked]:bg-brand-50/60 data-[checked]:ring-2 data-[checked]:ring-brand-500/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2',
        'cursor-pointer'
      )}
    >
      {option.icon && (
        <div className="text-slate-700 group-data-[checked]:text-brand-700">{option.icon}</div>
      )}
      <div className="flex-1">
        <div className="text-sm font-semibold text-slate-900">{option.label}</div>
        {option.description && (
          <div className="text-xs text-slate-500 mt-0.5">{option.description}</div>
        )}
      </div>
      <Radio.Indicator className="absolute top-3 right-3 text-brand-600">
        <Check className="h-4 w-4" />
      </Radio.Indicator>
    </Radio.Root>
  );
}

function InlineOption({ option }: { option: RadioOption }) {
  return (
    <label className="group flex items-start gap-3 cursor-pointer">
      <Radio.Root
        value={option.value}
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white transition',
          'data-[checked]:border-brand-600 data-[checked]:bg-brand-600',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2',
          'cursor-pointer'
        )}
      >
        <Radio.Indicator className="h-2 w-2 rounded-full bg-white" />
      </Radio.Root>
      <div className="min-w-0 flex-1">
        <div className="text-[15px] text-slate-900">{option.label}</div>
        {option.description && (
          <div className="text-xs text-slate-500 mt-0.5">{option.description}</div>
        )}
      </div>
    </label>
  );
}
