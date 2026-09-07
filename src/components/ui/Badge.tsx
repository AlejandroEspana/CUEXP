import { ReactNode } from 'react';
import { cn } from '../layout/Layout';

interface BadgeProps {
  children: ReactNode;
  color?: 'primary' | 'cyan' | 'purple' | 'green' | 'orange' | 'red' | 'slate';
}

export const Badge = ({ children, color = 'primary' }: BadgeProps) => {
  const colorClasses = {
    primary: 'bg-primary/20 text-primary border-primary/30',
    cyan: 'bg-cyan/20 text-cyan border-cyan/30',
    purple: 'bg-purple/20 text-purple border-purple/30',
    green: 'bg-green/20 text-green border-green/30',
    orange: 'bg-orange/20 text-orange border-orange/30',
    red: 'bg-red/20 text-red border-red/30',
    slate: 'bg-slate-700/50 text-slate-300 border-slate-600',
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      colorClasses[color]
    )}>
      {children}
    </span>
  );
};
