import * as React from 'react';
import { cn } from './lib/utils';

interface TestimonialProps {
  quote: string;
  author: string;
  location: string;
  className?: string;
}

export function Testimonial({ quote, author, location, className }: TestimonialProps) {
  return (
    <div className={cn('card-luxury p-8', className)}>
      <blockquote className="text-lg leading-relaxed text-ink italic mb-6">
        "{quote}"
      </blockquote>
      <footer className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-sm font-medium text-ink">
            {author.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <p className="font-medium text-ink text-sm">{author}</p>
          <p className="text-muted text-sm">{location}</p>
        </div>
      </footer>
    </div>
  );
}
