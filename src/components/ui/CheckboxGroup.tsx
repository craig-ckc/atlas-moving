import * as React from 'react';
import { Checkbox } from '@base-ui/react/checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/cn';

type CheckProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  id?: string;
  indeterminate?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function CheckboxBox({
  checked,
  defaultChecked,
  onCheckedChange,
  name,
  disabled,
  id,
  indeterminate,
  className,
  ariaLabel,
}: CheckProps) {
  return (
    <Checkbox.Root
      id={id}
      name={name}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      indeterminate={indeterminate}
      aria-label={ariaLabel}
      className={cn(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white transition',
        'hover:border-slate-400',
        'data-[checked]:bg-brand-600 data-[checked]:border-brand-600',
        'data-[indeterminate]:bg-brand-600 data-[indeterminate]:border-brand-600',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2',
        'cursor-pointer',
        className
      )}
    >
      <Checkbox.Indicator className="text-white">
        {indeterminate ? <Minus className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}

type Option = {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
};

type CheckGroupProps = {
  values: string[];
  onChange: (values: string[]) => void;
  options: ReadonlyArray<Option>;
  columns?: 1 | 2 | 3 | 4;
  variant?: 'card' | 'inline' | 'chip';
  className?: string;
};

export function CheckboxGroup({
  values,
  onChange,
  options,
  columns = 1,
  variant = 'inline',
  className,
}: CheckGroupProps) {
  const toggle = (v: string, checked: boolean) =>
    onChange(checked ? [...values.filter((x) => x !== v), v] : values.filter((x) => x !== v));

  const cols =
    columns === 4
      ? 'grid-cols-2 sm:grid-cols-4'
      : columns === 3
        ? 'grid-cols-1 sm:grid-cols-3'
        : columns === 2
          ? 'grid-cols-1 sm:grid-cols-2'
          : 'grid-cols-1';

  if (variant === 'chip') {
    return (
      <div className={cn('flex flex-wrap gap-2', className)}>
        {options.map((o) => {
          const checked = values.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => toggle(o.value, !checked)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition cursor-pointer',
                checked
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              )}
              aria-pressed={checked}
            >
              {checked && <Check className="h-3.5 w-3.5" />}
              <span>{o.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn(variant === 'card' ? `grid ${cols} gap-3` : 'flex flex-col gap-3', className)}>
      {options.map((o) => {
        const checked = values.includes(o.value);
        if (variant === 'card') {
          return (
            <label
              key={o.value}
              className={cn(
                'group relative flex cursor-pointer items-start gap-3 rounded-xl border bg-white p-4 transition',
                checked
                  ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-500/20'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              )}
            >
              <CheckboxBox
                checked={checked}
                onCheckedChange={(v) => toggle(o.value, v)}
                ariaLabel={typeof o.label === 'string' ? o.label : undefined}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {o.icon && <span className="text-slate-700">{o.icon}</span>}
                  <span className="text-sm font-medium text-slate-900">{o.label}</span>
                </div>
                {o.description && (
                  <div className="text-xs text-slate-500 mt-0.5">{o.description}</div>
                )}
              </div>
            </label>
          );
        }
        return (
          <label key={o.value} className="flex items-start gap-3 cursor-pointer">
            <CheckboxBox
              checked={checked}
              onCheckedChange={(v) => toggle(o.value, v)}
              ariaLabel={typeof o.label === 'string' ? o.label : undefined}
            />
            <div className="min-w-0 flex-1">
              <div className="text-[15px] text-slate-900 flex items-center gap-2">
                {o.icon && <span className="text-slate-500">{o.icon}</span>}
                {o.label}
              </div>
              {o.description && <div className="text-xs text-slate-500 mt-0.5">{o.description}</div>}
            </div>
          </label>
        );
      })}
    </div>
  );
}
