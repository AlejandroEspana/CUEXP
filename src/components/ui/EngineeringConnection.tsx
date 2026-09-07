import { Terminal, Code2, Server } from 'lucide-react';
import { Card } from './Card';
import { cn } from '../layout/Layout';

interface EngineeringConnectionProps {
  title?: string;
  topic: string;
  children: React.ReactNode;
  takeaway?: string;
  className?: string;
}

export const EngineeringConnection = ({
  title = "¿Por qué me importa como Ingeniero de Software?",
  topic,
  children,
  takeaway,
  className
}: EngineeringConnectionProps) => {
  return (
    <Card 
      glowColor="primary"
      className={cn(
        "relative overflow-hidden border-l-4 border-l-sky-600 bg-gradient-to-br from-sky-50/80 via-white to-sky-50/30 border border-sky-200/90 shadow-md",
        className
      )}
    >
      {/* Background tech accent icon */}
      <div className="absolute top-2 right-3 text-sky-200/40 pointer-events-none">
        <Terminal size={120} />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-100 border border-sky-300 text-sky-800 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">
            <Code2 size={16} />
            <span>Ingeniería de Software</span>
          </div>
          <span className="text-sm font-mono text-slate-400">•</span>
          <span className="text-sm font-mono text-sky-700 font-semibold">{topic}</span>
        </div>

        <h3 className="text-xl lg:text-2xl font-display font-black text-slate-900 flex items-center gap-2.5">
          <Server size={22} className="text-sky-600 flex-shrink-0" />
          {title}
        </h3>

        <div className="text-slate-700 text-base lg:text-lg leading-relaxed space-y-3 font-normal">
          {children}
        </div>

        {takeaway && (
          <div className="mt-3 pt-3 border-t border-sky-200 flex items-start gap-2.5 text-sm lg:text-base font-mono text-sky-950 bg-sky-100/60 p-4 rounded-xl border border-sky-300 shadow-sm">
            <span className="font-extrabold text-sky-700 flex-shrink-0">KEY TAKEAWAY:</span>
            <span className="leading-snug">{takeaway}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
