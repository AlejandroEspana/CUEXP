import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const SingleMode = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="09 • FIBRAS DE LARGA DISTANCIA"
        badgeColor="cyan"
        icon={<Zap size={28} className="text-cyan" />}
        title="Fibra Óptica Monomodo (SMF - Single Mode Fiber)"
        subtitle="Propagación axial directa sin dispersión modal para redes de telecomunicaciones WAN y enlaces interurbanos de alta capacidad"
      />

      {/* Visual Simulation: Straight Laser Ray in Narrow 9µm Core */}
      <Card glowColor="primary" className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md flex flex-col justify-between rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-2">
          <div>
            <span className="text-xs font-mono uppercase text-sky-700 font-extrabold tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Simulación de Propagación Monomodo (Normas OS1 / OS2)
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-2">
              Un Solo Modo Electromagnético Fundamental
            </h3>
          </div>
          <span className="text-sm font-mono text-sky-700 font-black bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Núcleo Diminuto: ~9 µm
          </span>
        </div>

        {/* Ray simulation SVG */}
        <div className="relative h-48 bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 flex items-center justify-center overflow-hidden shadow-xs">
          <svg className="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
            {/* Cladding 125µm */}
            <rect x="0" y="10" width="600" height="100" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="580" y="30" fill="#475569" fontSize="11" textAnchor="end" fontFamily="monospace" fontWeight="bold">Revestimiento (Cladding) 125 µm</text>

            {/* Core 9µm (Narrow straight channel) */}
            <rect x="0" y="55" width="600" height="10" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />

            {/* Straight Direct Laser Ray with zero bouncing */}
            <line x1="0" y1="60" x2="600" y2="60" stroke="#0284c7" strokeWidth="4" className="drop-shadow-[0_0_10px_rgba(2,132,199,0.8)]" />

            {/* Laser energy pulses travelling linearly in high-speed stream */}
            {[0, 0.4, 0.8, 1.2].map((delay, idx) => (
              <motion.circle
                key={idx}
                r="6"
                fill="#0284c7"
                stroke="#ffffff"
                strokeWidth="2"
                className="drop-shadow-[0_0_12px_#0284c7]"
                animate={{ cx: [-20, 620], cy: [60, 60] }}
                transition={{ duration: 1.6, repeat: Infinity, delay, ease: 'linear' }}
              />
            ))}
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm font-mono text-slate-700 mt-5 pt-4 border-t border-slate-200 gap-3">
          <div>Dispersión Modal: <span className="text-emerald-700 font-black bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">CERO (Inexistente)</span></div>
          <div>Atenuación Típica: <span className="text-slate-900 font-extrabold">~0.20 dB/km (a 1550nm)</span></div>
        </div>
      </Card>

      {/* Technical Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card className="p-6 bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow rounded-3xl">
          <span className="text-xs font-mono text-sky-700 uppercase font-black tracking-wider">Fuente Emisora</span>
          <h4 className="text-lg lg:text-xl font-display font-black text-slate-900 mt-1.5 mb-2.5">Diodos Láser (DFB / FP)</h4>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Emiten luz infrarroja coherente de altísima pureza espectral en longitudes de onda de 1310 nm (mínima dispersión) y 1550 nm (mínima atenuación).
          </p>
        </Card>

        <Card className="p-6 bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow rounded-3xl">
          <span className="text-xs font-mono text-sky-700 uppercase font-black tracking-wider">Alcance Geográfico</span>
          <h4 className="text-lg lg:text-xl font-display font-black text-slate-900 mt-1.5 mb-2.5">Hasta 120 km sin Repetidor</h4>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Permite unir ciudades enteras o cruzar océanos (mediante amplificadores ópticos EDFA submarinos) sin necesidad de convertir la luz a electricidad.
          </p>
        </Card>

        <Card className="p-6 bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow rounded-3xl">
          <span className="text-xs font-mono text-sky-700 uppercase font-black tracking-wider">Economía del Enlace</span>
          <h4 className="text-lg lg:text-xl font-display font-black text-slate-900 mt-1.5 mb-2.5">Transceptores de Alta Precisión</h4>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            El cable de fibra SMF es muy económico de producir, pero los módulos SFP+ LR (10km) o ZR (80km) requieren calibración láser de alta precisión y control térmico.
          </p>
        </Card>
      </div>

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Cables Submarinos, CDNs & Latencia Global"
        takeaway="El 99% del tráfico de Internet intercontinental viaja por fibras monomodo sumergidas en el fondo del océano."
      >
        <p>
          Cuando una aplicación web utiliza una CDN (Content Delivery Network como Cloudflare o Fastly) para acercar el contenido al usuario, los orígenes se sincronizan mediante <strong>cables submarinos de fibra monomodo</strong>.
        </p>
        <p>
          Si ejecutas un ping desde Bogotá a Tokio, los ~240 ms de RTT que observas no son lentitud de los servidores: corresponden a los 25,000 kilómetros que los fotones recorren a través de fibras monomodo submarinas con decenas de amplificadores ópticos en el lecho marino. Diseñar arquitecturas web distribuidas requiere entender este límite físico inquebrantable.
        </p>
      </EngineeringConnection>
    </div>
  );
};
