import React from 'react';

const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count })?.map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-muted rounded-lg" />
              <div className="space-y-2">
                <div className="h-5 bg-muted rounded w-48" />
                <div className="h-4 bg-muted rounded w-32" />
              </div>
            </div>
            <div className="w-6 h-6 bg-muted rounded" />
          </div>

          {/* Details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-4">
              <div className="h-4 bg-muted rounded w-24" />
              <div className="h-4 bg-muted rounded w-20" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-6 bg-muted rounded-full w-16" />
              <div className="h-6 bg-muted rounded-full w-12" />
            </div>
            <div className="h-4 bg-muted rounded w-40" />
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 bg-muted rounded w-16" />
            <div className="h-6 bg-muted rounded w-20" />
            <div className="h-6 bg-muted rounded w-14" />
            <div className="h-6 bg-muted rounded w-18" />
          </div>

          {/* Match Score */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <div className="h-4 bg-muted rounded w-24" />
              <div className="h-4 bg-muted rounded w-8" />
            </div>
            <div className="w-full bg-muted rounded-full h-2" />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <div className="h-10 bg-muted rounded flex-1" />
            <div className="h-10 bg-muted rounded w-32" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;