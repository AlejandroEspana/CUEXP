import type { ReactNode } from 'react';
import { Badge } from './Badge';

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: 'primary' | 'cyan' | 'purple' | 'green' | 'orange' | 'red' | 'slate';
  icon?: ReactNode;
  title: string;
  subtitle: string;
  actions?: ReactNode;
}

export const SectionHeader = ({
  badge,
  badgeColor = 'cyan',
  icon,
  title,
  subtitle,
  actions
}: SectionHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 mb-8 border-b border-slate-200/90">
      <div className="flex items-start gap-5">
        {icon && (
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/80 shadow-sm text-sky-600 flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          {badge && (
            <div className="mb-2.5">
              <Badge color={badgeColor}>{badge}</Badge>
            </div>
          )}
          <h1 className="text-3xl lg:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-slate-600 text-lg lg:text-xl mt-2.5 max-w-4xl leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
};
