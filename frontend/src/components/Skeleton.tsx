import React from 'react';

export function SkeletonCard() {
  return (
    <div className="bg-slate-200 dark:bg-slate-700 rounded-lg p-4 space-y-3 animate-pulse">
      <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-1/3"></div>
      <div className="space-y-2">
        <div className="h-12 bg-slate-300 dark:bg-slate-600 rounded"></div>
        <div className="h-8 bg-slate-300 dark:bg-slate-600 rounded"></div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-300 dark:bg-slate-600 rounded animate-pulse"
          style={{ width: `${100 - i * 10}%` }}
        />
      ))}
    </div>
  );
}
