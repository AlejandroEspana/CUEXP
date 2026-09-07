import type { ReactNode } from 'react';
import { cn } from '../layout/Layout';

interface CardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'primary' | 'cyan' | 'purple' | 'green' | 'orange' | 'red';
}

export const Card = ({ children, className, glowColor }: CardProps) => {
  const glowClasses = {
    primary: 'hover:shadow-lg hover:shadow-sky-500/15 hover:border-sky-500',
    cyan: 'hover:shadow-lg hover:shadow-cyan-500/15 hover:border-cyan-500',
    purple: 'hover:shadow-lg hover:shadow-purple-500/15 hover:border-purple-500',
    green: 'hover:shadow-lg hover:shadow-emerald-500/15 hover:border-emerald-500',
    orange: 'hover:shadow-lg hover:shadow-amber-500/15 hover:border-amber-500',
    red: 'hover:shadow-lg hover:shadow-rose-500/15 hover:border-rose-500',
  };

  return (
    <div className={cn(
      "glass-panel p-6 lg:p-8 transition-all duration-300",
      glowColor && glowClasses[glowColor],
      className
    )}>
      {children}
    </div>
  );
};
