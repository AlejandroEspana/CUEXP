import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SECTIONS } from '../../data/sections';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import { 
  MonitorPlay, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  Scale, 
  ChevronRight,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { GlossaryModal } from '../glossary/GlossaryModal';

interface TopbarProps {
  onToggleMobileSidebar?: () => void;
}

export const Topbar = ({ onToggleMobileSidebar }: TopbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    currentIndex, 
    totalSections, 
    goToNext, 
    goToPrev, 
    hasNext, 
    hasPrev, 
    presentationMode, 
    togglePresentationMode 
  } = useSectionNavigation();
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSection = SECTIONS.find(s => s.path === location.pathname) || SECTIONS[0];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <>
      <header className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 flex-shrink-0 shadow-sm">
        {/* Left: Mobile Toggle & Breadcrumb */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden transition-colors"
              title="Abrir menú"
            >
              <Menu size={22} />
            </button>
          )}

          <div className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-slate-600">
            <span className="hidden sm:inline font-bold text-sky-800 tracking-wide">CUEXP</span>
            <ChevronRight size={16} className="hidden sm:inline text-slate-400" />
            {currentSection.group && (
              <>
                <span className="text-slate-500 font-medium">{currentSection.group}</span>
                <ChevronRight size={16} className="text-slate-400" />
              </>
            )}
            <span className="text-sky-700 font-extrabold truncate max-w-[220px] sm:max-w-none">
              {currentSection.title}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Glossary Button */}
          <button
            onClick={() => setIsGlossaryOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-300 transition-colors shadow-sm"
            title="Abrir Glosario Técnico"
          >
            <BookOpen size={16} className="text-sky-600" />
            <span className="hidden md:inline font-semibold">Glosario</span>
          </button>

          {/* Quick Comparator Button */}
          <button
            onClick={() => navigate('/guided')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-300 transition-colors shadow-sm"
            title="Ir a Comparador de Medios"
          >
            <Scale size={16} className="text-purple-600" />
            <span className="hidden lg:inline font-semibold">Comparador</span>
          </button>

          <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block"></div>

          {/* Slide Indicator with Prev / Next Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 border border-slate-300 rounded-xl p-1 shadow-inner">
            <button
              onClick={goToPrev}
              disabled={!hasPrev}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:hover:text-slate-600 transition-colors"
              title="Tema anterior (←)"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="px-2 py-0.5 text-sm font-mono text-slate-700 select-none">
              <span className="text-sky-700 font-extrabold">{currentIndex + 1}</span>
              <span className="text-slate-400 mx-1">/</span>
              <span className="text-slate-600 font-medium">{totalSections}</span>
            </div>
            <button
              onClick={goToNext}
              disabled={!hasNext}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:hover:text-slate-600 transition-colors"
              title="Siguiente tema (→ o Espacio)"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Presentation Mode Toggle */}
          <button
            onClick={togglePresentationMode}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm transition-all border-2 shadow-sm ${
              presentationMode 
                ? 'bg-sky-100 text-sky-950 border-sky-600 ring-2 ring-sky-400/40 shadow-md font-black' 
                : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-300 font-bold'
            }`}
            title="Alternar Modo Presentación (Atajo: F / flechas)"
          >
            <MonitorPlay size={16} className={presentationMode ? "text-sky-700" : "text-sky-800"} />
            <span className="hidden sm:inline">Presentación</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors shadow-sm"
            title={isFullscreen ? "Salir de pantalla completa (Esc)" : "Pantalla completa (F)"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </header>

      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
    </>
  );
};
