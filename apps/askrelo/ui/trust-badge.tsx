import * as React from 'react';
import { cn } from '../lib/utils';

interface TrustBadgeProps {
  text: string;
  className?: string;
}

export function TrustBadge({ text, className }: TrustBadgeProps) {
  return (
    <div className={cn(
      'inline-flex items-center px-4 py-2 text-sm font-medium text-muted',
      'border border-gray-200 rounded-full bg-surface hover:bg-gray-50',
      'transition-colors duration-150',
      className
    )}>
      {text}
    </div>
  );
}