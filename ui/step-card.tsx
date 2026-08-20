import * as React from 'react';
import { cn } from './lib/utils';

type StepCardProps = {
  number: number;
  title: string;
  description: React.ReactNode;
  className?: string;
};

export function StepCard({ number, title, description, className }: StepCardProps) {
  return (
    <div className={cn('text-center space-y-4', className)} aria-label={`Step ${number}: ${title}`}>
      <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto">
        <span className="text-xl font-bold" aria-hidden="true">{number}</span>
      </div>
      <h3 className="font-medium text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-muted max-w-xs mx-auto">{description}</p>
    </div>
  );
}
