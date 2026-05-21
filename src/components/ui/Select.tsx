import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export type SelectOption = { value: string; label: React.ReactNode };

type Props = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  name?: string;
};

export function Select({
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select…',
  options,
  disabled,
  invalid,
  className,
  name,
}: Props) {
  return (
    <BaseSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v) => v != null && onValueChange?.(v)}
      disabled={disabled}
      name={name}
      items={options}
    >
      <BaseSelect.Trigger
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
        <BaseSelect.Value placeholder={<span className="text-slate-400">{placeholder}</span>} />
        <BaseSelect.Icon className="text-slate-400">
          <ChevronDown className="h-4 w-4" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={6} className="z-50 outline-none">
          <BaseSelect.Popup
            className={cn(
              'max-h-[min(20rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-auto rounded-xl border border-slate-200 bg-white p-1.5',
              'shadow-[0_24px_60px_-12px_rgba(15,23,42,0.18)] outline-none',
              'origin-[var(--transform-origin)] transition-[opacity,transform] duration-150',
              'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
              'data-[ending-style]:opacity-0 data-[ending-style]:scale-95'
            )}
          >
            {options.map((opt) => (
              <BaseSelect.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  'flex cursor-pointer select-none items-center justify-between gap-3 rounded-md px-2.5 py-2 text-sm text-slate-700 outline-none',
                  'data-[highlighted]:bg-brand-50 data-[highlighted]:text-brand-900',
                  'data-[selected]:font-medium data-[selected]:text-slate-900'
                )}
              >
                <BaseSelect.ItemText>{opt.label}</BaseSelect.ItemText>
                <BaseSelect.ItemIndicator>
                  <Check className="h-4 w-4 text-brand-600" />
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
