import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const FiberDiagram = ({ type }: { type: 'single' | 'multi' }) => {
  return (
    <div className="relative w-full h-32 bg-dark-900 rounded-lg overflow-hidden border border-cyan/30 mt-4 flex items-center group">
      {/* Cladding */}
      <div className="absolute inset-x-0 top-4 bottom-4 bg-slate-800/50 border-y border-slate-600"></div>
      
      {/* Core */}
      <div className={\bsolute inset-x-0 \ bg-cyan/10 border-y border-cyan/40\}></div>
      
      {/* Light Pulses */}
      {type === 'single' ? (
        <motion.div 
          animate={{ x: ['-10%', '110%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-1 bg-cyan shadow-[0_0_15px_#06b6d4] rounded-full"
        />
      ) : (
        <>
          <motion.svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <motion.path
              d="M 0 50 Q 25 10, 50 50 T 100 50"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1"
              className="drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <motion.path
              d="M 0 50 Q 25 90, 50 50 T 100 50"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              className="drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: 0.2 }}
            />
          </motion.svg>
        </>
      )}
    </div>
  );
};

export const FiberOptics = () => {
  return (
    <div className="h-full flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-cyan/20 text-cyan border border-cyan/30">
          <Zap size={28} />
        </div>
        <div>
          <h1 className="text-3xl text-white">Fibra Óptica</h1>
          <p className="text-slate-400">Transmisión de datos mediante pulsos de luz</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <Card glowColor="cyan">
          <h3 className="text-xl text-white mb-2 font-display">Monomodo (SMF)</h3>
          <p className="text-slate-300 text-sm mb-4">Núcleo muy pequeño (8-10 µm). La luz viaja en línea recta (un solo modo). Ideal para largas distancias (WAN, Backbone) con láseres caros.</p>
          <FiberDiagram type="single" />
        </Card>
        
        <Card glowColor="blue">
          <h3 className="text-xl text-white mb-2 font-display">Multimodo (MMF)</h3>
          <p className="text-slate-300 text-sm mb-4">Núcleo más grande (50-62.5 µm). La luz rebota en diferentes ángulos (múltiples modos). Ideal para distancias cortas (LAN, Data Centers) usando LEDs.</p>
          <FiberDiagram type="multi" />
        </Card>
      </div>

      <Card glowColor="slate" className="border-l-4 border-l-cyan mt-auto">
        <h4 className="text-sm uppercase font-bold tracking-wider text-slate-400 mb-2">💻 Ingeniería de Software</h4>
        <h3 className="text-lg text-white mb-2">Data Centers & Cloud</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Cuando despliegas contenedores en AWS, GCP o Azure, la interconexión entre los servidores dentro del mismo Availability Zone ocurre a velocidades de 40Gbps a 400Gbps gracias a la <strong>fibra óptica</strong>. La latencia casi nula de la fibra permite que bases de datos distribuidas (como Cassandra o Spanner) repliquen datos sincrónicamente sin penalizar el rendimiento de tu aplicación.
        </p>
      </Card>
    </div>
  );
};
