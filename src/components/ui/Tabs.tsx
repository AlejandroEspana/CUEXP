import type { ReactNode } from 'react';
import { cn } from '../layout/Layout';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs = ({ tabs, activeTab, onChange, className }: TabsProps) => {
  return (
    <div className={cn("flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 border border-slate-200/90 rounded-2xl shadow-inner", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200",
              isActive
                ? "bg-sky-100 text-sky-950 shadow-sm border-2 border-sky-600 font-black ring-2 ring-sky-400/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60 border-2 border-transparent"
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-mono font-bold",
                isActive ? "bg-sky-100 text-sky-800" : "bg-slate-200 text-slate-700"
              )}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
