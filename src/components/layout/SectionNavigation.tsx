import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export const SectionNavigation = () => {
  const {
    currentIndex,
    prevSection,
    nextSection,
    goToNext,
    goToPrev,
    goToIndex,
    totalSections,
    hasNext,
    hasPrev
  } = useSectionNavigation();

  return (
    <nav 
      aria-label="Navegación entre temas"
      className="mt-16 pt-8 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-5 select-none"
    >
      {/* Previous Topic Button */}
      <div className="w-full sm:w-auto flex-1 flex justify-start">
        {hasPrev && prevSection ? (
          <button
            onClick={goToPrev}
            className="w-full sm:w-auto group flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300/90 hover:border-sky-400 text-left transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 group-hover:border-sky-300 text-slate-600 group-hover:text-sky-600 transition-colors flex-shrink-0">
              <ChevronLeft size={22} />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
                Tema Anterior
              </span>
              <span className="text-base sm:text-lg font-display font-extrabold text-slate-800 group-hover:text-sky-800 truncate block">
                {prevSection.title}
              </span>
            </div>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>

      {/* Center: Slide Progress Pill */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-300 text-sm font-mono text-slate-700 shadow-sm">
          <span className="text-sky-700 font-extrabold">Módulo {String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600 font-bold">{String(totalSections).padStart(2, '0')}</span>
        </div>
        {/* Progress bar line */}
        <div className="w-36 sm:w-52 h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300/50">
          <div 
            className="h-full bg-sky-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalSections) * 100}%` }}
          />
        </div>
        <span className="text-xs font-mono text-slate-500 hidden md:inline">
          Presiona <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-sky-700 border border-slate-300 font-bold">→</kbd> o <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-sky-700 border border-slate-300 font-bold">Espacio</kbd>
        </span>
      </div>

      {/* Next Topic Button */}
      <div className="w-full sm:w-auto flex-1 flex justify-end">
        {hasNext && nextSection ? (
          <button
            onClick={goToNext}
            className="w-full sm:w-auto group flex items-center justify-between sm:justify-end gap-3.5 px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 border border-sky-500 text-right transition-all duration-200 shadow-md shadow-sky-600/25 hover:shadow-lg hover:shadow-sky-600/35 text-white"
          >
            <div className="min-w-0 text-left sm:text-right">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-100 font-extrabold block">
                Siguiente Tema
              </span>
              <span className="text-base sm:text-lg font-display font-black text-white truncate block">
                {nextSection.title}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white text-sky-700 group-hover:scale-105 transition-transform flex-shrink-0 shadow-md">
              <ChevronRight size={22} />
            </div>
          </button>
        ) : (
          <button
            onClick={() => goToIndex(0)}
            className="w-full sm:w-auto group flex items-center justify-between sm:justify-end gap-3.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 border border-emerald-500 text-right transition-all duration-200 shadow-md shadow-emerald-600/25 text-white"
          >
            <div className="min-w-0 text-left sm:text-right">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-100 font-extrabold block">
                Exposición Finalizada
              </span>
              <span className="text-base sm:text-lg font-display font-black text-white truncate block">
                Reiniciar desde el Inicio
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white text-emerald-700 group-hover:scale-105 transition-transform flex-shrink-0 shadow-md">
              <RotateCcw size={22} />
            </div>
          </button>
        )}
      </div>
    </nav>
  );
};
