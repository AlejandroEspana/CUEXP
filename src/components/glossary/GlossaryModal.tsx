import { useState, useMemo } from 'react';
import { Modal } from '../ui/Modal';
import { GLOSSARY_TERMS, type GlossaryTerm } from '../../data/glossary';
import { Search, BookOpen, Code2 } from 'lucide-react';
import { cn } from '../layout/Layout';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const GlossaryModal = ({ isOpen, onClose, initialQuery = '' }: GlossaryModalProps) => {
  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(GLOSSARY_TERMS.map(t => t.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      const matchesSearch = 
        item.term.toLowerCase().includes(search.toLowerCase()) ||
        item.shortDef.toLowerCase().includes(search.toLowerCase()) ||
        item.fullDef.toLowerCase().includes(search.toLowerCase());
      
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Glosario Técnico de Telecomunicaciones"
      subtitle="Definiciones rigurosas e impacto en Ingeniería de Software"
      maxWidth="4xl"
    >
      <div className="flex flex-col gap-6">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar término (ej. Atenuación, BNC, Mufla, MTU, Fibra)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-medium focus:outline-none focus:border-sky-600 transition-colors shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap border-2 font-bold",
                  selectedCategory === cat
                    ? "bg-sky-50 text-sky-950 border-sky-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200"
                )}
              >
                {cat === 'all' ? 'Todos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* List of Terms and Detail View */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 min-h-[460px]">
          {/* Terms Column */}
          <div className="md:col-span-5 border-2 border-slate-200 rounded-2xl overflow-y-auto max-h-[460px] p-2.5 space-y-2 custom-scrollbar bg-slate-50/60">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm font-medium">
                No se encontraron términos para "{search}"
              </div>
            ) : (
              filteredTerms.map((term) => {
                const isSelected = (selectedTerm?.id || filteredTerms[0]?.id) === term.id;
                return (
                  <div
                    key={term.id}
                    onClick={() => setSelectedTerm(term)}
                    className={cn(
                      "p-3.5 rounded-xl cursor-pointer transition-all duration-150 border-2 text-left",
                      isSelected
                        ? "bg-sky-50 border-sky-600 text-sky-950 shadow-md font-bold"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-sm sm:text-base text-slate-900">
                        {term.term}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-bold uppercase">
                        {term.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1 font-sans font-medium">
                      {term.shortDef}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 border-2 border-slate-200 rounded-2xl p-6 bg-white flex flex-col justify-between shadow-sm">
            {(() => {
              const active = selectedTerm || filteredTerms[0];
              if (!active) {
                return (
                  <div className="h-full flex items-center justify-center text-slate-500 text-sm font-medium">
                    Selecciona un término de la lista
                  </div>
                );
              }

              return (
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono px-3 py-1 rounded-lg bg-sky-50 border-2 border-sky-300 text-sky-800 font-black">
                        {active.category}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                      {active.term}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-600 font-black flex items-center gap-2">
                      <BookOpen size={16} className="text-sky-600" />
                      Definición Técnica
                    </h4>
                    <p className="text-slate-800 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border-2 border-slate-200 font-sans font-medium">
                      {active.fullDef}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-sky-800 font-black flex items-center gap-2">
                      <Code2 size={16} className="text-sky-600" />
                      ¿Por qué le importa a un Desarrollador?
                    </h4>
                    <p className="text-sky-950 text-sm sm:text-base leading-relaxed bg-sky-50/80 p-4 rounded-xl border-2 border-sky-200 font-sans font-medium">
                      {active.softwareConnection}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </Modal>
  );
};
