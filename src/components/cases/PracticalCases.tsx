import { useState } from 'react';
import { Card } from '../ui/Card';
import { PRACTICAL_CASES } from '../../data/cases';
import { CheckCircle2, XCircle, ChevronRight, HelpCircle, Layers } from 'lucide-react';
import { cn } from '../layout/Layout';

export const PracticalCases = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedCases, setSubmittedCases] = useState<Record<string, boolean>>({});

  const currentCase = PRACTICAL_CASES[activeCaseIndex];
  const selectedOptionId = selectedAnswers[currentCase.id];
  const isSubmitted = submittedCases[currentCase.id];

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentCase.id]: optionId }));
  };

  const handleVerify = () => {
    if (!selectedOptionId) return;
    setSubmittedCases(prev => ({ ...prev, [currentCase.id]: true }));
  };

  const handleResetCase = () => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentCase.id];
      return copy;
    });
    setSubmittedCases(prev => {
      const copy = { ...prev };
      delete copy[currentCase.id];
      return copy;
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Case Navigator Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
        {PRACTICAL_CASES.map((c, idx) => {
          const isCurrent = idx === activeCaseIndex;
          const isDone = submittedCases[c.id];
          const isPassed = isDone && selectedAnswers[c.id] === c.correctId;

          return (
            <button
              key={c.id}
              onClick={() => setActiveCaseIndex(idx)}
              className={cn(
                "flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono transition-all border-2 flex items-center gap-2.5 shadow-sm",
                isCurrent 
                  ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-md ring-2 ring-sky-400/40" 
                  : "bg-white border-slate-200 text-slate-700 hover:border-sky-300 font-bold"
              )}
            >
              <span>Caso {c.number}:</span>
              <span className="truncate max-w-[150px]">{c.title.split(' ')[0]}</span>
              {isDone && (
                isPassed ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-red-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Case Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scenario and Options (7 cols) */}
        <Card className="lg:col-span-7 p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3 mb-4">
              <span className="text-xs font-mono uppercase text-sky-700 font-black tracking-wider">
                Desafío de Arquitectura #{currentCase.number}
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                Escenario de Campo Real
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-4">
              {currentCase.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-800 leading-relaxed bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 mb-5 font-sans font-medium">
              {currentCase.context}
            </p>

            <div className="mb-5">
              <span className="text-xs font-mono uppercase text-slate-600 font-black block mb-2">
                Restricciones y Requerimientos Físicos:
              </span>
              <ul className="space-y-2 text-xs sm:text-sm font-mono text-slate-800">
                {currentCase.constraints.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-sky-600 font-black text-base">•</span>
                    <span className="font-semibold">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Options Selection */}
            <div className="space-y-3 mt-4">
              <span className="text-xs font-mono uppercase text-slate-600 font-black block mb-1">
                Selecciona la Solución Tecnológica Adecuada:
              </span>
              {currentCase.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrect = option.id === currentCase.correctId;

                let optionStyle = "bg-slate-50 border-slate-200 hover:border-sky-400 hover:bg-white text-slate-800";
                if (isSubmitted) {
                  if (isCorrect) optionStyle = "bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-400/30";
                  else if (isSelected && !isCorrect) optionStyle = "bg-red-50 border-red-600 text-red-950 ring-2 ring-red-400/30";
                  else optionStyle = "opacity-40 border-slate-200 bg-slate-100";
                } else if (isSelected) {
                  optionStyle = "bg-sky-50 border-sky-600 text-sky-950 ring-2 ring-sky-400/40 shadow-sm font-bold";
                }

                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm font-mono",
                      optionStyle
                    )}
                  >
                    <div>
                      <div className="font-black text-slate-900 text-sm sm:text-base mb-1">{option.name}</div>
                      <div className="text-xs sm:text-sm text-slate-600 font-sans font-medium">{option.description}</div>
                    </div>
                    {isSubmitted && isCorrect && <CheckCircle2 size={22} className="text-emerald-600 flex-shrink-0 ml-3" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle size={22} className="text-red-600 flex-shrink-0 ml-3" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center pt-5 border-t-2 border-slate-100 mt-6">
            {isSubmitted ? (
              <button
                onClick={handleResetCase}
                className="text-xs sm:text-sm font-mono text-slate-600 hover:text-slate-900 font-bold transition-colors underline"
              >
                Intentar otra opción
              </button>
            ) : <div></div>}

            {!isSubmitted ? (
              <button
                onClick={handleVerify}
                disabled={!selectedOptionId}
                className="px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-black text-sm sm:text-base font-mono disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
              >
                Evaluar Solución
              </button>
            ) : (
              <button
                onClick={() => setActiveCaseIndex((activeCaseIndex + 1) % PRACTICAL_CASES.length)}
                className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-xl font-black text-sm sm:text-base font-mono hover:bg-sky-500 transition-all shadow-md"
              >
                Siguiente Caso
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </Card>

        {/* Technical Analysis and Resolution Panel (5 cols) */}
        <Card glowColor="cyan" className="lg:col-span-5 p-6 sm:p-8 bg-white border-2 border-sky-200 shadow-lg rounded-2xl flex flex-col justify-between">
          {isSubmitted ? (
            <div className="space-y-5">
              <div className="border-b-2 border-slate-100 pb-3">
                <span className="text-xs font-mono text-sky-700 uppercase tracking-wider font-black">
                  Resolución del Dictamen Técnico
                </span>
                <h3 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mt-1">
                  {currentCase.solutionTitle}
                </h3>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase text-emerald-800 font-black mb-1.5">
                  Justificación de Ingeniería
                </h5>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border-2 border-slate-200 font-sans font-medium">
                  {currentCase.detailedRationale}
                </p>
              </div>

              {selectedOptionId !== currentCase.correctId && (
                <div>
                  <h5 className="text-xs font-mono uppercase text-red-800 font-black mb-1.5">
                    ¿Por qué tu opción seleccionada fallaría?
                  </h5>
                  <p className="text-xs sm:text-sm text-red-950 leading-relaxed bg-red-50 p-4 rounded-xl border-2 border-red-300 font-sans font-medium">
                    {currentCase.whyOthersFail[selectedOptionId] || 'Esta opción no cumple con los límites físicos o presupuestarios requeridos.'}
                  </p>
                </div>
              )}

              <div>
                <h5 className="text-xs font-mono uppercase text-purple-800 font-black mb-2 flex items-center gap-2">
                  <Layers size={16} />
                  Capas OSI Involucradas
                </h5>
                <div className="space-y-2">
                  {currentCase.osiLayers.map((l, i) => (
                    <div key={i} className="text-xs sm:text-sm font-mono bg-slate-50 p-3 rounded-xl border-2 border-slate-200">
                      <span className="font-black text-sky-800">Capa {l.layer} ({l.name}): </span>
                      <span className="text-slate-700 font-sans">{l.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-8">
              <div className="p-5 rounded-2xl bg-sky-100 text-sky-700 mb-4 shadow-inner">
                <HelpCircle size={48} />
              </div>
              <h4 className="text-xl font-display font-black text-slate-900 mb-2">
                Modo Análisis de Caso
              </h4>
              <p className="text-sm sm:text-base text-slate-600 max-w-sm leading-relaxed font-sans font-medium">
                Selecciona la tecnología física de transmisión que consideras óptima y presiona "Evaluar Solución" para ver la justificación de ingeniería.
              </p>
            </div>
          )}

          <div className="mt-5 pt-4 border-t-2 border-slate-100 text-sm font-mono text-slate-700">
            <strong className="text-purple-700 font-bold">Impacto en Software: </strong>
            {currentCase.softwareEngineeringImpact}
          </div>
        </Card>
      </div>
    </div>
  );
};
