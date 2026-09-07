import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  X, 
  HelpCircle 
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PresentationControls = () => {
  const { 
    currentIndex, 
    goToNext, 
    goToPrev, 
    hasNext, 
    hasPrev, 
    totalSections, 
    togglePresentationMode 
  } = useSectionNavigation();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-6 inset-x-0 pointer-events-none z-50 flex flex-col items-center justify-center">
      {/* Floating HUD Container */}
      <div className="pointer-events-auto flex items-center gap-2.5 bg-white/95 border border-slate-300 backdrop-blur-xl px-5 py-2.5 rounded-2xl shadow-2xl shadow-slate-900/10">
        {/* Previous Button */}
        <button
          onClick={goToPrev}
          disabled={!hasPrev}
          className="p-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Diapositiva Anterior (Flecha Izquierda)"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Counter */}
        <div className="px-3.5 py-1 font-mono text-sm text-slate-800 flex items-center gap-1.5 border-x border-slate-200">
          <span className="font-extrabold text-sky-700 text-lg">{currentIndex + 1}</span>
          <span className="text-slate-400 font-semibold">/</span>
          <span className="text-slate-600 font-semibold">{totalSections}</span>
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          disabled={!hasNext}
          className="p-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Siguiente Diapositiva (Flecha Derecha / Espacio)"
        >
          <ChevronRight size={22} />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1"></div>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="p-2.5 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors"
          title={isFullscreen ? "Salir de pantalla completa (Esc)" : "Pantalla completa (F)"}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>

        {/* Keyboard Shortcuts Helper */}
        <button
          onClick={() => setShowShortcuts(s => !s)}
          className="p-2.5 rounded-xl text-slate-600 hover:text-sky-700 hover:bg-slate-100 transition-colors"
          title="Atajos de teclado"
        >
          <HelpCircle size={20} />
        </button>

        {/* Exit Presentation */}
        <button
          onClick={togglePresentationMode}
          className="p-2.5 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors ml-1"
          title="Salir de Modo Presentación (Esc)"
        >
          <X size={20} />
        </button>
      </div>

      {/* Shortcuts tooltip overlay */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-auto mt-3 bg-white/98 border border-slate-200 rounded-2xl p-5 shadow-2xl backdrop-blur-md text-sm font-mono text-slate-700 space-y-2.5 max-w-xs w-full"
          >
            <div className="font-black text-sky-700 mb-2 text-center uppercase tracking-wider text-xs border-b border-slate-100 pb-2">Atajos para el Expositor</div>
            <div className="flex justify-between gap-6"><span className="font-bold text-slate-900">→ o Espacio</span><span className="text-slate-600">Siguiente</span></div>
            <div className="flex justify-between gap-6"><span className="font-bold text-slate-900">←</span><span className="text-slate-600">Anterior</span></div>
            <div className="flex justify-between gap-6"><span className="font-bold text-slate-900">F</span><span className="text-slate-600">Pantalla Completa</span></div>
            <div className="flex justify-between gap-6"><span className="font-bold text-slate-900">Esc</span><span className="text-slate-600">Salir de Presentación</span></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
