'use client';

import React from 'react';
import { useMobile } from '@/lib/hooks/use-mobile';

interface MobileOptimizedProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  mobileOnly?: boolean;
}

export default function MobileOptimized({ 
  children, 
  fallback = null, 
  mobileOnly = false 
}: MobileOptimizedProps) {
  const isMobile = useMobile();

  if (mobileOnly) {
    return isMobile ? <>{children}</> : <>{fallback}</>;
  }

  return isMobile ? <>{fallback}</> : <>{children}</>;
}

// Hook for conditional rendering based on mobile state
export function useMobileOptimization() {
  const isMobile = useMobile();
  
  return {
    isMobile,
    // Disable animations on mobile
    animationProps: isMobile 
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.1 } }
      : {},
    // Simplified transition props
    transitionProps: isMobile 
      ? { duration: 0.1 }
      : { duration: 0.6, ease: "easeOut" },
    // Disable hover effects on mobile
    hoverProps: isMobile 
      ? {} 
      : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }
  };
}
