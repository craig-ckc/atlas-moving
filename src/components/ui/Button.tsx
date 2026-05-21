import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium ' +
  'transition-[background-color,color,box-shadow,transform] duration-150 ' +
  'disabled:opacity-50 disabled:pointer-events-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-[0_8px_22px_-8px_rgba(37,99,235,0.55)] ' +
    'hover:bg-brand-700 active:translate-y-px',
  secondary:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900',
  destructive:
    'bg-rose-600 text-white hover:bg-rose-700 active:translate-y-px',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-base',
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading,
      iconLeft,
      iconRight,
      children,
      type = 'button',
      disabled,
      ...rest
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        iconLeft
      )}
      <span>{children}</span>
      {!loading && iconRight}
    </button>
  )
);
Button.displayName = 'Button';
