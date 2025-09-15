import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-ring disabled:pointer-events-none disabled:opacity-50 transition-all duration-150 ease-out min-h-[44px]',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90 active:scale-[0.98] shadow-sm hover:shadow-md',
        destructive: 'bg-danger text-white hover:bg-danger/90 active:scale-[0.98]',
        outline: 'border border-gray-300 bg-surface hover:bg-gray-50 text-ink active:scale-[0.98]',
        secondary: 'bg-gray-100 text-ink hover:bg-gray-200 active:scale-[0.98]',
        ghost: 'hover:bg-gray-100 text-ink active:scale-[0.98]',
        link: 'text-primary underline-offset-4 hover:underline active:scale-[0.98]',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm: 'h-10 px-4 py-2 text-sm',
        lg: 'h-14 px-8 py-4 text-base',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };