import { useState } from 'react';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Layers, Cpu, Sparkles, Eye, EyeOff } from 'lucide-react';
import { cn } from '../layout/Layout';

export type ShieldingType = 'u-utp' | 'f-utp' | 's-ftp';

interface LayerSpec {
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

const UTP_LAYERS: LayerSpec[] = [
  {
    id: 'jacket',
    name: '1. Cubierta Exterior (Outer Jacket)',
    category: 'Protección Mecánica y Retardante de Llama',
    material: 'PVC (CM/CMR) o Polímero Libre de Halógenos (LSZH / CMP Plenum)',
    thickness: '0.60 mm - 0.85 mm (Diámetro total: 5.8 - 7.5 mm)',
    norm: 'UL 1666 (Riser) / NFPA 262 (Plenum) / IEC 60332-1',
    description: 'Aisla los componentes internos de humedad, rayos UV y tracción física durante el tendido por ductos. La formulación LSZH no emite gases tóxicos clorados en caso de incendio.',
    softwareImpact: 'Una cubierta agrietada permite el ingreso de humedad que aumenta la constante dieléctrica y atenúa la señal, provocando pérdida masiva de tramas y timeouts en sockets TCP.',
    physicsFormula: 'R_{tracción} > 400\\text{ N} \\quad | \\quad \\text{Radio mín. curvatura} \\ge 4 \\times \\varnothing',
    color: '#334155'
  },
  {
    id: 'shield',
    name: '2. Blindaje Electromagnético (Shielding)',
    category: 'Inmunidad a Ruido EMI y Alien Crosstalk (ANEXT)',
    material: 'Lámina Al-Mylar (100% cob.) + Malla de Cobre Estañado (85% cob.)',
    thickness: 'Lámina: 0.05 mm | Malla: hilos de 0.12 mm',
    norm: 'ISO/IEC 11801 / TIA-568.2-D (F/UTP & S/FTP)',
    description: 'Crea una jaula de Faraday continua que drena corrientes inducidas por motores, balastros fluorescentes y cables de alta tensión hacia el hilo de tierra (Drain Wire).',
    softwareImpact: 'En centros de datos con servidores de alta densidad, elimina el Alien Crosstalk (diafonía foránea entre cables en paralelo), evitando degradación de velocidad de 10 Gbps a 1 Gbps.',
    physicsFormula: 'SE = 20 \\log_{10} \\left| \\frac{E_{incidente}}{E_{transmitido}} \\right| \\ge 75\\text{ dB a 500 MHz}',
    color: '#94a3b8'
  },
  {
    id: 'spline',
    name: '3. Cruceta Central / Separador (Cross-Web Spline)',
    category: 'Mitigación de Diafonía Interna (NEXT)',
    material: 'Polietileno de Alta Densidad (HDPE) extruido en cruz (+)',
    thickness: 'Grosor de aleta: 0.45 mm',
    norm: 'ANSI/TIA-568-C.2 Categoría 6 / 6A',
    description: 'Separa físicamente los 4 pares en 4 cuadrantes independientes a lo largo de los 100 metros del enlace, manteniendo una separación geométrica fija y reduciendo la capacitancia parásita.',
    softwareImpact: 'Mantiene el NEXT (Near-End Crosstalk) por debajo de los umbrales ANSI/TIA, permitiendo que la tarjeta de red opere a 1 Gbps o 10 Gbps sin forzar renegociación de enlace PHY a 100 Mbps.',
    physicsFormula: 'NEXT = 20 \\log_{10} \\left( \\frac{V_{emisor}}{V_{inducido}} \\right) \\propto \\frac{1}{d_{separación}^2}',
    color: '#cbd5e1'
  },
  {
    id: 'pairs',
    name: '4. Cuatro Pares Trenzados (Twisted Pairs)',
    category: 'Cancelación por Señalización Diferencial',
    material: 'Cobre electrolítico con aislamiento de polietileno codificado',
    thickness: '4 pares (Azul, Naranja, Verde, Marrón) con diferente paso de trenzado',
    norm: 'TIA/EIA-568-B y ANSI/TIA-568.2-D',
    description: 'El núcleo de la tecnología UTP. Cada par tiene un número distinto de vueltas por metro (pitch de 1.2 a 2.1 cm) para que ningún par acople armónicos con su vecino contiguo.',
    softwareImpact: 'La señalización diferencial cancela el ruido electromagnético externo en el receptor físico (CMRR > 60 dB), garantizando tasa de error de bit (BER) inferior a 10⁻¹².',
    physicsFormula: 'V_{rx} = (V^+ + V_{ruido}) - (V^- + V_{ruido}) = V^+ - V^- = 2V_{datos}',
    color: '#ea580c'
  },
  {
    id: 'core',
    name: '5. Conductor Sólido de Cobre Puro (Bare Copper)',
    category: 'Medio Conductor de Señal Eléctrica y PoE',
    material: '100% Cobre Puro Electrolítico Recocido (BC - Bare Copper)',
    thickness: 'Calibre 23 AWG (0.57 mm) para Cat6/6A o 24 AWG (0.51 mm) para Cat5e',
    norm: 'ASTM B3 / IEEE 802.3bt (PoE++ Tipo 4 hasta 90W)',
    description: 'Conductor metálico homogéneo de baja resistencia. Jamás debe utilizarse cable CCA (Copper Clad Aluminum / Aluminio con baño de cobre), pues tiene alta resistencia y provoca recalentamiento peligroso en PoE.',
    softwareImpact: 'Una resistencia de bucle balanceada (< 9.38 Ω/100m) asegura suministro estable para puntos de acceso Wi-Fi 7 y cámaras IP PoE sin reinicios imprevistos de los microservicios IoT.',
    physicsFormula: 'R = \\rho \\frac{L}{A} \\quad | \\quad \\rho_{Cu} = 1.68 \\times 10^{-8} \\ \\Omega\\cdot\\text{m}',
    color: '#d97706'
  }
];

export const UtpStpTransversal = () => {
  const [shielding, setShielding] = useState<ShieldingType>('u-utp');
  const [viewMode, setViewMode] = useState<'3d-exploded' | 'concentric'>('3d-exploded');
  const [hoveredLayer, setHoveredLayer] = useState<string>('pairs');
  const [hoveredPair, setHoveredPair] = useState<number | null>(null);

  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    jacket: true,
    shield: true,
    spline: true,
    pairs: true,
    core: true
  });

  const toggleLayer = (id: string) => {
    setActiveLayers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentSpec = UTP_LAYERS.find(l => l.id === hoveredLayer) || UTP_LAYERS[3];

  const pairsInfo = [
    { num: 1, name: 'Par 1: Azul / Blanco-Azul', color: '#2563eb', pins: 'Pines 4 y 5', turns: '1.4 cm/vuelta', app: 'Voz / Gigabit Ethernet (BI_DC)' },
    { num: 2, name: 'Par 2: Naranja / Blanco-Naranja', color: '#ea580c', pins: 'Pines 1 y 2 (T568B)', turns: '1.2 cm/vuelta', app: 'Datos TX / 100BASE-TX' },
    { num: 3, name: 'Par 3: Verde / Blanco-Verde', color: '#16a34a', pins: 'Pines 3 y 6 (T568B)', turns: '1.8 cm/vuelta', app: 'Datos RX / 100BASE-TX' },
    { num: 4, name: 'Par 4: Marrón / Blanco-Marrón', color: '#854d0e', pins: 'Pines 7 y 8', turns: '2.1 cm/vuelta', app: 'Alimentación PoE / Gigabit (BI_DD)' }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* SECTION TOP CONTROLS: SHIELDING SELECTOR + VIEW MODE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-100 p-2.5 rounded-2xl border-2 border-slate-200 shadow-xs">
        {/* Shielding Type Selector (U/UTP, F/UTP, S/FTP) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-mono font-black text-slate-600 uppercase px-2">
            Tipo de Cable:
          </span>
          {[
            { id: 'u-utp', label: 'U/UTP', desc: 'Sin Blindaje (Cat 6)', badge: 'Estándar Oficina' },
            { id: 'f-utp', label: 'F/UTP', desc: 'Lámina Global (Foiled)', badge: 'Anti-EMI' },
            { id: 's-ftp', label: 'S/FTP', desc: 'Malla + Lámina por Par', badge: 'Datacenter 10G' }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setShielding(s.id as ShieldingType)}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all border-2 flex items-center gap-2",
                shielding === s.id
                  ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-md ring-2 ring-sky-400/40"
                  : "bg-white border-slate-200 text-slate-700 hover:border-sky-300 font-bold"
              )}
            >
              <span>{s.label}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 hidden sm:inline">
                {s.badge}
              </span>
            </button>
          ))}
        </div>

        {/* View Mode Toggle: 3D Exploded vs 2D Cross Section */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 self-start md:self-auto shadow-xs">
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
            <span>Vista 3D Longitudinal</span>
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
            <span>Corte 2D Transversal</span>
          </button>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE: VISUAL CANVAS (7 cols) + TECHNICAL SPEC (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT COLUMN: INTERACTIVE CANVAS (7 cols) */}
        <Card className="lg:col-span-7 p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-3xl flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-100 pb-4 mb-4 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-sky-700 font-black uppercase tracking-wider bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200">
                  {shielding === 'u-utp' ? 'ISO/IEC 11801 • U/UTP' : shielding === 'f-utp' ? 'TIA-568.2-D • F/UTP' : 'Cat 6A / Cat 7 • S/FTP'}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500 hidden sm:inline">
                  {shielding === 'u-utp' ? 'Sin Blindaje' : shielding === 'f-utp' ? 'Lámina Al-Mylar' : 'Doble Blindaje Malla+Foil'}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-1">
                {viewMode === '3d-exploded'
                  ? 'Disección Longitudinal en Perspectiva 3D'
                  : 'Corte Transversal de Cuadrantes y Cruceta'}
              </h4>
            </div>

            <span className="text-xs font-mono text-slate-600 font-bold bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
              100 Ω ± 15%
            </span>
          </div>

          {/* CANVAS AREA */}
          <div className="relative h-80 sm:h-96 flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 overflow-hidden shadow-inner my-auto">
            {/* ------------------------------------------------------------- */}
            {/* VIEW MODE 1: 2D CONCENTRIC & 4-QUADRANT SPLINE CROSS SECTION  */}
            {/* ------------------------------------------------------------- */}
            {viewMode === 'concentric' ? (
              <svg className="w-72 h-72 sm:w-80 sm:h-80 overflow-visible" viewBox="0 0 320 320">
                <defs>
                  {/* Striped patterns for bicolor wires */}
                  <pattern id="utp-stripe-orange" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="3" height="6" fill="#ffffff" />
                    <rect x="3" width="3" height="6" fill="#ea580c" />
                  </pattern>
                  <pattern id="utp-stripe-green" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="3" height="6" fill="#ffffff" />
                    <rect x="3" width="3" height="6" fill="#16a34a" />
                  </pattern>
                  <pattern id="utp-stripe-blue" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="3" height="6" fill="#ffffff" />
                    <rect x="3" width="3" height="6" fill="#2563eb" />
                  </pattern>
                  <pattern id="utp-stripe-brown" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="3" height="6" fill="#ffffff" />
                    <rect x="3" width="3" height="6" fill="#854d0e" />
                  </pattern>

                  {/* Shield metallic gradients */}
                  <linearGradient id="foilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="50%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                </defs>

                {/* Outer Guidelines */}
                <line x1="0" y1="160" x2="320" y2="160" stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="160" y1="0" x2="160" y2="320" stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="1" />

                {/* LAYER 1: OUTER JACKET (Cubierta PVC/LSZH) */}
                {activeLayers.jacket && (
                  <motion.circle
                    cx="160"
                    cy="160"
                    r="145"
                    fill="#334155"
                    stroke={hoveredLayer === 'jacket' ? '#38bdf8' : '#1e293b'}
                    strokeWidth={hoveredLayer === 'jacket' ? 4 : 2}
                    className="cursor-pointer transition-colors"
                    onMouseEnter={() => setHoveredLayer('jacket')}
                  />
                )}

                {/* LAYER 2: SHIELDING (Conditional on UTP / F-UTP / S-FTP) */}
                {activeLayers.shield && shielding !== 'u-utp' && (
                  <motion.circle
                    cx="160"
                    cy="160"
                    r="132"
                    fill={shielding === 's-ftp' ? '#64748b' : 'url(#foilGrad)'}
                    stroke={hoveredLayer === 'shield' ? '#38bdf8' : '#94a3b8'}
                    strokeWidth={hoveredLayer === 'shield' ? 4 : 2}
                    strokeDasharray={shielding === 's-ftp' ? '5 2' : undefined}
                    className="cursor-pointer transition-colors"
                    onMouseEnter={() => setHoveredLayer('shield')}
                  />
                )}

                {/* Tinned Copper Drain Wire (Hilo de Drenaje en F-UTP) */}
                {activeLayers.shield && shielding !== 'u-utp' && (
                  <g className="cursor-pointer" onMouseEnter={() => setHoveredLayer('shield')}>
                    <circle cx="160" cy="34" r="5" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
                    <text x="160" y="24" textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#78350f">
                      Drain Wire
                    </text>
                  </g>
                )}

                {/* Internal Cavity */}
                <circle cx="160" cy="160" r="126" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

                {/* LAYER 3: CRUCETA CENTRAL PLÁSTICA (+) ANTI-NEXT */}
                {activeLayers.spline && (
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredLayer('spline')}
                  >
                    {/* Spline Shape: Cross splitting the 4 quadrants */}
                    <path
                      d="
                        M 152 45 L 168 45 L 168 152 L 275 152 L 275 168 L 168 168 L 168 275 L 152 275 L 152 168 L 45 168 L 45 152 L 152 152 Z
                      "
                      fill={hoveredLayer === 'spline' ? '#bae6fd' : '#e2e8f0'}
                      stroke={hoveredLayer === 'spline' ? '#0284c7' : '#94a3b8'}
                      strokeWidth={hoveredLayer === 'spline' ? 2.5 : 1.5}
                      className="transition-colors"
                    />
                    <circle cx="160" cy="160" r="14" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
                    <text x="160" y="163" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="900" fill="#334155">
                      SPLINE
                    </text>
                  </g>
                )}

                {/* LAYER 4: THE 4 TWISTED PAIRS (In the 4 Quadrants) */}
                {activeLayers.pairs && (
                  <g>
                    {/* Quadrant 1 (Top-Right): Par 1 (Azul / Blanco-Azul) */}
                    <g
                      className="cursor-pointer"
                      onMouseEnter={() => { setHoveredLayer('pairs'); setHoveredPair(1); }}
                      onMouseLeave={() => setHoveredPair(null)}
                    >
                      {/* Individual Foil Shield in S/FTP */}
                      {shielding === 's-ftp' && (
                        <ellipse cx="218" cy="102" rx="34" ry="24" transform="rotate(45 218 102)" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                      )}
                      {/* Conductor 1A: Azul */}
                      <circle cx="206" cy="90" r="15" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
                      {activeLayers.core && <circle cx="206" cy="90" r="6" fill="#d97706" stroke="#78350f" strokeWidth="1" />}
                      {/* Conductor 1B: Blanco-Azul */}
                      <circle cx="230" cy="114" r="15" fill="url(#utp-stripe-blue)" stroke="#2563eb" strokeWidth="1.5" />
                      {activeLayers.core && <circle cx="230" cy="114" r="6" fill="#d97706" stroke="#78350f" strokeWidth="1" />}
                      <text x="238" y="82" fontFamily="monospace" fontSize="9" fontWeight="900" fill="#1d4ed8">P1 (Azul)</text>
                    </g>

                    {/* Quadrant 2 (Top-Left): Par 2 (Naranja / Blanco-Naranja) */}
                    <g
                      className="cursor-pointer"
                      onMouseEnter={() => { setHoveredLayer('pairs'); setHoveredPair(2); }}
                      onMouseLeave={() => setHoveredPair(null)}
                    >
                      {shielding === 's-ftp' && (
                        <ellipse cx="102" cy="102" rx="34" ry="24" transform="rotate(-45 102 102)" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                      )}
                      {/* Conductor 2A: Naranja */}
                      <circle cx="114" cy="90" r="15" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
                      {activeLayers.core && <circle cx="114" cy="90" r="6" fill="#d97706" stroke="#78350f" strokeWidth="1" />}
                      {/* Conductor 2B: Blanco-Naranja */}
                      <circle cx="90" cy="114" r="15" fill="url(#utp-stripe-orange)" stroke="#ea580c" strokeWidth="1.5" />
                      {activeLayers.core && <circle cx="90" cy="114" r="6" fill="#d97706" stroke="#78350f" strokeWidth="1" />}
                      <text x="82" y="82" textAnchor="end" fontFamily="monospace" fontSize="9" fontWeight="900" fill="#c2410c">P2 (Naranja)</text>
                    </g>

                    {/* Quadrant 3 (Bottom-Left): Par 3 (Verde / Blanco-Verde) */}
                    <g
                      className="cursor-pointer"
                      onMouseEnter={() => { setHoveredLayer('pairs'); setHoveredPair(3); }}
                      onMouseLeave={() => setHoveredPair(null)}
                    >
                      {shielding === 's-ftp' && (
                        <ellipse cx="102" cy="218" rx="34" ry="24" transform="rotate(45 102 218)" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                      )}
                      {/* Conductor 3A: Verde */}
                      <circle cx="90" cy="206" r="15" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />
                      {activeLayers.core && <circle cx="90" cy="206" r="6" fill="#d97706" stroke="#78350f" strokeWidth="1" />}
                      {/* Conductor 3B: Blanco-Verde */}
                      <circle cx="114" cy="230" r="15" fill="url(#utp-stripe-green)" stroke="#16a34a" strokeWidth="1.5" />
                      {activeLayers.core && <circle cx="114" cy="230" r="6" fill="#d97706" stroke="#78350f" strokeWidth="1" />}
                      <text x="82" y="248" textAnchor="end" fontFamily="monospace" fontSize="9" fontWeight="900" fill="#15803d">P3 (Verde)</text>
                    </g>

                    {/* Quadrant 4 (Bottom-Right): Par 4 (Marrón / Blanco-Marrón) */}
                    <g
                      className="cursor-pointer"
                      onMouseEnter={() => { setHoveredLayer('pairs'); setHoveredPair(4); }}
                      onMouseLeave={() => setHoveredPair(null)}
                    >
                      {shielding === 's-ftp' && (
                        <ellipse cx="218" cy="218" rx="34" ry="24" transform="rotate(-45 218 218)" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                      )}
                      {/* Conductor 4A: Marrón */}
                      <circle cx="230" cy="206" r="15" fill="#854d0e" stroke="#713f12" strokeWidth="1.5" />
                      {activeLayers.core && <circle cx="230" cy="206" r="6" fill="#d97706" stroke="#78350f" strokeWidth="1" />}
                      {/* Conductor 4B: Blanco-Marrón */}
                      <circle cx="206" cy="230" r="15" fill="url(#utp-stripe-brown)" stroke="#854d0e" strokeWidth="1.5" />
                      {activeLayers.core && <circle cx="206" cy="230" r="6" fill="#d97706" stroke="#78350f" strokeWidth="1" />}
                      <text x="238" y="248" fontFamily="monospace" fontSize="9" fontWeight="900" fill="#713f12">P4 (Marrón)</text>
                    </g>
                  </g>
                )}
              </svg>
            ) : (
              /* ------------------------------------------------------------- */
              /* VIEW MODE 2: 3D EXPLODED / STEPPED STRIPPING PERSPECTIVE     */
              /* ------------------------------------------------------------- */
              <div className="relative w-full h-full flex items-center justify-center">
                <svg className="w-full max-w-xl h-64 sm:h-72 overflow-visible" viewBox="0 0 540 240">
                  <defs>
                    <linearGradient id="utpJacketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#475569" />
                      <stop offset="50%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                    <linearGradient id="utpShieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="50%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                    <linearGradient id="utpSplineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#e2e8f0" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>
                  </defs>

                  {/* STEP 1: OUTER JACKET CYLINDER */}
                  {activeLayers.jacket && (
                    <g
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredLayer('jacket')}
                    >
                      <path d="M 20 60 L 150 60 L 150 180 L 20 180 Z" fill="url(#utpJacketGrad)" stroke="#1e293b" strokeWidth="2" />
                      <ellipse cx="20" cy="120" rx="14" ry="60" fill="#1e293b" />
                      <ellipse
                        cx="150"
                        cy="120"
                        rx="14"
                        ry="60"
                        fill="#334155"
                        stroke={hoveredLayer === 'jacket' ? "#38bdf8" : "#475569"}
                        strokeWidth={hoveredLayer === 'jacket' ? 3 : 1}
                      />
                      {/* Laser Silk Imprint on Jacket */}
                      <text x="85" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontFamily="monospace" fontWeight="bold" transform="rotate(-90 85 115)">
                        CAT.6 {shielding.toUpperCase()} 23AWG LSZH
                      </text>
                      <text x="85" y="45" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="900" fontFamily="monospace">
                        1. Cubierta
                      </text>
                    </g>
                  )}

                  {/* STEP 2: SHIELDING (Foil Al-Mylar or Ripcord) */}
                  {activeLayers.shield && (
                    <g
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredLayer('shield')}
                    >
                      {shielding !== 'u-utp' ? (
                        <>
                          <path d="M 150 75 L 220 75 L 220 165 L 150 165 Z" fill="url(#utpShieldGrad)" stroke="#64748b" strokeWidth="1.5" />
                          <ellipse cx="220" cy="120" rx="10" ry="45" fill="#94a3b8" stroke="#38bdf8" strokeWidth={hoveredLayer === 'shield' ? 3 : 1} />
                          {/* Drain wire folded back */}
                          <path d="M 220 100 Q 180 80, 140 50" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="140" cy="50" r="3" fill="#f59e0b" />
                          <text x="185" y="62" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="900" fontFamily="monospace">
                            2. Blindaje Al
                          </text>
                        </>
                      ) : (
                        /* Rip-cord thread in UTP */
                        <>
                          <path d="M 150 100 Q 180 90, 200 65" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                          <text x="185" y="62" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold" fontFamily="monospace">
                            Hilo Rip-cord
                          </text>
                        </>
                      )}
                    </g>
                  )}

                  {/* STEP 3: CROSS SPLINE EXTENDING FORWARD */}
                  {activeLayers.spline && (
                    <g
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredLayer('spline')}
                    >
                      <path d="M 220 105 L 300 105 L 300 135 L 220 135 Z" fill="url(#utpSplineGrad)" stroke="#94a3b8" strokeWidth="1.5" />
                      {/* Cross arms visible in perspective */}
                      <path d="M 250 85 L 265 85 L 265 155 L 250 155 Z" fill="#cbd5e1" opacity="0.8" />
                      <text x="260" y="75" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="900" fontFamily="monospace">
                        3. Cruceta Spline
                      </text>
                    </g>
                  )}

                  {/* STEP 4: THE 4 FANNING TWISTED PAIRS IN 3D HELICAL PATHS */}
                  {activeLayers.pairs && (
                    <g onMouseEnter={() => setHoveredLayer('pairs')}>
                      {/* Pair 2: Orange (Top Left trajectory) */}
                      <g className="cursor-pointer" onMouseEnter={() => setHoveredPair(2)}>
                        <path d="M 270 110 Q 340 70, 430 60" fill="none" stroke="#ea580c" strokeWidth="5" strokeLinecap="round" />
                        <path d="M 270 115 Q 340 75, 430 65" fill="none" stroke="#ffffff" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round" />
                        {activeLayers.core && <circle cx="435" cy="62" r="3.5" fill="#d97706" stroke="#78350f" />}
                        <text x="445" y="65" fill="#ea580c" fontSize="10" fontWeight="900" fontFamily="monospace">Par 2 (Naranja)</text>
                      </g>

                      {/* Pair 1: Blue (Top Right trajectory) */}
                      <g className="cursor-pointer" onMouseEnter={() => setHoveredPair(1)}>
                        <path d="M 270 115 Q 350 95, 430 95" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
                        <path d="M 270 120 Q 350 100, 430 100" fill="none" stroke="#ffffff" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round" />
                        {activeLayers.core && <circle cx="435" cy="97" r="3.5" fill="#d97706" stroke="#78350f" />}
                        <text x="445" y="100" fill="#2563eb" fontSize="10" fontWeight="900" fontFamily="monospace">Par 1 (Azul)</text>
                      </g>

                      {/* Pair 3: Green (Bottom trajectory) */}
                      <g className="cursor-pointer" onMouseEnter={() => setHoveredPair(3)}>
                        <path d="M 270 125 Q 350 140, 430 140" fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
                        <path d="M 270 130 Q 350 145, 430 145" fill="none" stroke="#ffffff" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round" />
                        {activeLayers.core && <circle cx="435" cy="142" r="3.5" fill="#d97706" stroke="#78350f" />}
                        <text x="445" y="145" fill="#16a34a" fontSize="10" fontWeight="900" fontFamily="monospace">Par 3 (Verde)</text>
                      </g>

                      {/* Pair 4: Brown (Bottom Right trajectory) */}
                      <g className="cursor-pointer" onMouseEnter={() => setHoveredPair(4)}>
                        <path d="M 270 130 Q 340 170, 430 180" fill="none" stroke="#854d0e" strokeWidth="5" strokeLinecap="round" />
                        <path d="M 270 135 Q 340 175, 430 185" fill="none" stroke="#ffffff" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round" />
                        {activeLayers.core && <circle cx="435" cy="182" r="3.5" fill="#d97706" stroke="#78350f" />}
                        <text x="445" y="185" fill="#854d0e" fontSize="10" fontWeight="900" fontFamily="monospace">Par 4 (Marrón)</text>
                      </g>
                    </g>
                  )}

                  {/* 4. Bare Copper Tips Annotation */}
                  {activeLayers.core && (
                    <g onMouseEnter={() => setHoveredLayer('core')}>
                      <text x="460" y="30" fill="#b45309" fontSize="11" fontWeight="900" fontFamily="monospace">
                        4. Cobre Sólido 23 AWG
                      </text>
                      <line x1="450" y1="35" x2="435" y2="55" stroke="#b45309" strokeWidth="1.5" strokeDasharray="2 2" />
                    </g>
                  )}
                </svg>
              </div>
            )}
          </div>

          {/* LAYER TOGGLE BUTTONS (Visibility on/off) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-4 border-t-2 border-slate-100">
            {UTP_LAYERS.map((layer) => {
              const isVisible = activeLayers[layer.id];
              const isSelected = hoveredLayer === layer.id;

              return (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  onMouseEnter={() => setHoveredLayer(layer.id)}
                  className={cn(
                    "p-2.5 rounded-xl border-2 text-xs font-mono flex items-center justify-between transition-all font-bold",
                    isSelected
                      ? "bg-sky-100 border-sky-600 text-sky-950 shadow-md ring-2 ring-sky-400/40"
                      : isVisible
                      ? "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                      : "bg-slate-100/50 border-slate-200 text-slate-400 opacity-50"
                  )}
                >
                  <span className="truncate">{layer.name.split(' ')[1]}</span>
                  {isVisible ? (
                    <Eye size={14} className={isSelected ? "text-sky-700" : "text-slate-500"} />
                  ) : (
                    <EyeOff size={14} className="text-slate-400" />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* RIGHT COLUMN: TECHNICAL SPECIFICATIONS & PHYSICS HUD (5 cols) */}
        <Card className="lg:col-span-5 p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-3xl flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Header */}
              <div className="border-b-2 border-slate-100 pb-3">
                <span className="text-xs font-mono uppercase text-sky-700 font-black tracking-wider block">
                  {currentSpec.category}
                </span>
                <h3 className="text-2xl font-display font-black text-slate-900 mt-1">
                  {currentSpec.name}
                </h3>
                <div className="text-xs font-mono text-slate-600 mt-1">
                  Norma aplicable: <strong className="text-slate-900 font-black">{currentSpec.norm}</strong>
                </div>
              </div>

              {/* Material & Dimension Info */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block uppercase font-bold text-[10px]">Material:</span>
                  <span className="text-slate-900 font-black">{currentSpec.material}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block uppercase font-bold text-[10px]">Dimensiones:</span>
                  <span className="text-slate-900 font-black">{currentSpec.thickness}</span>
                </div>
              </div>

              {/* Physical Description */}
              <div>
                <h5 className="text-xs font-mono uppercase text-slate-500 font-black mb-1.5">
                  Función en la Infraestructura Física
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {currentSpec.description}
                </p>
              </div>

              {/* Differential Signaling / Physics Formula Box */}
              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-sky-900 font-black mb-1">
                  <Sparkles size={14} className="text-sky-700" />
                  <span>Principio Electromagnético:</span>
                </div>
                <div className="text-sky-950 font-black text-sm bg-white p-2 rounded-lg border border-sky-200 shadow-2xs">
                  {currentSpec.physicsFormula}
                </div>
              </div>

              {/* Software Engineering Connection */}
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-300 text-xs font-sans text-emerald-950">
                <div className="flex items-center gap-1.5 font-mono font-black text-emerald-900 mb-1 text-xs">
                  <Cpu size={14} className="text-emerald-700" />
                  <span>Impacto Directo en Ingeniería de Software:</span>
                </div>
                <p className="leading-relaxed font-medium">
                  {currentSpec.softwareImpact}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 4 Pairs Pitch Telemetry Badge Matrix */}
          <div className="pt-4 border-t-2 border-slate-100 mt-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-black block mb-2">
              Paso de Trenzado y Asignación de los 4 Pares:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {pairsInfo.map((p) => (
                <div
                  key={p.num}
                  onMouseEnter={() => { setHoveredLayer('pairs'); setHoveredPair(p.num); }}
                  onMouseLeave={() => setHoveredPair(null)}
                  className={cn(
                    "p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer",
                    hoveredPair === p.num
                      ? "bg-sky-100 border-sky-500 text-sky-950 font-black shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }}></span>
                    <span className="font-bold truncate text-[11px]">{p.name.split(':')[0]}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-0.5 font-bold">
                    <span>{p.pins}</span>
                    <span className="text-sky-700 font-mono font-black">{p.turns}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
