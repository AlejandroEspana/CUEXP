import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OSI_LAYERS, type OsiLayer } from '../../data/osi';
import { cn } from '../layout/Layout';
import { ChevronRight, Cable, Layers, Code2 } from 'lucide-react';

interface OsiStackProps {
  activeLayers?: number[];
  interactive?: boolean;
  onLayerSelect?: (layer: OsiLayer) => void;
  showDetails?: boolean;
}

export const OsiStack = ({ activeLayers, interactive = true, onLayerSelect, showDetails = true }: OsiStackProps) => {
  const [selectedLayerNumber, setSelectedLayerNumber] = useState<number>(1);

  const selectedLayer = OSI_LAYERS.find(l => l.number === selectedLayerNumber) || OSI_LAYERS[OSI_LAYERS.length - 1];

  const handleSelect = (layer: OsiLayer) => {
    setSelectedLayerNumber(layer.number);
    onLayerSelect?.(layer);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start h-full w-full">
      {/* 7 Layers Vertical Block Stack */}
      <div className="flex flex-col gap-3 w-full lg:w-80 shrink-0">
        <span className="text-xs sm:text-sm font-mono text-slate-500 font-extrabold uppercase tracking-wider mb-1">
          Capas del Modelo OSI (Haz clic para explorar)
        </span>

        {OSI_LAYERS.map((layer) => {
          const isActive = activeLayers ? activeLayers.includes(layer.number) : true;
          const isSelected = selectedLayerNumber === layer.number;

          return (
            <motion.div
              key={layer.number}
              whileHover={interactive ? { scale: 1.02, x: 4 } : {}}
              onClick={() => interactive && handleSelect(layer)}
              className={cn(
                "relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between shadow-xs",
                isSelected
                  ? "border-sky-600 bg-sky-100 shadow-md ring-2 ring-sky-400/40"
                  : isActive
                    ? "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50"
                    : "border-slate-100 bg-slate-50 opacity-40 grayscale"
              )}
            >
              <div className="flex items-center gap-3.5">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-white shadow-sm text-base",
                  layer.color
                )}>
                  {layer.number}
                </div>
                <div>
                  <span className="font-display font-black text-base text-slate-900 block">
                    {layer.nameEs}
                  </span>
                  <span className="text-xs font-mono text-sky-700 font-bold">
                    {layer.pdu}
                  </span>
                </div>
              </div>
              {isSelected && (
                <ChevronRight size={22} className="text-sky-600" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Layer Detailed Inspector View */}
      {showDetails && (
        <div className="flex-1 w-full min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLayer.number}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.15 }}
              className="p-8 bg-white rounded-3xl border border-slate-200/90 shadow-md h-full flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-5 mb-6 pb-6 border-b border-slate-200">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-md", selectedLayer.color)}>
                    {selectedLayer.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-mono text-sky-700 uppercase tracking-wider font-extrabold bg-sky-50 px-3 py-0.5 rounded-full border border-sky-200">
                        Capa {selectedLayer.number} • Modelo OSI
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">
                      Capa de {selectedLayer.nameEs} ({selectedLayer.name})
                    </h3>
                    <div className="text-sm font-mono text-slate-600 mt-1">
                      Unidad de Datos de Protocolo (PDU): <strong className="text-sky-700 font-black">{selectedLayer.pdu}</strong>
                    </div>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-extrabold mb-1.5">
                      Función Principal
                    </h4>
                    <p className="text-slate-700 text-base lg:text-lg leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 font-normal">
                      {selectedLayer.function}
                    </p>
                  </div>

                  {/* Layer 1 Special Highlight: Physical Transmission Media */}
                  {selectedLayer.number === 1 && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300">
                      <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-900 font-black mb-2.5 flex items-center gap-2">
                        <Cable size={18} className="text-amber-700" />
                        Medios de Transmisión que Pertenecen a esta Capa:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['UTP / STP Cobre', 'Fibra Monomodo (SMF)', 'Fibra Multimodo (MMF)', 'Coaxial RG-8', 'Líneas Heliax RF', 'Guías de Onda Microondas', 'Ondas de Radio (Wi-Fi)'].map((m, i) => (
                          <span key={i} className="px-3 py-1 rounded-xl bg-white text-amber-950 text-xs sm:text-sm font-mono font-bold border border-amber-300 shadow-xs">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Layer 2 Special Highlight: Data Link & Frames */}
                  {selectedLayer.number === 2 && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300">
                      <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-emerald-900 font-black mb-2.5 flex items-center gap-2">
                        <Layers size={18} className="text-emerald-700" />
                        Protocolos y Dispositivos de Enlace:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Tramas Ethernet (IEEE 802.3)', 'Direcciones MAC (48 bits)', 'Switches L2', 'CSMA/CD & CSMA/CA', 'VLAN (802.1Q)', 'Verificación CRC-32 (FCS)'].map((m, i) => (
                          <span key={i} className="px-3 py-1 rounded-xl bg-white text-emerald-950 text-xs sm:text-sm font-mono font-bold border border-emerald-300 shadow-xs">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Protocols & Devices */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-extrabold mb-2">
                        Protocolos Clave
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLayer.protocols.map(p => (
                          <span key={p} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs sm:text-sm font-mono font-bold border border-slate-200">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-extrabold mb-2">
                        Dispositivos Físicos
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLayer.devices.map(d => (
                          <span key={d} className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 text-xs sm:text-sm font-mono font-bold border border-sky-200">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Software Connection Footer */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-start gap-3 text-sm font-mono text-purple-950 bg-purple-50 p-4 rounded-2xl border border-purple-200 shadow-xs">
                <Code2 size={18} className="text-purple-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-purple-900 font-black">¿Por qué le importa al Ingeniero de Software? </strong>
                  {selectedLayer.softwareConnection}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
