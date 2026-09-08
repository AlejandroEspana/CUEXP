import { useState } from 'react';
import { Card } from '../ui/Card';
import { ENCAPSULATION_FLOW } from '../../data/osi';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../layout/Layout';

export const OsiLab = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [mode, setMode] = useState<'encapsulate' | 'decapsulate'>('encapsulate');

  const steps = ENCAPSULATION_FLOW;
  const activeStep = steps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const toggleMode = (newMode: 'encapsulate' | 'decapsulate') => {
    setMode(newMode);
    setCurrentStepIndex(0);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="flex bg-slate-100 rounded-2xl p-1.5 border border-slate-200">
          <button
            onClick={() => toggleMode('encapsulate')}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-black transition-all flex items-center gap-2 shadow-xs border",
              mode === 'encapsulate'
                ? "bg-sky-100 border-sky-600 text-sky-950 shadow-md ring-2 ring-sky-400/40"
                : "border-transparent text-slate-600 hover:text-slate-900"
            )}
          >
            <ArrowDown size={16} className={mode === 'encapsulate' ? "text-sky-700" : "text-slate-600"} />
            <span>Encapsulación (Emisor: L7 → L1)</span>
          </button>
          <button
            onClick={() => toggleMode('decapsulate')}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-black transition-all flex items-center gap-2 shadow-xs border",
              mode === 'decapsulate'
                ? "bg-purple-100 border-purple-600 text-purple-950 shadow-md ring-2 ring-purple-400/40"
                : "border-transparent text-slate-600 hover:text-slate-900"
            )}
          >
            <ArrowUp size={16} className={mode === 'decapsulate' ? "text-purple-700" : "text-slate-600"} />
            <span>Desencapsulación (Receptor: L1 → L7)</span>
          </button>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-xs"
          >
            <ChevronLeft size={18} />
            Anterior
          </button>
          <div className="text-sm font-mono text-sky-800 font-extrabold px-3 py-1 bg-sky-50 rounded-xl border border-sky-200">
            Paso {currentStepIndex + 1} / {steps.length}
          </div>
          <button
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
            className="px-4 py-2.5 rounded-xl bg-sky-600 border border-sky-600 text-xs sm:text-sm font-mono text-white hover:bg-sky-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 font-black shadow-md shadow-sky-600/20"
          >
            Siguiente
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Visual Dynamic Packet Inspector (Headers added or peeled off) */}
      <Card glowColor="primary" className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md flex flex-col gap-8 rounded-3xl">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-mono text-sky-700 uppercase font-black tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              {mode === 'encapsulate' ? 'Descenso por la Pila OSI: Empaquetando Encabezados' : 'Ascenso por la Pila OSI: Retirando Encabezados'}
            </span>
            <span className="text-sm font-mono text-slate-600">
              PDU Actual: <strong className="text-slate-900 font-extrabold">{activeStep.pduName}</strong>
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-2">
            Capa {activeStep.layerNumber}: {activeStep.layerName}
          </h3>
        </div>

        {/* Visual Packet Frame Container */}
        <div className="relative p-8 bg-slate-50 rounded-2xl border-2 border-slate-200 overflow-x-auto shadow-xs">
          <div className="flex items-center justify-center gap-2 min-w-[700px] py-4">
            {/* L1 Preamble (visible on step >= 4) */}
            {currentStepIndex >= 4 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-3.5 rounded-xl bg-amber-100 border-2 border-amber-600 text-xs font-mono text-amber-950 font-bold text-center shadow-sm"
              >
                <div className="font-black text-amber-950 text-xs">PREÁMBULO + SFD (L1)</div>
                <div className="text-[10px] text-amber-900 font-bold mt-0.5">8 bytes sincronización</div>
              </motion.div>
            )}

            {/* L2 Ethernet Header (visible on step >= 3) */}
            {currentStepIndex >= 3 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-3.5 rounded-xl bg-emerald-100 border-2 border-emerald-600 text-xs font-mono text-emerald-950 font-bold text-center shadow-sm"
              >
                <div className="font-black text-emerald-950 text-xs">CABECERA MAC (L2)</div>
                <div className="text-[10px] text-emerald-900 font-bold mt-0.5">14 bytes (MAC Orig/Dest)</div>
              </motion.div>
            )}

            {/* L3 IP Header (visible on step >= 2) */}
            {currentStepIndex >= 2 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-3.5 rounded-xl bg-sky-100 border-2 border-sky-600 text-xs font-mono text-sky-950 font-bold text-center shadow-sm"
              >
                <div className="font-black text-sky-950 text-xs">CABECERA IP (L3)</div>
                <div className="text-[10px] text-sky-900 font-bold mt-0.5">20 bytes (IP Orig/Dest)</div>
              </motion.div>
            )}

            {/* L4 TCP Header (visible on step >= 1) */}
            {currentStepIndex >= 1 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-3.5 rounded-xl bg-blue-100 border-2 border-blue-600 text-xs font-mono text-blue-950 font-bold text-center shadow-sm"
              >
                <div className="font-black text-blue-950 text-xs">CABECERA TCP (L4)</div>
                <div className="text-[10px] text-blue-900 font-bold mt-0.5">20 bytes (Puertos 54120 → 443)</div>
              </motion.div>
            )}

            {/* L7 HTTP Data Payload (Always in the center) - Fixed High Contrast Cisco Light */}
            <div className="p-4 rounded-2xl bg-purple-100 border-2 border-purple-600 text-sm font-mono text-purple-950 font-black text-center shadow-md ring-2 ring-purple-400/40">
              <div className="text-purple-950 font-black text-sm uppercase tracking-wide">DATOS DE APLICACIÓN (L7)</div>
              <div className="text-xs text-purple-900 font-bold mt-1">HTTP GET /api/v1/users (JSON)</div>
            </div>

            {/* L2 CRC Trailer (visible on step >= 3) */}
            {currentStepIndex >= 3 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-3.5 rounded-xl bg-emerald-100 border-2 border-emerald-600 text-xs font-mono text-emerald-950 font-bold text-center shadow-sm"
              >
                <div className="font-black text-emerald-950 text-xs">COLA FCS (L2)</div>
                <div className="text-[10px] text-emerald-900 font-bold mt-0.5">4 bytes CRC-32</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Technical Description of Added Control Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h5 className="text-xs sm:text-sm font-mono uppercase text-sky-800 font-black mb-3">
              Información de Control Añadida en esta Capa:
            </h5>
            <div className="text-base font-mono text-slate-900 font-black mb-3">
              {activeStep.headerAdded}
            </div>
            <ul className="space-y-2 text-sm font-mono text-slate-700">
              {activeStep.headerFields.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                  <span className="font-semibold text-slate-800">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <h5 className="text-xs sm:text-sm font-mono uppercase text-purple-800 font-black mb-3">
                Explicación Didáctica del Paso:
              </h5>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium mb-4">
                {activeStep.payloadDescription}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm shadow-inner">
              <span className="text-slate-400 font-normal">Serialización binaria: </span>
              <span className="text-emerald-400 font-black tracking-wider">{activeStep.binaryRepresentation}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
