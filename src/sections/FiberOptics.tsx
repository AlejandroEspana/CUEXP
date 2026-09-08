import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { Card } from '../components/ui/Card';
import { Fiber3DTransversal } from '../components/network/Fiber3DTransversal';
import { motion } from 'framer-motion';
import { Zap, Layers } from 'lucide-react';

export const FiberOptics = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="08 • COMUNICACIONES ÓPTICAS"
        badgeColor="cyan"
        icon={<Zap size={28} className="text-cyan" />}
        title="Fundamentos de Fibra Óptica"
        subtitle="Transmisión binaria de información mediante pulsos de radiación luminosa guiados por reflexión interna total"
      />

      {/* Physics of Total Internal Reflection (TIR) Interactive Animation */}
      <Card glowColor="primary" className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md flex flex-col justify-between rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-2">
          <div>
            <span className="text-xs font-mono text-sky-700 uppercase font-black tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Principio Óptico de Confinamiento Ondulatorio
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-2">
              Reflexión Interna Total (Ley de Snell)
            </h3>
          </div>
          <span className="text-sm font-mono text-slate-600 font-bold">n₁ (Núcleo) &gt; n₂ (Revestimiento)</span>
        </div>

        {/* SVG Fiber Waveguide Cutaway with Light Ray Reflection */}
        <div className="relative h-72 bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 flex items-center justify-center overflow-hidden shadow-xs">
          <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
            {/* Cladding top (n2 = 1.45) */}
            <rect x="0" y="20" width="600" height="40" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="580" y="45" fill="#475569" fontSize="11" textAnchor="end" fontFamily="monospace" fontWeight="bold">Revestimiento / Cladding (n₂ = 1.45)</text>

            {/* Core in the center (n1 = 1.48) */}
            <rect x="0" y="60" width="600" height="80" fill="#e0f2fe" stroke="#0284c7" strokeDasharray="4 2" strokeWidth="2" />
            <text x="300" y="105" fill="#0369a1" fontSize="13" textAnchor="middle" fontFamily="monospace" fontWeight="900">
              NÚCLEO DE VIDRIO DE SÍLICE (n₁ = 1.48)
            </text>

            {/* Cladding bottom (n2 = 1.45) */}
            <rect x="0" y="140" width="600" height="40" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="580" y="165" fill="#475569" fontSize="11" textAnchor="end" fontFamily="monospace" fontWeight="bold">Revestimiento / Cladding (n₂ = 1.45)</text>

            {/* Light beam bouncing at critical angle (> θc) */}
            {/* Base guide trajectory */}
            <path
              d="M 0 100 L 75 60 L 225 140 L 375 60 L 525 140 L 600 100"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="6 4"
            />

            {/* Flowing Laser Beam with continuous emission */}
            <motion.path
              d="M 0 100 L 75 60 L 225 140 L 375 60 L 525 140 L 600 100"
              fill="none"
              stroke="#0284c7"
              strokeWidth="4"
              strokeLinecap="round"
              className="drop-shadow-[0_0_12px_rgba(2,132,199,0.7)]"
              strokeDasharray="50 25"
              animate={{ strokeDashoffset: [0, -150] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Light photon pulse energy traveling along beam */}
            <motion.circle
              r="8"
              fill="#0284c7"
              stroke="#ffffff"
              strokeWidth="2"
              className="drop-shadow-[0_0_15px_#0284c7]"
              animate={{
                cx: [0, 75, 225, 375, 525, 600],
                cy: [100, 60, 140, 60, 140, 100]
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm font-mono text-slate-700 mt-5 pt-4 border-t border-slate-200 gap-3">
          <div>Condición Matemática: <span className="text-sky-700 font-extrabold">Ángulo de Incidencia &gt; Ángulo Crítico (θc = arcsin(n₂ / n₁))</span></div>
          <div className="text-emerald-700 font-black bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Inmunidad EMI: 100%</div>
        </div>
      </Card>

      {/* 3D & 2D Anatomical Cutaway Model */}
      <div className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase text-sky-700 font-black tracking-wider">
              Anatomía Microscópica del Medio Dieléctrico
            </span>
            <h3 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mt-1 flex items-center gap-2.5">
              <Layers size={26} className="text-sky-600" />
              Estructura Tridimensional y Capas de la Fibra Óptica
            </h3>
          </div>
          <span className="text-sm font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Exploración 3D Longitudinal y Corte 2D Concéntrico
          </span>
        </div>

        <Fiber3DTransversal />
      </div>

      {/* Physical Structure and Loss Mechanisms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            title: '1. Núcleo (Core)',
            desc: 'Cilindro central de sílice pura dopada con germanio donde viaja la luz. Mide 9µm (monomodo) o 50µm (multimodo).'
          },
          {
            title: '2. Revestimiento (Cladding)',
            desc: 'Capa concéntrica de 125µm de vidrio con menor índice refractivo que produce la reflexión interna total.'
          },
          {
            title: '3. Atenuación Óptica',
            desc: 'Pérdida por absorción de impurezas OH- y dispersión de Rayleigh. Mínima a 1550nm (~0.2 dB/km).'
          },
          {
            title: '4. Dispersión Cromática',
            desc: 'Diferentes longitudes de onda viajan a velocidades ligeramente distintas, ensanchando los pulsos con la distancia.'
          }
        ].map((item, idx) => (
          <Card key={idx} className="p-6 bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow rounded-3xl">
            <h4 className="text-base sm:text-lg font-display font-black text-slate-900 mb-2">{item.title}</h4>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">{item.desc}</p>
          </Card>
        ))}
      </div>

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Cloud, Data Centers & Replicación Transcontinental"
        takeaway="La fibra óptica hace posible que los Availability Zones (AZ) de AWS o Azure sincronicen bases de datos con latencia sub-milisegundo."
      >
        <p>
          Cuando despliegas una aplicación en la nube moderna, das por sentado que puedes escribir en una base de datos en `us-east-1a` y tener réplicas de lectura en `us-east-1b` sin inconsistencias de datos (Consistencia Fuerte ACID).
        </p>
        <p>
          Esto es posible únicamente gracias a redes malladas de <strong>fibra óptica oscura de ultra alta velocidad (400 Gbps a 800 Gbps por canal óptico)</strong> tendidas entre los centros de datos. La velocidad de la luz en el vidrio de sílice (~204,000 km/s) es la constante física que impone la cota inferior de rendimiento a cualquier arquitectura distribuida en el planeta.
        </p>
      </EngineeringConnection>
    </div>
  );
};
