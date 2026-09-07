import { ReactNode } from 'react';
import { cn } from '../layout/Layout';

interface CardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'primary' | 'cyan' | 'purple' | 'green' | 'orange' | 'red';
}

export const Card = ({ children, className, glowColor }: CardProps) => {
  const glowClasses = {
    primary: 'hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:border-primary/50',
    cyan: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan/50',
    purple: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:border-purple/50',
    green: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-green/50',
    orange: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:border-orange/50',
    red: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:border-red/50',
  };

  return (
    <div className={cn(
      "glass-panel p-6 transition-all duration-300",
      glowColor && glowClasses[glowColor],
      className
    )}>
      {children}
    </div>
  );
};
