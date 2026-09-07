import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const Conclusions = () => {
  const stats = [
    { value: '22', label: 'Módulos Temáticos', sub: 'Presentación Completa', color: 'text-cyan' },
    { value: '7', label: 'Capas del Modelo OSI', sub: 'De Física a Aplicación', color: 'text-purple-400' },
    { value: '8', label: 'Medios Analizados', sub: 'Guiados y No Guiados', color: 'text-emerald-400' },
    { value: '18', label: 'Preguntas Técnicas', sub: 'Evaluación de Dominio', color: 'text-orange' },
    { value: '∞', label: 'Posibilidades', sub: 'Software Distribuido', color: 'text-cyan-300' }
  ];

  return (
    <div className="flex flex-col gap-10 pb-12">
      <SectionHeader
        badge="22 • CIERRE & DASHBOARD EJECUTIVO"
        badgeColor="cyan"
        icon={<Award size={32} className="text-sky-600" />}
        title="Conclusiones y Síntesis Final"
        subtitle="Resumen de la arquitectura física y su rol insustituible como soporte material del software moderno"
      />

      {/* Visual Executive Dashboard Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {stats.map((s, idx) => (
          <Card key={idx} className="p-6 bg-white border-2 border-slate-200 shadow-md rounded-2xl text-center flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className={`text-5xl sm:text-6xl font-mono font-black ${s.color === 'text-cyan' ? 'text-sky-600' : s.color === 'text-cyan-300' ? 'text-cyan-600' : s.color} mb-1.5`}>
                {s.value}
              </div>
              <div className="text-sm sm:text-base font-display font-black text-slate-900">
                {s.label}
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-slate-500 mt-3 pt-2.5 border-t-2 border-slate-100">
              {s.sub}
            </div>
          </Card>
        ))}
      </div>

      {/* Visual Taxonomy Map Tree of Transmission Media */}
      <Card glowColor="cyan" className="p-6 sm:p-10 bg-white border-2 border-slate-200 shadow-xl rounded-2xl">
        <div className="border-b-2 border-slate-100 pb-4 mb-8 text-center">
          <span className="text-xs font-mono uppercase text-sky-700 font-black tracking-wider">
            Árbol Taxonómico de Medios de Transmisión
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">
            De la Red Global a los Medios Físicos Específicos
          </h3>
        </div>

        {/* Tree Topology Diagram */}
        <div className="flex flex-col items-center max-w-3xl mx-auto text-xs sm:text-sm font-mono">
          {/* Level 1: Internet */}
          <div className="p-4 px-8 rounded-2xl bg-sky-100 border-2 border-sky-600 text-sky-950 font-black text-base sm:text-lg shadow-md ring-2 ring-sky-400/30 tracking-wide">
            🌐 RED GLOBAL / INTERNET
          </div>

          <div className="w-1 h-8 bg-slate-300"></div>

          {/* Level 2: Guided vs Unguided */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="flex flex-col items-center">
              <div className="p-3.5 px-6 rounded-xl bg-sky-50 border-2 border-sky-500 text-sky-950 font-black text-sm sm:text-base shadow-sm">
                MEDIOS GUIADOS (CABLES)
              </div>
              <div className="w-1 h-6 bg-slate-300"></div>
              {/* Level 3 Guided Branches */}
              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-center shadow-sm">
                  <span className="text-amber-700 font-black block text-sm">COBRE</span>
                  <span className="text-xs text-slate-600 font-medium">UTP / STP</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-center shadow-sm">
                  <span className="text-sky-700 font-black block text-sm">FIBRA</span>
                  <span className="text-xs text-slate-600 font-medium">SMF / MMF</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-center shadow-sm">
                  <span className="text-orange-700 font-black block text-sm">RF COAX</span>
                  <span className="text-xs text-slate-600 font-medium">RG-8 / Heliax</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-3.5 px-6 rounded-xl bg-purple-50 border-2 border-purple-500 text-purple-950 font-black text-sm sm:text-base shadow-sm">
                MEDIOS NO GUIADOS (AIRE)
              </div>
              <div className="w-1 h-6 bg-slate-300"></div>
              {/* Level 3 Unguided Branches */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-center shadow-sm">
                  <span className="text-purple-700 font-black block text-sm">RADIO / WI-FI</span>
                  <span className="text-xs text-slate-600 font-medium">802.11 / Celular</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-center shadow-sm">
                  <span className="text-blue-700 font-black block text-sm">MICROONDAS</span>
                  <span className="text-xs text-slate-600 font-medium">Satélite / Guías</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Vertical Abstraction Flow from Physical to Software */}
      <Card className="p-6 sm:p-10 bg-white border-2 border-slate-200 shadow-xl rounded-2xl">
        <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900 mb-6 text-center">
          La Cadena de Trascendencia: De la Física al Software
        </h4>

        <div className="flex flex-wrap items-center justify-center gap-3.5 text-xs sm:text-sm font-mono font-black">
          <span className="px-4 py-2.5 rounded-xl bg-amber-50 border-2 border-amber-400 text-amber-950 shadow-sm">
            1. MEDIO FÍSICO
          </span>
          <span className="text-slate-400 font-black text-lg">➔</span>
          <span className="px-4 py-2.5 rounded-xl bg-sky-50 border-2 border-sky-400 text-sky-950 shadow-sm">
            2. SEÑAL / ENERGÍA
          </span>
          <span className="text-slate-400 font-black text-lg">➔</span>
          <span className="px-4 py-2.5 rounded-xl bg-blue-50 border-2 border-blue-400 text-blue-950 shadow-sm">
            3. CAPA FÍSICA (L1)
          </span>
          <span className="text-slate-400 font-black text-lg">➔</span>
          <span className="px-4 py-2.5 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 shadow-sm">
            4. TRAMAS & RED (L2-L3)
          </span>
          <span className="text-slate-400 font-black text-lg">➔</span>
          <span className="px-4 py-2.5 rounded-xl bg-purple-50 border-2 border-purple-400 text-purple-950 shadow-sm">
            5. TRANSPORTE (L4)
          </span>
          <span className="text-slate-400 font-black text-lg">➔</span>
          <span className="px-4 py-2.5 rounded-xl bg-indigo-50 border-2 border-indigo-400 text-indigo-950 shadow-sm">
            6. APLICACIÓN (L7)
          </span>
          <span className="text-slate-400 font-black text-lg">➔</span>
          <span className="px-5 py-2.5 rounded-xl bg-sky-100 border-2 border-sky-600 text-sky-950 shadow-md font-black text-sm sm:text-base ring-2 ring-sky-400/40">
            7. SOFTWARE EN PRODUCCIÓN
          </span>
        </div>
      </Card>

      {/* Cinematic Final Statement Banner */}
      <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 border-4 border-sky-400 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-4xl mx-auto space-y-5"
        >
          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-black bg-sky-950/80 px-4 py-1.5 rounded-full border border-sky-500/50 inline-block">
            Conclusión Central de la Exposición
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white leading-tight tracking-tight drop-shadow-md">
            "El software no viaja por el aire: necesita una infraestructura física que haga posible su comunicación."
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-mono font-medium pt-3">
            Universidad • Ingeniería de Software • Medios de Transmisión de Datos
          </p>
        </motion.div>
      </div>
    </div>
  );
};
