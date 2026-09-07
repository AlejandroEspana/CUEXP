import type { ReactNode } from 'react';
import { cn } from '../layout/Layout';

interface BadgeProps {
  children: ReactNode;
  color?: 'primary' | 'cyan' | 'purple' | 'green' | 'orange' | 'red' | 'slate';
}

export const Badge = ({ children, color = 'primary' }: BadgeProps) => {
  const colorClasses = {
    primary: 'bg-sky-100 text-sky-800 border-sky-300',
    cyan: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    purple: 'bg-purple-100 text-purple-800 border-purple-300',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    orange: 'bg-amber-100 text-amber-800 border-amber-300',
    red: 'bg-rose-100 text-rose-800 border-rose-300',
    slate: 'bg-slate-100 text-slate-800 border-slate-300',
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border tracking-wide shadow-sm",
      colorClasses[color]
    )}>
      {children}
    </span>
  );
};
