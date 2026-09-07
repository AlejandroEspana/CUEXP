import { OsiStack } from '../components/osi/OsiStack';
import { Card } from '../components/ui/Card';
import { Network, ArrowDownUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const OsiModel = () => {
  return (
    <div className="h-full flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-purple/20 text-purple border border-purple/30">
          <Network size={28} />
        </div>
        <div>
          <h1 className="text-3xl text-white">Modelo OSI</h1>
          <p className="text-slate-400">El estándar conceptual de 7 capas para redes de telecomunicaciones</p>
        </div>
      </header>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 overflow-hidden h-full">
          <OsiStack interactive />
        </div>
        
        <div className="flex flex-col gap-6">
          <Card glowColor="purple" className="flex-1">
            <h3 className="text-lg font-display text-white mb-4 flex items-center gap-2">
              <ArrowDownUp className="text-purple" size={20} />
              Encapsulación
            </h3>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              Cuando un dispositivo envía datos, la información viaja <strong>hacia abajo</strong> por el modelo OSI. 
              Cada capa añade su propia información de control (Header) a los datos que recibe de la capa superior.
            </p>
            <div className="bg-dark-900 rounded-lg p-4 border border-dark-700 font-mono text-xs space-y-2">
              <div className="text-purple-400">Datos (L7)</div>
              <div className="text-cyan-400">H4 + Datos (L4)</div>
              <div className="text-blue-400">H3 + [H4 + Datos] (L3)</div>
              <div className="text-emerald-400">H2 + [H3 + H4 + Datos] + T2 (L2)</div>
              <div className="text-orange-400">01010101 (L1)</div>
            </div>
          </Card>

          <Card glowColor="slate" className="bg-gradient-to-br from-dark-800 to-dark-900 border-l-4 border-l-purple relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Network size={100} />
            </div>
            <h4 className="text-sm uppercase font-bold tracking-wider text-slate-400 mb-2">💻 Ingeniería de Software</h4>
            <h3 className="text-lg text-white mb-2">¿Por qué importa?</h3>
            <p className="text-slate-300 text-sm leading-relaxed relative z-10">
              Como desarrollador, usualmente trabajas en la <strong>Capa 7</strong> (HTTP, APIs). Sin embargo, cuando hay problemas de rendimiento o conexión (Timeouts, CORS, DNS fails, latencia), necesitas entender cómo las capas subyacentes transportan (Capa 4 - TCP/UDP) y enrutan (Capa 3 - IP) tus peticiones para poder hacer <strong>troubleshooting</strong> y debugging efectivo.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
