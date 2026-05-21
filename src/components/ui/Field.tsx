import * as React from 'react';
import { Field as BaseField } from '@base-ui/react/field';
import { cn } from '@/lib/cn';

type FieldProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  className?: string;
  /** Layout: 'stacked' (label above) or 'row' (label left, control right, like screenshots). */
  layout?: 'stacked' | 'row';
  children: React.ReactNode;
  htmlFor?: string;
};

/** Wraps a control with accessible label, description, and error. Uses Base UI Field. */
export function Field({
  label,
  description,
  error,
  required,
  className,
  layout = 'row',
  children,
  htmlFor,
}: FieldProps) {
  return (
    <BaseField.Root
      className={cn(
        'group',
        layout === 'row'
          ? 'grid grid-cols-1 gap-2 md:grid-cols-[180px_minmax(0,1fr)] md:gap-6 md:items-start'
          : 'flex flex-col gap-2',
        className
      )}
    >
      {label && (
        <BaseField.Label
          htmlFor={htmlFor}
          className={cn(
            'text-sm font-medium text-slate-900',
            layout === 'row' && 'md:pt-2.5'
          )}
        >
          {label}
          {required && <span className="text-rose-500 ml-0.5" aria-hidden>*</span>}
          {description && (
            <BaseField.Description className="block text-xs font-normal text-slate-500 mt-0.5">
              {description}
            </BaseField.Description>
          )}
        </BaseField.Label>
      )}
      <div className="min-w-0">
        {children}
        {error && (
          <BaseField.Error className="mt-1.5 text-xs text-rose-600" match>
            {error}
          </BaseField.Error>
        )}
      </div>
    </BaseField.Root>
  );
}
