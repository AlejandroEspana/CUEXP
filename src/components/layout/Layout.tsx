import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { usePresentation } from '../../hooks/usePresentation';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export const Layout = ({ children }: { children: ReactNode }) => {
  const { presentationMode, currentIndex } = usePresentation();
  
  return (
    <div className="flex h-screen w-full bg-dark-900 text-slate-200 overflow-hidden relative">
      <div className="absolute inset-0 tech-grid pointer-events-none opacity-50 z-0"></div>
      
      {!presentationMode && (
        <div className="w-72 flex-shrink-0 z-20 border-r border-dark-700 bg-dark-800/80 backdrop-blur-md">
          <Sidebar />
        </div>
      )}
      
      <main className={cn(
        "flex-1 relative z-10 transition-all duration-300",
        presentationMode ? "p-8 flex flex-col" : "p-6 overflow-y-auto"
      )}>
        {children}
      </main>
      
      {presentationMode && (
        <div className="absolute bottom-4 right-6 z-50 text-slate-400 font-mono text-sm">
          {currentIndex + 1} / 22
        </div>
      )}
    </div>
  );
};
