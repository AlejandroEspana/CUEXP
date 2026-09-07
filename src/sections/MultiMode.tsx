import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { MULTIMODE_CATEGORIES } from '../data/fiber';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

export const MultiMode = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="10 • FIBRAS DE ALTA DENSIDAD EN DATACENTER"
        badgeColor="cyan"
        icon={<Layers size={28} className="text-cyan" />}
        title="Fibra Óptica Multimodo (MMF - Multi Mode Fiber)"
        subtitle="Múltiples trayectorias de propagación en núcleo ancho (50µm) y tecnología VCSEL para interconexión dentro de centros de datos"
      />

      {/* Visual Simulation: Multiple Bouncing Modes in 50µm Core */}
      <Card glowColor="primary" className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md flex flex-col justify-between rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-2">
          <div>
            <span className="text-xs font-mono text-sky-700 uppercase font-black tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Simulación de Dispersión Modal (Normas OM3 / OM4)
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-2">
              Múltiples Modos de Propagación Simultáneos
            </h3>
          </div>
          <span className="text-sm font-mono text-sky-700 font-black bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Núcleo Amplio: 50 µm
          </span>
        </div>

        {/* Multi-ray bouncing simulation */}
        <div className="relative h-52 bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 flex items-center justify-center overflow-hidden shadow-xs">
          <svg className="w-full h-full" viewBox="0 0 600 140" preserveAspectRatio="none">
            {/* Cladding top */}
            <rect x="0" y="5" width="600" height="30" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="580" y="22" fill="#475569" fontSize="11" textAnchor="end" fontFamily="monospace" fontWeight="bold">Revestimiento / Cladding 125 µm</text>

            {/* Core 50µm (Wide channel) */}
            <rect x="0" y="35" width="600" height="70" fill="#e0f2fe" stroke="#0284c7" strokeDasharray="3 3" strokeWidth="1.5" />
            <text x="300" y="75" fill="#0369a1" fontSize="13" textAnchor="middle" fontFamily="monospace" fontWeight="900">
              NÚCLEO MULTIMODO (50 µm)
            </text>

            {/* Cladding bottom */}
            <rect x="0" y="105" width="600" height="30" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Mode 1: Center low-angle ray (Cyan) - Arrives fastest */}
            <path
              d="M 0 70 Q 150 50, 300 70 T 600 70"
              fill="none"
              stroke="#0284c7"
              strokeWidth="3"
              className="drop-shadow-[0_0_8px_rgba(2,132,199,0.7)]"
            />
            <motion.circle
              r="6"
              fill="#0284c7"
              stroke="#ffffff"
              strokeWidth="2"
              className="drop-shadow-[0_0_10px_#0284c7]"
              animate={{ cx: [0, 150, 300, 450, 600], cy: [70, 60, 70, 60, 70] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Mode 2: High angle bounce ray (Blue) */}
            <path
              d="M 0 70 L 60 36 L 180 104 L 300 36 L 420 104 L 540 36 L 600 70"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_8px_rgba(37,99,235,0.7)]"
            />
            <motion.circle
              r="5.5"
              fill="#2563eb"
              stroke="#ffffff"
              strokeWidth="2"
              className="drop-shadow-[0_0_10px_#2563eb]"
              animate={{ 
                cx: [0, 60, 180, 300, 420, 540, 600], 
                cy: [70, 36, 104, 36, 104, 36, 70] 
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Mode 3: Steep angle bounce ray (Purple) - Arrives latest */}
            <path
              d="M 0 70 L 40 36 L 120 104 L 200 36 L 280 104 L 360 36 L 440 104 L 520 36 L 600 70"
              fill="none"
              stroke="#9333ea"
              strokeWidth="2"
              strokeDasharray="5 3"
              className="drop-shadow-[0_0_8px_rgba(147,51,234,0.7)]"
            />
            <motion.circle
              r="5"
              fill="#9333ea"
              stroke="#ffffff"
              strokeWidth="2"
              className="drop-shadow-[0_0_10px_#9333ea]"
              animate={{ 
                cx: [0, 40, 120, 200, 280, 360, 440, 520, 600], 
                cy: [70, 36, 104, 36, 104, 36, 104, 36, 70] 
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm font-mono text-slate-700 mt-5 pt-4 border-t border-slate-200 gap-3">
          <div>Dispersión Modal: <span className="text-amber-800 font-extrabold bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">Alta (Limita distancia máxima a &lt; 550m)</span></div>
          <div>Fuente Emisora Típica: <span className="text-slate-900 font-extrabold">Láseres VCSEL a 850 nm</span></div>
        </div>
      </Card>

      {/* Categories Table (OM1 to OM5) */}
      <Card className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md rounded-3xl">
        <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900 mb-6 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
            <Layers size={22} />
          </div>
          Clasificación de Fibras Multimodo (Norma ISO/IEC 11801)
        </h4>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm font-mono border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-black">
                <th className="py-3 px-4">Grado</th>
                <th className="py-3 px-4">Diámetro Núcleo</th>
                <th className="py-3 px-4">Fuente Óptica</th>
                <th className="py-3 px-4 text-sky-700">Ancho de Banda Modal</th>
                <th className="py-3 px-4 text-emerald-700">Distancia Máx. 10G</th>
                <th className="py-3 px-4">Color de Chaqueta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {MULTIMODE_CATEGORIES.map((om) => (
                <tr key={om.grade} className="hover:bg-sky-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-black text-sky-900">{om.grade}</td>
                  <td className="py-3.5 px-4 font-semibold">{om.core}</td>
                  <td className="py-3.5 px-4">{om.source}</td>
                  <td className="py-3.5 px-4 text-sky-800 font-bold">{om.bandwidth}</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-extrabold">{om.dist10G}</td>
                  <td className="py-3.5 px-4 font-medium">{om.jacket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Redes Spine-Leaf de Datacenter & Microservicios"
        takeaway="La fibra OM4 es la reina del Datacenter por su relación insuperable de costo por gigabit en distancias menores a 150 metros."
      >
        <p>
          En la arquitectura de red moderna de cualquier centro de datos (como los clusters donde corre Kubernetes), los switches de acceso (Leaf) y los switches centrales (Spine) se interconectan mediante <strong>fibra multimodo OM4 con conectores MTP/MPO a 100 Gbps y 400 Gbps</strong>.
        </p>
        <p>
          Aunque la fibra multimodo no puede alcanzar kilómetros, dentro de una sala de servidores donde las distancias no superan los 80 metros, utilizar transceptores VCSEL multimodo (SFP-10G-SR) reduce los costos de hardware del proyecto en un 70% comparado con transceptores monomodo de larga distancia.
        </p>
      </EngineeringConnection>
    </div>
  );
};
