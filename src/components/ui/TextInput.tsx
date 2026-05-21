import * as React from 'react';
import { cn } from '@/lib/cn';

const inputBase =
  'flex w-full rounded-lg border border-slate-200 bg-white px-3.5 text-[15px] text-slate-900 ' +
  'placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(15,23,42,0.02)] ' +
  'transition-colors duration-100 ' +
  'hover:border-slate-300 ' +
  'focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 focus:outline-none ' +
  'disabled:opacity-50 disabled:cursor-not-allowed ' +
  'aria-[invalid=true]:border-rose-400 aria-[invalid=true]:focus:ring-rose-500/15';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, iconLeft, iconRight, ...rest }, ref) => {
    if (iconLeft || iconRight) {
      return (
        <div className="relative">
          {iconLeft && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            aria-invalid={invalid || undefined}
            className={cn(
              inputBase,
              'h-11',
              iconLeft && 'pl-10',
              iconRight && 'pr-10',
              className
            )}
            {...rest}
          />
          {iconRight && (
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
              {iconRight}
            </span>
          )}
        </div>
      );
    }
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(inputBase, 'h-11', className)}
        {...rest}
      />
    );
  }
);
TextInput.displayName = 'TextInput';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, invalid, rows = 4, ...rest }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(inputBase, 'py-2.5 leading-relaxed resize-y min-h-[96px]', className)}
      {...rest}
    />
  )
);
TextArea.displayName = 'TextArea';
