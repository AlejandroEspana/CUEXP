import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OSI_LAYERS, OsiLayer } from '../../data/osi';
import { cn } from '../layout/Layout';
import { ChevronRight } from 'lucide-react';

interface OsiStackProps {
  activeLayers?: number[];
  interactive?: boolean;
  onLayerSelect?: (layer: OsiLayer) => void;
  showDetails?: boolean;
}

export const OsiStack = ({ activeLayers, interactive = false, onLayerSelect, showDetails = true }: OsiStackProps) => {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  return (
    <div className="flex gap-8 items-start h-full w-full">
      <div className="flex flex-col gap-2 w-64 shrink-0">
        {OSI_LAYERS.map((layer) => {
          const isActive = activeLayers ? activeLayers.includes(layer.number) : true;
          const isHovered = hoveredLayer === layer.number;
          
          return (
            <motion.div
              key={layer.number}
              whileHover={interactive ? { scale: 1.02, x: 5 } : {}}
              onClick={() => interactive && onLayerSelect?.(layer)}
              onHoverStart={() => setHoveredLayer(layer.number)}
              onHoverEnd={() => setHoveredLayer(null)}
              className={cn(
                "relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-between",
                isActive 
                  ? \order-\/50 bg-dark-800/80 shadow-[0_0_15px_rgba(0,0,0,0.5)]\ 
                  : "border-dark-700 bg-dark-800/30 opacity-40 grayscale",
                isHovered && isActive && "border-cyan/80 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded flex items-center justify-center font-bold text-white shadow-inner",
                  layer.color
                )}>
                  {layer.number}
                </div>
                <span className="font-display font-semibold text-slate-200">
                  {layer.name}
                </span>
              </div>
              {interactive && isActive && (
                <ChevronRight size={18} className="text-slate-500" />
              )}
            </motion.div>
          );
        })}
      </div>

      {showDetails && (
        <div className="flex-1 min-h-[400px]">
          <AnimatePresence mode="wait">
            {hoveredLayer ? (
              <motion.div
                key={hoveredLayer}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-panel p-6 h-full flex flex-col"
              >
                {(() => {
                  const layer = OSI_LAYERS.find(l => l.number === hoveredLayer)!;
                  return (
                    <>
                      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-dark-700">
                        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold text-white", layer.color)}>
                          {layer.number}
                        </div>
                        <div>
                          <h3 className="text-2xl font-display font-bold text-white">{layer.name}</h3>
                          <div className="text-sm font-mono text-cyan">PDU: {layer.pdu}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-2">Función Principal</h4>
                          <p className="text-slate-300 leading-relaxed">{layer.function}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-2">Protocolos</h4>
                          <div className="flex flex-wrap gap-2">
                            {layer.protocols.map(p => (
                              <span key={p} className="px-2.5 py-1 rounded bg-dark-700 text-slate-300 text-sm border border-dark-600">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-2">Dispositivos Relacionados</h4>
                          <div className="flex flex-wrap gap-2">
                            {layer.devices.map(d => (
                              <span key={d} className="px-2.5 py-1 rounded bg-primary/10 text-primary text-sm border border-primary/20">
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center text-slate-500 border-2 border-dashed border-dark-700 rounded-xl"
              >
                Pasa el cursor sobre una capa para ver más detalles
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
