'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  animation?: 'pulse' | 'bounce' | 'rotate' | 'float' | 'glow';
  delay?: number;
  duration?: number;
}

const animations = {
  pulse: {
    animate: { scale: [1, 1.1, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
  },
  bounce: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }
  },
  rotate: {
    animate: { rotate: 360 },
    transition: { duration: 3, repeat: Infinity, ease: "linear" as const }
  },
  float: {
    animate: { y: [0, -5, 0] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
  },
  glow: {
    animate: { 
      boxShadow: [
        "0 0 0 0 rgba(59, 130, 246, 0.4)",
        "0 0 0 10px rgba(59, 130, 246, 0)",
        "0 0 0 0 rgba(59, 130, 246, 0)"
      ]
    },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
  }
};

export default function AnimatedIcon({ 
  icon: Icon, 
  className = "", 
  animation = 'pulse',
  delay = 0,
  duration = 2
}: AnimatedIconProps) {
  const animationConfig = animations[animation];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <motion.div
        animate={animationConfig.animate}
        transition={{ ...animationConfig.transition, duration, delay }}
      >
        <Icon className="w-full h-full" />
      </motion.div>
    </motion.div>
  );
}
