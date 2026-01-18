import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', asChild, children, ...props }, ref) => {
    const variants = {
      default: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50',
      primary: 'bg-gray-900 text-white hover:bg-gray-800',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      outline: 'border border-gray-300 bg-white hover:bg-gray-50',
    };

    if (asChild) {
      return <span className={cn('inline-block', className)}>{children}</span>;
    }

    return (
      <button
        className={cn(
          'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
