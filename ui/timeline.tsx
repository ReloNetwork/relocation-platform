import * as React from 'react';
import { cn } from './lib/utils';
import { Badge } from './badge';

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status: 'completed' | 'in_progress' | 'pending';
  assignee?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {items.map((item, index) => (
        <div key={item.id} className="relative flex items-start space-x-3">
          {/* Timeline line */}
          {index < items.length - 1 && (
            <div className="absolute left-4 top-10 h-full w-0.5 bg-muted" />
          )}
          
          {/* Status indicator */}
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border-2',
              {
                'border-success bg-success': item.status === 'completed',
                'border-warning bg-warning': item.status === 'in_progress',
                'border-muted bg-background': item.status === 'pending',
              }
            )}
          >
            {item.status === 'completed' && (
              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {item.status === 'in_progress' && (
              <div className="h-2 w-2 rounded-full bg-white" />
            )}
            {item.status === 'pending' && (
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
              <Badge
                variant={
                  item.status === 'completed' ? 'success' :
                  item.status === 'in_progress' ? 'warning' : 'secondary'
                }
              >
                {item.status.replace('_', ' ')}
              </Badge>
            </div>
            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            )}
            <div className="mt-2 flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{item.timestamp}</span>
              {item.assignee && (
                <>
                  <span>•</span>
                  <span>Assigned to {item.assignee}</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
