import { Link, useLocation } from 'react-router-dom';
import { SECTIONS } from '../../data/sections';
import { MonitorPlay, X, Network, Layers, ShieldCheck, Radio, Laptop } from 'lucide-react';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import { cn } from '../../utils/cn';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar = ({ onCloseMobile }: SidebarProps) => {
  const location = useLocation();
  const { togglePresentationMode, currentIndex } = useSectionNavigation();

  // Group sections
  const groupedSections: Record<string, typeof SECTIONS> = {};
  SECTIONS.forEach(section => {
    const group = section.group || 'GENERAL';
    if (!groupedSections[group]) groupedSections[group] = [];
    groupedSections[group].push(section);
  });

  const groupIcons: Record<string, typeof Network> = {
    GENERAL: Network,
    CABLEADO: Layers,
    FIBRA: ShieldCheck,
    RF: Radio,
    APLICACIÓN: Laptop
  };

  return (
    <aside className="h-full flex flex-col p-5 bg-white/95 backdrop-blur-xl border-r border-slate-200 shadow-sm">
      {/* Brand & Mobile Close */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-sky-600/20">
            TX
          </div>
          <div>
            <h1 className="text-base font-display font-black tracking-tight text-slate-900 leading-none">
              MEDIOS DE TRANSMISIÓN
            </h1>
            <span className="text-xs font-mono text-sky-700 font-bold uppercase tracking-wider block mt-0.5">
              Network Lab • SW Eng
            </span>
          </div>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 md:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Presentation Mode Action */}
      <button 
        onClick={togglePresentationMode}
        className="mb-5 flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white transition-all duration-200 font-bold text-sm shadow-sm hover:shadow-sky-600/25"
      >
        <MonitorPlay size={18} />
        <span>Iniciar Modo Presentación</span>
      </button>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-6 custom-scrollbar">
        {Object.entries(groupedSections).map(([group, sections]) => {
          const GroupIcon = groupIcons[group] || Network;
          return (
            <div key={group}>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-2.5 tracking-wider flex items-center gap-2 px-1">
                <GroupIcon size={14} className="text-sky-600" />
                <span>{group}</span>
                <span className="flex-1 h-px bg-slate-200"></span>
              </div>
              <ul className="space-y-1">
                {sections.map((section) => {
                  const isActive = location.pathname === section.path;
                  return (
                    <li key={section.id}>
                      <Link
                        to={section.path}
                        onClick={onCloseMobile}
                        className={cn(
                          "block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 border-l-4",
                          isActive 
                            ? "bg-sky-100/90 text-sky-900 font-extrabold border-sky-600 shadow-sm" 
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent"
                        )}
                      >
                        {section.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Progress Footer */}
      <div className="pt-4 mt-auto border-t border-slate-200">
        <div className="flex items-center justify-between text-sm font-mono font-medium">
          <span className="text-slate-500">Progreso</span>
          <span className="text-sky-700 font-extrabold">
            {currentIndex + 1} / {SECTIONS.length}
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2 mt-2 rounded-full overflow-hidden border border-slate-200">
          <div 
            className="bg-sky-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / SECTIONS.length) * 100}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
