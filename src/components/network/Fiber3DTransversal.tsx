import { useState } from 'react';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Layers, Zap, Eye, EyeOff, Sparkles } from 'lucide-react';
import { cn } from '../layout/Layout';

export type FiberKind = 'smf' | 'mmf';

interface FiberLayerSpec {
  id: string;
  name: string;
  category: string;
  material: string;
  thickness: string;
  norm: string;
  description: string;
  softwareImpact: string;
  physicsFormula: string;
  color: string;
}

const FIBER_LAYERS: Record<FiberKind, FiberLayerSpec[]> = {
  smf: [
    {
      id: 'jacket',
      name: '1. Cubierta Exterior (Outer Jacket)',
      category: 'Protección Mecánica y Retardante de Llama',
      material: 'Polímero LSZH (Low Smoke Zero Halogen) ignífugo color Amarillo',
      thickness: 'Diámetro exterior: 2.0 mm - 3.0 mm (Espesor pared: 0.50 mm)',
      norm: 'ANSI/TIA-598-D (Color Amarillo para SMF OS1/OS2) / UL 1666',
      description: 'Aisla los componentes ópticos internos contra tracción mecánica, rayos UV, agentes químicos y humedad. La formulación LSZH garantiza cero emisiones de gases tóxicos en caso de incendio en racks.',
      softwareImpact: 'Una rotura en la cubierta expone el vidrio al agua, lo que genera microcurvaturas por congelamiento o absorción que elevan la atenuación óptica, disparando reintentos en protocolos de capa de transporte.',
      physicsFormula: 'Radio mín. curvatura \\ge 30\\text{ mm} \\quad | \\quad R_{tracción} > 150\\text{ N}',
      color: '#eab308'
    },
    {
      id: 'kevlar',
      name: '2. Miembros de Tracción (Aramid / Kevlar®)',
      category: 'Alivio de Tensión y Resistencia a Tracción Longitudinal',
      material: 'Hiladuras de poliaramida hilada de ultra alto módulo elástico',
      thickness: 'Múltiples mechas perimétricas de 1420 dtex (espesor ~0.35 mm)',
      norm: 'Telcordia GR-409-CORE / IEC 60794-1-2',
      description: 'Absorbe el 100% de la fuerza de tiro durante el jalado por ductos, impidiendo que el frágil filamento de sílice experimente elongación axial o microfracturas por tensión mecánica.',
      softwareImpact: 'Protege los enlaces físicos transcontinentales de vibraciones en puentes y ductos; sin Kevlar, las obras viales cortarían las fibras causando particionamiento de red en clústeres distribuidos.',
      physicsFormula: '\\sigma = \\frac{F}{A} \\quad | \\quad \\text{Tensión máx. admisible} > 1000\\text{ N}',
      color: '#ca8a04'
    },
    {
      id: 'buffer',
      name: '3. Recubrimiento Búfer (Tight Buffer / Coating)',
      category: 'Amortiguación Mecánica y Barrera Hidrofóbica',
      material: 'Acrilato curado por UV primario (250µm) + elastómero secundario (900µm)',
      thickness: 'Diámetro 900 µm (capa primaria de 250 µm sobre el revestimiento)',
      norm: 'ITU-T G.652.D / IEC 60793-2-50',
      description: 'Proporciona protección elástica contra microcurvaturas causadas por irregularidades microscópicas de presión y sella herméticamente la superficie del vidrio contra la humedad OH-.',
      softwareImpact: 'El ingreso de iones hidroxilo (OH-) genera el pico de agua a 1383 nm, degradando los canales CWDM utilizados en interconexiones metropolitanas de APIs.',
      physicsFormula: 'E_{módulo} \\approx 1.2\\text{ GPa} \\quad | \\quad \\alpha_{OH} < 0.35\\text{ dB/km}',
      color: '#94a3b8'
    },
    {
      id: 'cladding',
      name: '4. Revestimiento Óptico (Optical Cladding)',
      category: 'Confinamiento Dieléctrico por Reflexión Interna Total',
      material: 'Vidrio de dióxido de silicio ultra puro (SiO₂) sin dopar',
      thickness: 'Diámetro concéntrico exacto: 125.0 ± 0.7 µm',
      norm: 'ITU-T G.652.D / Telcordia GR-20',
      description: 'Posee un índice de refracción (n₂ = 1.45) menor que el del núcleo (n₁ = 1.48). Esta discontinuidad óptica confina el 100% de la energía electromagnética de la luz dentro del núcleo.',
      softwareImpact: 'Garantiza que la señal viaje miles de kilómetros sin fuga de fotones, permitiendo replicación asíncrona entre regiones de AWS/GCP con latencias predecibles.',
      physicsFormula: 'n_2 = 1.45 \\quad | \\quad \\theta_c = \\arcsin\\left(\\frac{n_2}{n_1}\\right) \\approx 78.5^\\circ',
      color: '#cbd5e1'
    },
    {
      id: 'core',
      name: '5. Núcleo Óptico Monomodo (Silica Glass Core)',
      category: 'Canal de Transmisión de Luz Láser Infrarroja',
      material: 'Sílice pura dopada con dióxido de germanio (GeO₂) para elevar n₁',
      thickness: 'Diámetro ultra estrecho: 8.2 µm a 9.0 µm',
      norm: 'ITU-T G.652.D / G.657 (Bending Insensitive)',
      description: 'Debido a su diámetro microscópico (~9µm), la luz solo puede viajar en una única línea axial directa (modo fundamental LP₀₁), eliminando por completo la dispersión modal.',
      softwareImpact: 'Al no existir dispersión modal, permite velocidades de 400 Gbps a 800 Gbps por longitud de onda (DWDM) con latencias mínimas físicas (v ≈ 204,000 km/s, ~4.9 µs/km).',
      physicsFormula: 'V = \\frac{2\\pi a}{\\lambda}\\sqrt{n_1^2 - n_2^2} < 2.405 \\quad (\\text{Corte Monomodo})',
      color: '#0284c7'
    }
  ],
  mmf: [
    {
      id: 'jacket',
      name: '1. Cubierta Exterior (Outer Jacket)',
      category: 'Protección Mecánica y Retardante de Llama',
      material: 'Polímero LSZH ignífugo color Aqua (OM3/OM4) o Violeta Erika',
      thickness: 'Diámetro exterior: 2.0 mm - 3.0 mm (Espesor pared: 0.50 mm)',
      norm: 'ANSI/TIA-598-D (Color Aqua para OM3/OM4, Lima para OM5)',
      description: 'Identifica visualmente el enlace como fibra multimodo optimizada para láser VCSEL de 850 nm en centros de datos. Material autoextinguible sin halógenos.',
      softwareImpact: 'Evita conectar por error un patch cord multimodo en un puerto monomodo (LR), lo que provocaría atenuaciones extremas de inserción y caídas inmediatas de enlaces 10G/40G.',
      physicsFormula: 'Radio mín. curvatura \\ge 25\\text{ mm} \\quad | \\quad \\text{Ignífugo IEC 60332-1}',
      color: '#06b6d4'
    },
    {
      id: 'kevlar',
      name: '2. Miembros de Tracción (Aramid / Kevlar®)',
      category: 'Alivio de Tensión y Resistencia Mecánica',
      material: 'Hiladuras de poliaramida de alta tenacidad',
      thickness: 'Mechas perimétricas distribuidas (espesor ~0.35 mm)',
      norm: 'Telcordia GR-409-CORE',
      description: 'Soporta las tensiones mecánicas generadas al tender los latiguillos en bandejas de alta densidad dentro de racks de Datacenters.',
      softwareImpact: 'Permite peinar y manipular miles de cables en switches Spine-Leaf sin riesgo de rotura de hilos durante mantenimientos programados.',
      physicsFormula: 'T_{máx} > 600\\text{ N} \\quad | \\quad \\text{Elongación} < 1.5\\%',
      color: '#0891b2'
    },
    {
      id: 'buffer',
      name: '3. Recubrimiento Búfer (Tight Buffer)',
      category: 'Amortiguación Mecánica de 900µm',
      material: 'Acrilato curado por UV primario + búfer secundario termoplástico',
      thickness: 'Diámetro total: 900 µm (cubriendo los 125 µm del cladding)',
      norm: 'IEC 60793-2-10',
      description: 'Amortigua vibraciones causadas por los ventiladores de servidores y flujo de aire forzado en pasillos fríos/calientes de centros de datos.',
      softwareImpact: 'Previene fluctuaciones de señal que causarían jitter en enlaces de almacenamiento SAN Fibre Channel.',
      physicsFormula: '\\text{Aislamiento mecánico} \\quad | \\quad T_{operación}: -20^\\circ\\text{C a } +70^\\circ\\text{C}',
      color: '#94a3b8'
    },
    {
      id: 'cladding',
      name: '4. Revestimiento Óptico (Optical Cladding)',
      category: 'Confinamiento Dieléctrico por Reflexión Interna Total',
      material: 'Vidrio de dióxido de silicio puro (SiO₂)',
      thickness: 'Diámetro concéntrico exacto: 125.0 ± 1.0 µm',
      norm: 'ITU-T G.651.1 / ISO/IEC 11801 OM4',
      description: 'Mantiene el índice de refracción n₂ = 1.45. Junto con el perfil de índice gradual del núcleo, curva suavemente los rayos de luz hacia el centro.',
      softwareImpact: 'Un cladding de alta calidad reduce la atenuación a 850 nm (~2.5 dB/km), posibilitando enlaces de 100GBASE-SR4 en arquitecturas cloud.',
      physicsFormula: 'n_2 = 1.45 \\quad | \\quad NA = \\sqrt{n_1^2 - n_2^2} \\approx 0.200 \\pm 0.015',
      color: '#cbd5e1'
    },
    {
      id: 'core',
      name: '5. Núcleo Óptico Multimodo (Graded-Index Core)',
      category: 'Canal Multimodo de 50µm con Índice Gradual',
      material: 'Sílice con perfil de índice parabólico dopado con GeO₂',
      thickness: 'Diámetro amplio: 50.0 ± 2.0 µm (5 veces mayor que SMF)',
      norm: 'ISO/IEC 11801 Categoría OM4 / TIA-492AAAD',
      description: 'Su núcleo ancho facilita el acoplamiento de luz con transmisores VCSEL económicos a 850 nm. El perfil de índice gradual acelera los rayos exteriores para mitigar el desfase modal.',
      softwareImpact: 'La dispersión modal diferencial limita la distancia a ~400m a 10 Gbps y ~100m a 100 Gbps. Superar esta distancia destruye las tramas Ethernet (CRC errors).',
      physicsFormula: 'EMB \\ge 4700\\text{ MHz}\\cdot\\text{km (a 850 nm)} \\quad | \\quad d_{máx} \\approx 400\\text{ m}',
      color: '#06b6d4'
    }
  ]
};

export const Fiber3DTransversal = () => {
  const [fiberKind, setFiberKind] = useState<FiberKind>('smf');
  const [viewMode, setViewMode] = useState<'3d-exploded' | 'concentric'>('3d-exploded');
  const [hoveredLayer, setHoveredLayer] = useState<string | null>('core');
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    jacket: true,
    kevlar: true,
    buffer: true,
    cladding: true,
    core: true
  });

  const layers = FIBER_LAYERS[fiberKind];
  const currentSpec = layers.find(l => l.id === (hoveredLayer || 'core')) || layers[layers.length - 1];

  const toggleLayer = (id: string) => {
    setActiveLayers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Visual Canvas & Layer Controls (7 cols) */}
      <Card className="lg:col-span-7 p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md flex flex-col justify-between rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/90 pb-4 mb-6 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
              <Zap size={22} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight">
                Anatomía Física de la Fibra Óptica
              </h3>
              <span className="text-xs sm:text-sm font-mono text-slate-500 font-semibold">
                Estructura Microscópica y Guía de Onda Dieléctrica
              </span>
            </div>
          </div>

          {/* Mode Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            {/* SMF vs MMF Selector */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setFiberKind('smf')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border",
                  fiberKind === 'smf'
                    ? "bg-amber-100 border-amber-600 text-amber-950 font-black shadow-sm ring-2 ring-amber-400/40"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                )}
              >
                Monomodo (OS2)
              </button>
              <button
                onClick={() => setFiberKind('mmf')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border",
                  fiberKind === 'mmf'
                    ? "bg-cyan-100 border-cyan-600 text-cyan-950 font-black shadow-sm ring-2 ring-cyan-400/40"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                )}
              >
                Multimodo (OM4)
              </button>
            </div>

            {/* 3D vs 2D Toggle */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('3d-exploded')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border",
                  viewMode === '3d-exploded'
                    ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-sm ring-2 ring-sky-400/40"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                )}
              >
                <Box size={14} className={viewMode === '3d-exploded' ? "text-sky-700" : "text-slate-600"} />
                Vista 3D
              </button>
              <button
                onClick={() => setViewMode('concentric')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border",
                  viewMode === 'concentric'
                    ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-sm ring-2 ring-sky-400/40"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                )}
              >
                <Layers size={14} className={viewMode === 'concentric' ? "text-sky-700" : "text-slate-600"} />
                Corte 2D
              </button>
            </div>
          </div>
        </div>

        {/* View Canvas Container */}
        <div className="relative h-84 sm:h-96 flex items-center justify-center my-auto bg-slate-50 rounded-2xl border border-slate-200/90 p-4 sm:p-6 overflow-hidden shadow-inner">
          {viewMode === 'concentric' ? (
            /* ============================================================ */
            /* 2D CONCENTRIC CROSS-SECTION VIEW                            */
            /* ============================================================ */
            <svg className="w-full h-full max-w-[480px] max-h-[340px]" viewBox="0 0 380 340">
              {/* Concentric Guide Grid Circles */}
              <circle cx="190" cy="170" r="145" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="190" cy="170" r="105" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="190" cy="170" r="65" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />

              {/* LAYER 1: Outer Jacket (2.8 mm) */}
              {activeLayers.jacket && (
                <motion.g
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onMouseEnter={() => setHoveredLayer('jacket')}
                  className="cursor-pointer"
                >
                  <circle
                    cx="190"
                    cy="170"
                    r="140"
                    fill={fiberKind === 'smf' ? "#fef08a" : "#a5f3fc"}
                    stroke={fiberKind === 'smf' ? "#ca8a04" : "#0891b2"}
                    strokeWidth="4"
                    className="transition-all hover:brightness-95"
                  />
                  {/* Outer Jacket silkscreen tick text */}
                  <text x="190" y="44" fill={fiberKind === 'smf' ? "#854d0e" : "#0e7490"} fontSize="11" fontFamily="monospace" fontWeight="900" textAnchor="middle">
                    {fiberKind === 'smf' ? 'CUBIERTA LSZH AMARILLA (SMF OS2 - 2.8 mm)' : 'CUBIERTA LSZH AQUA (MMF OM4 - 2.8 mm)'}
                  </text>
                </motion.g>
              )}

              {/* LAYER 2: Kevlar Strength Filaments ring */}
              {activeLayers.kevlar && (
                <motion.g
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onMouseEnter={() => setHoveredLayer('kevlar')}
                  className="cursor-pointer"
                >
                  <circle
                    cx="190"
                    cy="170"
                    r="115"
                    fill="#fef9c3"
                    stroke="#eab308"
                    strokeWidth="3"
                    strokeDasharray="6 3"
                    className="transition-all hover:brightness-95"
                  />
                  {/* Kevlar braided pattern filaments */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    const kx = 190 + Math.cos(rad) * 115;
                    const ky = 170 + Math.sin(rad) * 115;
                    return <circle key={deg} cx={kx} cy={ky} r="3" fill="#ca8a04" opacity="0.7" />;
                  })}
                  <text x="190" y="72" fill="#a16207" fontSize="10" fontFamily="monospace" fontWeight="800" textAnchor="middle">
                    HILADURAS DE KEVLAR® (Aramida &gt; 1000 N)
                  </text>
                </motion.g>
              )}

              {/* LAYER 3: Buffer Coating (900 µm) */}
              {activeLayers.buffer && (
                <motion.g
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onMouseEnter={() => setHoveredLayer('buffer')}
                  className="cursor-pointer"
                >
                  <circle
                    cx="190"
                    cy="170"
                    r="85"
                    fill="#f8fafc"
                    stroke="#94a3b8"
                    strokeWidth="3"
                    className="transition-all hover:brightness-95"
                  />
                  <text x="190" y="100" fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="800" textAnchor="middle">
                    BÚFER ACRILATO (900 µm)
                  </text>
                </motion.g>
              )}

              {/* LAYER 4: Optical Cladding (125 µm) */}
              {activeLayers.cladding && (
                <motion.g
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onMouseEnter={() => setHoveredLayer('cladding')}
                  className="cursor-pointer"
                >
                  <circle
                    cx="190"
                    cy="170"
                    r="55"
                    fill="#e2e8f0"
                    stroke="#64748b"
                    strokeWidth="2.5"
                    className="transition-all hover:brightness-95"
                  />
                  <text x="190" y="132" fill="#334155" fontSize="9" fontFamily="monospace" fontWeight="900" textAnchor="middle">
                    CLADDING (125 µm, n₂=1.45)
                  </text>
                </motion.g>
              )}

              {/* LAYER 5: Silica Core (9 µm in SMF, 50 µm in MMF) */}
              {activeLayers.core && (
                <motion.g
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onMouseEnter={() => setHoveredLayer('core')}
                  className="cursor-pointer"
                >
                  <circle
                    cx="190"
                    cy="170"
                    r={fiberKind === 'smf' ? 14 : 32}
                    fill={fiberKind === 'smf' ? "#0284c7" : "#06b6d4"}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="drop-shadow-[0_0_12px_rgba(2,132,199,0.9)] animate-pulse"
                  />
                  <text
                    x="190"
                    y={fiberKind === 'smf' ? 174 : 173}
                    fill="#ffffff"
                    fontSize={fiberKind === 'smf' ? "8" : "10"}
                    fontFamily="monospace"
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    {fiberKind === 'smf' ? '9µm' : '50µm'}
                  </text>
                  <text x="190" y="215" fill={fiberKind === 'smf' ? "#0369a1" : "#0e7490"} fontSize="9" fontFamily="monospace" fontWeight="900" textAnchor="middle">
                    {fiberKind === 'smf' ? 'NÚCLEO SMF (n₁=1.48)' : 'NÚCLEO MMF OM4 (n₁=1.48)'}
                  </text>
                </motion.g>
              )}

              {/* Dimension Callout Scale Arrow */}
              <line x1="20" y1="310" x2="160" y2="310" stroke="#64748b" strokeWidth="1.5" />
              <text x="20" y="326" fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="bold">
                Escala Relativa Concéntrica (ISO/IEC 11801)
              </text>
            </svg>
          ) : (
            /* ============================================================ */
            /* 3D LONGITUDINAL STEPPED CUTAWAY VIEW                         */
            /* ============================================================ */
            <svg className="w-full h-full max-w-[620px] max-h-[340px]" viewBox="0 0 620 280">
              <defs>
                {/* 3D Shading Gradients */}
                <linearGradient id="jacketGradSMF" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="30%" stopColor="#eab308" />
                  <stop offset="85%" stopColor="#ca8a04" />
                  <stop offset="100%" stopColor="#a16207" />
                </linearGradient>

                <linearGradient id="jacketGradMMF" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#cffafe" />
                  <stop offset="30%" stopColor="#22d3ee" />
                  <stop offset="85%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#155e75" />
                </linearGradient>

                <linearGradient id="bufferGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#f1f5f9" />
                  <stop offset="85%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>

                <linearGradient id="claddingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="35%" stopColor="#e2e8f0" />
                  <stop offset="70%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>

                <linearGradient id="coreGradSMF" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>

                <linearGradient id="coreGradMMF" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>

              {/* LAYER 1: OUTER JACKET (Step 1: X = 30 to 180) */}
              {activeLayers.jacket && (
                <motion.g
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onMouseEnter={() => setHoveredLayer('jacket')}
                  className="cursor-pointer"
                >
                  {/* Cylinder Body */}
                  <path
                    d="M 30 50 L 180 50 A 15 70 0 0 1 180 190 L 30 190 A 15 70 0 0 1 30 50"
                    fill={fiberKind === 'smf' ? "url(#jacketGradSMF)" : "url(#jacketGradMMF)"}
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />
                  {/* Cylinder Left Cap */}
                  <ellipse cx="30" cy="120" rx="15" ry="70" fill={fiberKind === 'smf' ? "#ca8a04" : "#0e7490"} stroke="#475569" strokeWidth="1.5" />
                  {/* Cylinder Right Cut Lip */}
                  <path d="M 180 50 A 15 70 0 0 1 180 190" fill="none" stroke={fiberKind === 'smf' ? "#fef08a" : "#a5f3fc"} strokeWidth="2.5" />

                  {/* Silkscreen text on outer jacket */}
                  <text x="105" y="116" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="900" textAnchor="middle" transform="rotate(-1 105 116)">
                    {fiberKind === 'smf' ? 'CORNING SMF-28e+ OS2 9/125' : 'OM4 LASER-OPT 50/125 100G'}
                  </text>
                  <text x="105" y="130" fill={fiberKind === 'smf' ? "#854d0e" : "#164e63"} fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    LSZH TIA-598 3.0mm
                  </text>

                  <text x="105" y="36" fill={fiberKind === 'smf' ? "#a16207" : "#0891b2"} fontSize="11" fontFamily="monospace" fontWeight="900" textAnchor="middle">
                    1. CUBIERTA EXTERIOR
                  </text>
                </motion.g>
              )}

              {/* LAYER 2: KEVLAR ARAMID YARN (Step 2: Protruding from X = 180 to 260) */}
              {activeLayers.kevlar && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onMouseEnter={() => setHoveredLayer('kevlar')}
                  className="cursor-pointer"
                >
                  {/* Splayed Kevlar filaments protruding between jacket and buffer */}
                  {[
                    "M 180 56 Q 220 48, 255 42",
                    "M 180 68 Q 230 62, 260 58",
                    "M 180 82 Q 225 78, 258 75",
                    "M 180 158 Q 225 162, 258 165",
                    "M 180 172 Q 230 178, 260 182",
                    "M 180 184 Q 220 192, 255 198"
                  ].map((d, i) => (
                    <motion.path
                      key={i}
                      d={d}
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      animate={{ strokeDashoffset: [0, 4] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  ))}
                  <text x="220" y="32" fill="#ca8a04" fontSize="10" fontFamily="monospace" fontWeight="900" textAnchor="middle">
                    2. HILOS KEVLAR®
                  </text>
                </motion.g>
              )}

              {/* LAYER 3: TIGHT BUFFER COATING (Step 3: X = 180 to 330) */}
              {activeLayers.buffer && (
                <motion.g
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onMouseEnter={() => setHoveredLayer('buffer')}
                  className="cursor-pointer"
                >
                  <path
                    d="M 180 75 L 330 75 A 12 45 0 0 1 330 165 L 180 165 A 12 45 0 0 1 180 75"
                    fill="url(#bufferGrad)"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                  />
                  <path d="M 330 75 A 12 45 0 0 1 330 165" fill="none" stroke="#ffffff" strokeWidth="2" />
                  <text x="255" y="112" fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="800" textAnchor="middle">
                    BÚFER 900µm
                  </text>
                  <text x="255" y="126" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    Acrilato Curado UV
                  </text>

                  <text x="255" y="66" fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="900" textAnchor="middle">
                    3. BÚFER
                  </text>
                </motion.g>
              )}

              {/* LAYER 4: OPTICAL CLADDING (Step 4: X = 330 to 460) */}
              {activeLayers.cladding && (
                <motion.g
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onMouseEnter={() => setHoveredLayer('cladding')}
                  className="cursor-pointer"
                >
                  <path
                    d="M 330 92 L 460 92 A 8 28 0 0 1 460 148 L 330 148 A 8 28 0 0 1 330 92"
                    fill="url(#claddingGrad)"
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />
                  <path d="M 460 92 A 8 28 0 0 1 460 148" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                  <text x="395" y="123" fill="#1e293b" fontSize="9" fontFamily="monospace" fontWeight="900" textAnchor="middle">
                    CLADDING 125µm
                  </text>

                  <text x="395" y="80" fill="#334155" fontSize="10" fontFamily="monospace" fontWeight="900" textAnchor="middle">
                    4. REVESTIMIENTO
                  </text>
                </motion.g>
              )}

              {/* LAYER 5: SILICA GLASS CORE (Step 5: X = 460 to 590) */}
              {activeLayers.core && (
                <motion.g
                  initial={{ opacity: 0, scaleY: 0.5 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  onMouseEnter={() => setHoveredLayer('core')}
                  className="cursor-pointer"
                >
                  {/* Core Cylinder Body */}
                  <path
                    d={
                      fiberKind === 'smf'
                        ? "M 460 114 L 590 114 A 5 6 0 0 1 590 126 L 460 126 A 5 6 0 0 1 460 114"
                        : "M 460 106 L 590 106 A 6 14 0 0 1 590 134 L 460 134 A 6 14 0 0 1 460 106"
                    }
                    fill={fiberKind === 'smf' ? "url(#coreGradSMF)" : "url(#coreGradMMF)"}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="drop-shadow-[0_0_15px_rgba(2,132,199,0.9)]"
                  />

                  {/* Core Front Face Circle with Laser Emission Ring */}
                  <ellipse
                    cx="590"
                    cy="120"
                    rx={fiberKind === 'smf' ? 5 : 7}
                    ry={fiberKind === 'smf' ? 6 : 14}
                    fill="#ffffff"
                    stroke={fiberKind === 'smf' ? "#0284c7" : "#06b6d4"}
                    strokeWidth="2"
                    className="animate-pulse"
                  />

                  {/* Laser Beam Emission cone coming out of the tip */}
                  <path
                    d={
                      fiberKind === 'smf'
                        ? "M 590 115 L 618 108 L 618 132 L 590 125 Z"
                        : "M 590 108 L 618 95 L 618 145 L 590 132 Z"
                    }
                    fill={fiberKind === 'smf' ? "#0284c7" : "#06b6d4"}
                    fillOpacity="0.35"
                  />

                  {/* Laser Pulses traveling through the core */}
                  <motion.circle
                    r="4"
                    fill="#ffffff"
                    stroke={fiberKind === 'smf' ? "#0284c7" : "#06b6d4"}
                    strokeWidth="2"
                    animate={{
                      cx: [460, 590, 615],
                      cy: [120, 120, 120],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.1,
                      ease: "linear"
                    }}
                  />

                  {/* Ray Trajectory Inside the Core: Straight for SMF vs Zigzag for MMF */}
                  {fiberKind === 'mmf' && (
                    <motion.path
                      d="M 465 120 L 495 110 L 525 130 L 555 110 L 585 130"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      animate={{ strokeDashoffset: [0, -20] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    />
                  )}

                  <text x="535" y="98" fill={fiberKind === 'smf' ? "#0284c7" : "#0891b2"} fontSize="11" fontFamily="monospace" fontWeight="900" textAnchor="middle">
                    5. NÚCLEO {fiberKind === 'smf' ? '9 µm' : '50 µm'}
                  </text>
                  <text x="535" y="148" fill="#0369a1" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    {fiberKind === 'smf' ? 'Modo Axial Puro (LP₀₁)' : 'Múltiples Modos VCSEL'}
                  </text>
                </motion.g>
              )}
            </svg>
          )}
        </div>

        {/* Interactive Layer Filter Bar */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-extrabold block mb-2.5">
            Alternar / Aislar Capas Microscópicas:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {layers.map((layer) => {
              const isLayerActive = activeLayers[layer.id];
              const isHovered = hoveredLayer === layer.id;

              return (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  onMouseEnter={() => setHoveredLayer(layer.id)}
                  className={cn(
                    "p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1 shadow-xs",
                    isHovered
                      ? "ring-2 ring-sky-400/40 border-sky-500 bg-sky-50 shadow-sm"
                      : "border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300",
                    !isLayerActive && "opacity-40 grayscale"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black truncate text-slate-800">
                      {layer.id.toUpperCase()}
                    </span>
                    {isLayerActive ? (
                      <Eye size={14} className="text-sky-600 flex-shrink-0" />
                    ) : (
                      <EyeOff size={14} className="text-slate-400 flex-shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold truncate">
                    {layer.name.split('(')[0].replace(/^\d+\.\s*/, '')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Right Column: Physical & Engineering HUD Panel (5 cols) */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        <Card glowColor="cyan" className="p-6 sm:p-7 bg-white border border-slate-200/90 shadow-md flex-1 flex flex-col justify-between rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSpec.id}-${fiberKind}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              {/* Header Badge & Name */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-sky-800 uppercase tracking-wider font-extrabold bg-sky-50 px-3 py-0.5 rounded-full border border-sky-200">
                    {currentSpec.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {currentSpec.norm.split('/')[0]}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900">
                  {currentSpec.name}
                </h4>
              </div>

              {/* Material & Dimension Specs */}
              <div className="grid grid-cols-1 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs font-mono">
                <div>
                  <span className="text-slate-500 font-bold block">Material y Composición:</span>
                  <span className="text-slate-900 font-black text-xs sm:text-sm">{currentSpec.material}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block">Espesor / Diámetro Concéntrico:</span>
                  <span className="text-sky-800 font-black text-xs sm:text-sm">{currentSpec.thickness}</span>
                </div>
              </div>

              {/* Physical Function Description */}
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {currentSpec.description}
              </p>

              {/* Physics Formula Callout */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-mono text-xs font-bold shadow-xs">
                <span className="text-amber-800 font-black uppercase text-[10px] block mb-1">
                  Ecuación Física / Restricción de Diseño:
                </span>
                <span className="text-xs font-black">{currentSpec.physicsFormula}</span>
              </div>

              {/* Software Engineering Impact */}
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs font-mono text-purple-950 shadow-xs">
                <div className="flex items-center gap-1.5 font-black text-purple-900 mb-1 text-xs sm:text-sm">
                  <Sparkles size={16} className="text-purple-600" />
                  <span>Impacto en Software y Sistemas Distribuidos:</span>
                </div>
                <p className="leading-relaxed font-medium">
                  {currentSpec.softwareImpact}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Optical Transmission Windows Telemetry Matrix */}
          <div className="pt-4 border-t-2 border-slate-100 mt-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-black block mb-2">
              Ventanas Ópticas de Transmisión ({fiberKind === 'smf' ? 'Monomodo' : 'Multimodo'}):
            </span>
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">1ª Ventana</span>
                <span className="text-xs font-black text-cyan-800">850 nm</span>
                <span className="text-[9px] text-slate-500 block font-bold">~2.5 dB/km</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">2ª Ventana</span>
                <span className="text-xs font-black text-sky-800">1310 nm</span>
                <span className="text-[9px] text-slate-500 block font-bold">~0.35 dB/km</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">3ª Ventana</span>
                <span className="text-xs font-black text-purple-800">1550 nm</span>
                <span className="text-[9px] text-slate-500 block font-bold">~0.20 dB/km</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
