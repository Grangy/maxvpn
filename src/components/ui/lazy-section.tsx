'use client';

import React from 'react';
import { useIntersection } from '@/lib/hooks/use-intersection';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
}

export default function LazySection({ 
  children, 
  fallback = <div className="h-96 bg-slate-900/50 animate-pulse rounded-lg" />,
  rootMargin = '100px'
}: LazySectionProps) {
  const { ref, hasIntersected } = useIntersection({
    rootMargin,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="section-transition">
      {hasIntersected ? children : fallback}
    </div>
  );
}
