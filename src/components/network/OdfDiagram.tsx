import { useState } from 'react';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Zap, ArrowRight, Server, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { cn } from '../layout/Layout';

type OdfComponentId = 'backbone' | 'tray' | 'pigtails' | 'adapters' | 'patchcords' | 'switch';

interface ComponentSpec {
  id: OdfComponentId;
  name: string;
  category: string;
  norm: string;
  loss: string;
  specs: string;
  description: string;
  action: string;
  softwareRelevance: string;
  color: string;
}

const ODF_COMPONENTS: Record<OdfComponentId, ComponentSpec> = {
  backbone: {
    id: 'backbone',
    name: 'Cable Troncal Exterior (Backbone)',
    category: 'Planta Externa / Campus',
    norm: 'ITU-T G.652.D / Telcordia GR-20',
    loss: '0.18 - 0.22 dB/km a 1550nm',
    specs: '24 a 144 hilos Monomodo OS2 (9/125µm), blindaje de acero corrugado (PSP) y gel hidrófugo.',
    description: 'Tendido físico de alta capacidad que ingresa desde la vía pública o cámaras subterráneas hasta el datacenter a través del pasamuros posterior del chasis.',
    action: 'Llega intacto al ODF donde se decapada la cubierta exterior y se separa cada tubo holgado hacia las bandejas.',
    softwareRelevance: 'Transporta múltiples longitudes de onda (DWDM 100G/400G). Si se corta, se pierde el enlace WAN primario del clúster.',
    color: 'purple'
  },
  tray: {
    id: 'tray',
    name: 'Bandejas de Fusión Deslizables (Splice Trays)',
    category: 'Gestión Interna Mecánica',
    norm: 'Telcordia GR-769 / ANSI/TIA-568.3-D',
    loss: '< 0.02 dB por empalme térmico',
    specs: 'Capacidad para 12 a 24 fusiones con peines para manguitos termocontraíbles con alma de acero inoxidable.',
    description: 'Charolas deslizables con bisagras que albergan la holgura de fibra sobrante respetando estrictamente el radio de curvatura (> 30 mm) para evitar pérdidas por microflexión.',
    action: 'Permite abrir y extraer una bandeja para dar mantenimiento a un hilo individual sin interrumpir los enlaces de las bandejas vecinas.',
    softwareRelevance: 'Aislamiento mecánico total: las vibraciones en el rack o el movimiento de servidores no desalinean los núcleos de vidrio.',
    color: 'sky'
  },
  pigtails: {
    id: 'pigtails',
    name: 'Pigtails Ópticos con Código TIA-598',
    category: 'Terminación Conectorizada',
    norm: 'Código de Colores ANSI/TIA-598-C',
    loss: 'IL < 0.15 dB • Retorno RL > 55 dB (UPC) / > 65 dB (APC)',
    specs: 'Tramos de 1 a 1.5 metros con férula de circonio (ZrO2) de alta precisión pulida en fábrica.',
    description: 'Hilos individuales con conector de fábrica en un extremo y fibra desnuda en el otro, organizados según el código cromático estandarizado (Azul, Naranja, Verde, Marrón, Pizarra, Blanco...).',
    action: 'El extremo libre se fusiona por arco voltaico al hilo troncal; el extremo conectorizado se encaja por detrás del panel frontal.',
    softwareRelevance: 'La pureza de la férula de circonio evita la dispersión y reflexión de fotones que causaría jitter a velocidades de 100 Gbps.',
    color: 'blue'
  },
  adapters: {
    id: 'adapters',
    name: 'Panel Frontal de Acopladores LC Dúplex',
    category: 'Matriz de Interconexión',
    norm: 'IEC 61754-20 / TIA-604-10 (FOCIS-10)',
    loss: '< 0.10 dB por acoplamiento • 1,000 ciclos',
    specs: '24 puertos LC dúplex en 1U (48 hilos de fibra en 44.45 mm de altura estándar).',
    description: 'Placa frontal metálica serigrafiada con acopladores pasantes que alinean los núcleos de 9µm del pigtail interno con el patch cord externo.',
    action: 'Punto de demarcación física que divide la infraestructura permanente del cableado flexible de servicio.',
    softwareRelevance: 'Permite reconfigurar rutas troncales y reasignar puertos de switch en caliente en segundos sin soldar ni apagar clústeres.',
    color: 'cyan'
  },
  patchcords: {
    id: 'patchcords',
    name: 'Patch Cords de Servicio (Jumpers Flexibles)',
    category: 'Distribución Flexible en Rack',
    norm: 'ANSI/TIA-568.3-D / ISO/IEC 11801',
    loss: '< 0.25 dB por enlace de parcheo',
    specs: 'Cables LC-LC dúplex zipcord de 2mm con chaqueta retardante de llama LSZH (baja emisión de humos).',
    description: 'Cables móviles de 1 a 5 metros que interconectan la toma frontal del ODF con las bocas de transceptores en los switches de red.',
    action: 'Diseñados con fibras insensibles a curvatura (G.657.A1) para soportar dobleces ajustados dentro de los organizadores de cables.',
    softwareRelevance: 'Elemento consumible económico ($8) que absorbe el desgaste mecánico de reconexión, protegiendo las tarjetas caras del servidor.',
    color: 'amber'
  },
  switch: {
    id: 'switch',
    name: 'Switch de Core con Transceptores SFP+ / QSFP28',
    category: 'Equipo Activo (Capa 2 / 3)',
    norm: 'IEEE 802.3ae (10G) / IEEE 802.3bm (100G) / SFF-8472',
    loss: 'Sensibilidad Rx: -14.4 dBm (10GBASE-LR) a 1310nm',
    specs: 'Puertos de alta densidad 10G/25G/40G/100G con telemetría DDM (Digital Diagnostic Monitoring).',
    description: 'Equipo de conmutación de paquetes por hardware que recibe los fotones transmitidos a través del ODF y los transforma en tramas Ethernet binarias.',
    action: 'Monitorea en tiempo real la potencia óptica recibida (Rx Power en dBm) mediante APIs SNMP o Prometheus.',
    softwareRelevance: 'Si la potencia cae por debajo del umbral de sensibilidad por suciedad en el ODF, la interfaz experimenta microcortes y TCP retransmite.',
    color: 'emerald'
  }
};

// TIA-598 12 standard fiber colors
const FIBER_COLORS = [
  { name: 'Azul', hex: '#2563eb' },
  { name: 'Naranja', hex: '#ea580c' },
  { name: 'Verde', hex: '#16a34a' },
  { name: 'Marrón', hex: '#854d0e' },
  { name: 'Pizarra', hex: '#64748b' },
  { name: 'Blanco', hex: '#cbd5e1' },
  { name: 'Rojo', hex: '#dc2626' },
  { name: 'Negro', hex: '#334155' },
  { name: 'Amarillo', hex: '#eab308' },
  { name: 'Violeta', hex: '#9333ea' },
  { name: 'Rosa', hex: '#ec4899' },
  { name: 'Aqua', hex: '#06b6d4' }
];

export const OdfDiagram = () => {
  const [selectedElement, setSelectedElement] = useState<OdfComponentId>('adapters');
  const activeSpec = ODF_COMPONENTS[selectedElement];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Visual Rack ODF Canvas (7 cols) */}
        <Card className="lg:col-span-7 p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-3xl flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200 shadow-xs">
                <Layers size={24} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight">
                  Chasis ODF Rack 19" 1U
                </h3>
                <p className="text-xs sm:text-sm font-mono text-slate-500 font-semibold">
                  Normas EIA/ECA-310-E & ANSI/TIA-568.3-D
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-sky-800 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200 self-start sm:self-auto shadow-xs">
              Haz clic para inspeccionar
            </span>
          </div>

          {/* REALISTIC 19" 1U RACK CHASSIS GRAPHIC (Fills top completely) */}
          <div className="relative bg-slate-50 rounded-2xl border-2 border-slate-200 p-5 flex flex-col gap-5 overflow-hidden shadow-xs">
            {/* Top 1U Chassis Representation with Ears and Mounting Screws */}
            <div className="relative bg-slate-200/90 rounded-xl p-3 border-2 border-slate-300 shadow-md">
              {/* Rack unit label */}
              <div className="flex justify-between items-center text-[11px] font-mono font-black text-slate-700 mb-2 px-1">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  GABINETE 19 PULGADAS — UNIDAD 1U (44.45 mm)
                </span>
                <span className="text-slate-500 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                  ODF-24-LC/UPC
                </span>
              </div>

              {/* 1U Metal Chassis Panel Faceplate (Cisco Light Platinum / Brushed Steel) */}
              <div className="relative h-24 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-lg border-2 border-slate-400 flex items-center justify-between px-3 sm:px-6 shadow-sm overflow-hidden">
                {/* Left Rack Ear Bracket with 1U screw holes */}
                <div className="w-6 h-full flex flex-col justify-around py-1 border-r border-slate-300 pr-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-300 border border-slate-400 shadow-inner flex items-center justify-center">
                    <div className="w-2 h-0.5 bg-slate-500"></div>
                  </div>
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-300 border border-slate-400 shadow-inner flex items-center justify-center">
                    <div className="w-2 h-0.5 bg-slate-500"></div>
                  </div>
                </div>

                {/* Chassis Serigraph Label & Status LEDs */}
                <div className="hidden md:flex flex-col gap-1 pr-2 border-r border-slate-300 text-left">
                  <span className="text-[10px] font-mono font-black text-slate-800 tracking-wider">ODF-24P</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Alimentación OK"></span>
                    <span className="w-2 h-2 rounded-full bg-sky-500" title="Sync Láser"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-400" title="Estado"></span>
                  </div>
                </div>

                {/* 12 Duplex LC Port Couplers (24 fibers) in Standard Singlemode Blue */}
                <div className="flex-1 flex justify-around items-center px-2 sm:px-4">
                  {[...Array(12)].map((_, idx) => {
                    const isPortActive = selectedElement === 'adapters' || selectedElement === 'patchcords' || selectedElement === 'pigtails';
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedElement('adapters')}
                        className={cn(
                          "w-4 sm:w-5 h-14 rounded bg-sky-600 border-2 flex flex-col items-center justify-around py-1 transition-all duration-200 hover:scale-110 shadow-xs",
                          isPortActive
                            ? "border-sky-400 bg-sky-500 ring-2 ring-sky-300 shadow-[0_0_12px_rgba(2,132,199,0.6)]"
                            : "border-sky-700 opacity-90"
                        )}
                        title={`Puerto LC Dúplex ${idx * 2 + 1}-${idx * 2 + 2}`}
                      >
                        {/* LC Duplex Ferrule Holes with Optical Light Emitting */}
                        <div className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          isPortActive ? "bg-white shadow-[0_0_6px_#38bdf8] ring-1 ring-cyan-200" : "bg-sky-900"
                        )} />
                        <div className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          isPortActive ? "bg-white shadow-[0_0_6px_#38bdf8] ring-1 ring-cyan-200" : "bg-sky-900"
                        )} />
                      </button>
                    );
                  })}
                </div>

                {/* Right Rack Ear Bracket */}
                <div className="w-6 h-full flex flex-col justify-around py-1 border-l border-slate-300 pl-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-300 border border-slate-400 shadow-inner flex items-center justify-center">
                    <div className="w-2 h-0.5 bg-slate-500"></div>
                  </div>
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-300 border border-slate-400 shadow-inner flex items-center justify-center">
                    <div className="w-2 h-0.5 bg-slate-500"></div>
                  </div>
                </div>

                {/* Laser Light Flow Animated Beam across chassis */}
                <motion.div
                  animate={{ left: ['-10%', '110%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent pointer-events-none"
                />
              </div>

              {/* TIA-598 Color Ribbon Indicator for Splice Tray */}
              <div className="mt-2.5 flex items-center justify-between gap-1 px-1">
                <span className="text-[10px] font-mono font-bold text-slate-600 hidden sm:inline">
                  Código TIA-598:
                </span>
                <div className="flex-1 flex gap-1 justify-around">
                  {FIBER_COLORS.map((fc, i) => (
                    <div
                      key={i}
                      className="h-2 flex-1 rounded-sm shadow-xs"
                      style={{ backgroundColor: fc.hex }}
                      title={`Hilo ${i + 1}: ${fc.name}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* INTERACTIVE COMPONENT SELECTOR BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* 1. Backbone */}
              <button
                onClick={() => setSelectedElement('backbone')}
                className={cn(
                  "p-3 rounded-2xl border-2 text-left font-mono transition-all duration-200 shadow-xs",
                  selectedElement === 'backbone'
                    ? "bg-purple-100 border-purple-600 text-purple-950 shadow-md ring-2 ring-purple-400/40"
                    : "bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap size={15} className="text-purple-600" />
                  <span className="text-xs font-black uppercase">1. Troncal</span>
                </div>
                <div className={cn("text-[11px] truncate font-bold", selectedElement === 'backbone' ? "text-purple-800" : "text-slate-500")}>
                  Cable exterior SMF
                </div>
              </button>

              {/* 2. Splice Trays */}
              <button
                onClick={() => setSelectedElement('tray')}
                className={cn(
                  "p-3 rounded-2xl border-2 text-left font-mono transition-all duration-200 shadow-xs",
                  selectedElement === 'tray'
                    ? "bg-sky-100 border-sky-600 text-sky-950 shadow-md ring-2 ring-sky-400/40"
                    : "bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Layers size={15} className="text-sky-600" />
                  <span className="text-xs font-black uppercase">2. Bandejas</span>
                </div>
                <div className={cn("text-[11px] truncate font-bold", selectedElement === 'tray' ? "text-sky-800" : "text-slate-500")}>
                  Fusiones protegidas
                </div>
              </button>

              {/* 3. Pigtails */}
              <button
                onClick={() => setSelectedElement('pigtails')}
                className={cn(
                  "p-3 rounded-2xl border-2 text-left font-mono transition-all duration-200 shadow-xs",
                  selectedElement === 'pigtails'
                    ? "bg-blue-100 border-blue-600 text-blue-950 shadow-md ring-2 ring-blue-400/40"
                    : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Activity size={15} className="text-blue-600" />
                  <span className="text-xs font-black uppercase">3. Pigtails</span>
                </div>
                <div className={cn("text-[11px] truncate font-bold", selectedElement === 'pigtails' ? "text-blue-800" : "text-slate-500")}>
                  Código TIA-598
                </div>
              </button>

              {/* 4. Adapters */}
              <button
                onClick={() => setSelectedElement('adapters')}
                className={cn(
                  "p-3 rounded-2xl border-2 text-left font-mono transition-all duration-200 shadow-xs",
                  selectedElement === 'adapters'
                    ? "bg-cyan-100 border-cyan-600 text-cyan-950 shadow-md ring-2 ring-cyan-400/40"
                    : "bg-white border-slate-200 text-slate-700 hover:border-cyan-300 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <ShieldCheck size={15} className="text-cyan-600" />
                  <span className="text-xs font-black uppercase">4. Frontal LC</span>
                </div>
                <div className={cn("text-[11px] truncate font-bold", selectedElement === 'adapters' ? "text-cyan-800" : "text-slate-500")}>
                  Acopladores dúplex
                </div>
              </button>

              {/* 5. Patch Cords */}
              <button
                onClick={() => setSelectedElement('patchcords')}
                className={cn(
                  "p-3 rounded-2xl border-2 text-left font-mono transition-all duration-200 shadow-xs",
                  selectedElement === 'patchcords'
                    ? "bg-amber-100 border-amber-600 text-amber-950 shadow-md ring-2 ring-amber-400/40"
                    : "bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap size={15} className="text-amber-600" />
                  <span className="text-xs font-black uppercase">5. Patch Cords</span>
                </div>
                <div className={cn("text-[11px] truncate font-bold", selectedElement === 'patchcords' ? "text-amber-800" : "text-slate-500")}>
                  Jumpers flexibles
                </div>
              </button>

              {/* 6. Switch */}
              <button
                onClick={() => setSelectedElement('switch')}
                className={cn(
                  "p-3 rounded-2xl border-2 text-left font-mono transition-all duration-200 shadow-xs",
                  selectedElement === 'switch'
                    ? "bg-emerald-100 border-emerald-600 text-emerald-950 shadow-md ring-2 ring-emerald-400/40"
                    : "bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Server size={15} className="text-emerald-600" />
                  <span className="text-xs font-black uppercase">6. Switch Core</span>
                </div>
                <div className={cn("text-[11px] truncate font-bold", selectedElement === 'switch' ? "text-emerald-800" : "text-slate-500")}>
                  Telemetría DDM SFP+
                </div>
              </button>
            </div>
          </div>
        </Card>

        {/* Dynamic Technical Specifications Panel (5 cols) */}
        <Card className="lg:col-span-5 p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-3xl flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Badge and Header */}
              <div className="border-b-2 border-slate-100 pb-3">
                <div className="flex justify-between items-center gap-2 mb-1">
                  <span className="text-xs font-mono uppercase tracking-wider font-black text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                    {activeSpec.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {activeSpec.norm}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-1">
                  {activeSpec.name}
                </h3>
              </div>

              {/* Optical Metrics & Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-mono text-slate-500 uppercase font-bold block mb-0.5">
                    Pérdida Típica / Parámetro:
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-sky-800 font-extrabold block">
                    {activeSpec.loss}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-mono text-slate-500 uppercase font-bold block mb-0.5">
                    Especificación Física:
                  </span>
                  <span className="text-xs font-mono text-slate-800 font-bold block">
                    {activeSpec.specs}
                  </span>
                </div>
              </div>

              {/* Operational Action */}
              <div>
                <h5 className="text-xs font-mono uppercase text-slate-500 font-black mb-1">
                  Rol y Mantenimiento Operativo:
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-medium">
                  {activeSpec.action}
                </p>
              </div>

              {/* Software Engineering Impact */}
              <div>
                <h5 className="text-xs font-mono uppercase text-emerald-700 font-black mb-1 flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  Impacto en Desarrollo & DevOps:
                </h5>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 font-mono font-semibold">
                  {activeSpec.softwareRelevance}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 pt-3 border-t-2 border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Operación en Caliente: <strong className="text-slate-800">Zero-Downtime</strong></span>
            <span className="text-sky-700 font-bold flex items-center gap-1">
              Pérdida total de enlace &lt; 0.5 dB
              <ArrowRight size={14} />
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};
