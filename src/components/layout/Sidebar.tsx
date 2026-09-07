import { Link, useLocation } from 'react-router-dom';
import { SECTIONS } from '../../data/sections';
import { MonitorPlay } from 'lucide-react';
import { usePresentation } from '../../hooks/usePresentation';
import { cn } from './Layout';

export const Sidebar = () => {
  const location = useLocation();
  const { togglePresentationMode, currentIndex } = usePresentation();
  
  // Group sections
  const groupedSections: Record<string, typeof SECTIONS> = {};
  SECTIONS.forEach(section => {
    const group = section.group || 'GENERAL';
    if (!groupedSections[group]) groupedSections[group] = [];
    groupedSections[group].push(section);
  });

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-6">
        <h1 className="text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan">
          MEDIOS DE TRANSMISIÓN
        </h1>
      </div>
      
      <button 
        onClick={togglePresentationMode}
        className="mb-6 flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors border border-primary/30"
      >
        <MonitorPlay size={18} />
        <span>Modo Presentación</span>
      </button>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
        {Object.entries(groupedSections).map(([group, sections]) => (
          <div key={group}>
            {group !== 'GENERAL' && (
              <div className="text-xs font-semibold text-slate-500 mb-2 tracking-wider flex items-center">
                <span className="w-4 h-px bg-slate-700 mr-2"></span>
                {group}
                <span className="flex-1 h-px bg-slate-700 ml-2"></span>
              </div>
            )}
            <ul className="space-y-1">
              {sections.map((section) => {
                const isActive = location.pathname === section.path;
                return (
                  <li key={section.id}>
                    <Link
                      to={section.path}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm transition-colors",
                        isActive 
                          ? "bg-cyan/10 text-cyan font-medium border-l-2 border-cyan" 
                          : "text-slate-400 hover:text-slate-200 hover:bg-dark-700/50 border-l-2 border-transparent"
                      )}
                    >
                      {section.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="pt-4 mt-auto border-t border-dark-700">
        <div className="text-xs text-slate-500 font-mono">
          Progreso: {currentIndex + 1} / {SECTIONS.length}
        </div>
        <div className="w-full bg-dark-700 h-1 mt-2 rounded-full overflow-hidden">
          <div 
            className="bg-cyan h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / SECTIONS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
