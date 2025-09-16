'use client';
import * as React from 'react';

type StepCardProps = {
  number: number;
  title: string;
  description: React.ReactNode;
  className?: string;
};

export function StepCard({ number, title, description, className }: StepCardProps) {
  return (
    <div className={['text-center space-y-4', className].filter(Boolean).join(' ')} aria-label={`Step ${number}: ${title}`}>
      <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mx-auto shadow-sm">
        <span className="text-xl font-bold" aria-hidden="true">{number}</span>
      </div>
      <h3 className="font-medium text-[var(--ink)]">{title}</h3>
      <p className="text-sm leading-relaxed text-[var(--muted)] max-w-xs mx-auto">{description}</p>
    </div>
  );
}