import * as React from 'react';
import { cn } from '@/lib/cn';

export function Card({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-card)] bg-white ring-1 ring-slate-200/70 card-shadow',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-5 border-b border-slate-200/70', className)} {...rest}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-6', className)} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-slate-200/70 bg-slate-50/60 rounded-b-[var(--radius-card)]',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
