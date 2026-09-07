import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Cpu, Server, Cable, Zap, Radio, Activity } from 'lucide-react';
import { cn } from '../layout/Layout';

export const NetworkTransmissionHero = () => {
  const [activeMedium, setActiveMedium] = useState<'copper' | 'fiber' | 'radio'>('fiber');
  const isTransmitting = true;

  const mediaConfig = {
    copper: {
      name: 'Cobre (Par Trenzado UTP/STP / Coaxial)',
      signal: 'Señal Eléctrica Diferencial (Voltaje)',
      color: '#ea580c',
      speed: '~200,000 km/s (67% c)',
      desc: 'Transporta electrones mediante voltajes diferenciales en pares trenzados (ej. 1000BASE-T). Susceptible a ruido electromagnético (EMI/RFI) y diafonía (crosstalk).'
    },
    fiber: {
      name: 'Fibra Óptica (Núcleo de Sílice SiO₂)',
      signal: 'Pulsos de Luz Láser / Infrarrojo (Fotones)',
      color: '#0284c7',
      speed: '~204,000 km/s (68% c)',
      desc: 'Transporta fotones guiados por Reflexión Interna Total en hilos de vidrio ultrapuro. Totalmente inmune a interferencias electromagnéticas con ancho de banda de terabits.'
    },
    radio: {
      name: 'Radiofrecuencia (Espectro Electromagnético)',
      signal: 'Ondas Electromagnéticas en el Aire (Hz)',
      color: '#7c3aed',
      speed: '~300,000 km/s (100% c)',
      desc: 'Transporta radiación electromagnética en medio no guiado compartido (half-duplex). Sujeto a atenuación por obstáculos, interferencias y desvanecimiento multitrayecto.'
    }
  };

  return (
    <Card className="flex flex-col gap-8 p-8 lg:p-10 bg-white border border-slate-200/90 shadow-md relative overflow-hidden rounded-3xl">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-200/90 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider mb-2">
            <Activity size={15} className="animate-pulse text-sky-600" />
            <span>Simulador Interactivo Cisco Packet Tracer</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            Recorrido del Paquete: De la Aplicación al Medio Físico
          </h3>
        </div>

        {/* Medium Selector */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-inner">
          <button
            onClick={() => setActiveMedium('copper')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center gap-2 shadow-sm border",
              activeMedium === 'copper'
                ? "bg-amber-100 border-amber-600 text-amber-950 font-black shadow-md ring-2 ring-amber-400/40"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60"
            )}
          >
            <Cable size={18} className={activeMedium === 'copper' ? "text-amber-700" : "text-slate-600"} />
            Cobre (UTP)
          </button>
          <button
            onClick={() => setActiveMedium('fiber')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center gap-2 shadow-sm border",
              activeMedium === 'fiber'
                ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-md ring-2 ring-sky-400/40"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60"
            )}
          >
            <Zap size={18} className={activeMedium === 'fiber' ? "text-sky-700" : "text-slate-600"} />
            Fibra Óptica
          </button>
          <button
            onClick={() => setActiveMedium('radio')}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center gap-2 shadow-sm border",
              activeMedium === 'radio'
                ? "bg-purple-100 border-purple-600 text-purple-950 font-black shadow-md ring-2 ring-purple-400/40"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60"
            )}
          >
            <Radio size={18} className={activeMedium === 'radio' ? "text-purple-700" : "text-slate-600"} />
            Radio (Wi-Fi)
          </button>
        </div>
      </div>

      {/* Architecture Flow: Vertical Stack to Channel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Software to Hardware Decoupling Stack (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono text-slate-700 font-extrabold uppercase tracking-wide">Pila de Encapsulación OSI</span>
            <span className="text-xs font-mono text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full font-bold">Host TX</span>
          </div>

          {[
            { label: 'Capa 7: Aplicación (HTTP/3 JSON)', sub: 'fetch("/api/data") • Payload de Usuario', color: 'border-purple-300 bg-purple-50/80 text-purple-950', badge: 'L7' },
            { label: 'Capa 4: Transporte (TCP Segment)', sub: 'Puerto Src: 54321, Dst: 443 • Secuencia', color: 'border-sky-300 bg-sky-50/80 text-sky-950', badge: 'L4' },
            { label: 'Capa 3: Red (Paquete IP)', sub: 'IP 192.168.1.50 → 10.0.0.1 • TTL 64', color: 'border-blue-300 bg-blue-50/80 text-blue-950', badge: 'L3' },
            { label: 'Capa 2: Enlace (Trama Ethernet)', sub: 'MAC Destino + Preámbulo + FCS/CRC', color: 'border-emerald-300 bg-emerald-50/80 text-emerald-950', badge: 'L2' },
            { label: 'Capa 1: Capa Física (Transceptor PHY)', sub: 'Modulación de bits (0s y 1s) en señal física', color: 'border-amber-400 bg-amber-50 text-amber-950 ring-2 ring-amber-400/30 font-black', badge: 'L1' }
          ].map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "p-3.5 rounded-2xl border text-sm font-mono flex items-center justify-between transition-all shadow-sm hover:shadow-md",
                item.color
              )}
            >
              <div>
                <div className="font-bold text-sm lg:text-base">{item.label}</div>
                <div className="text-xs lg:text-sm text-slate-600 font-sans mt-0.5">{item.sub}</div>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-lg bg-white/80 border border-slate-300/80 shadow-xs">{item.badge}</span>
            </div>
          ))}
        </div>

        {/* Right: Cisco Packet Tracer 3D Transmission Canvas (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <div className="relative h-80 bg-slate-50 rounded-3xl border-2 border-slate-200 p-6 flex flex-col justify-between overflow-hidden shadow-xs perspective-1000">
            {/* Tech grid & ambient light */}
            <div className="absolute inset-0 tech-grid opacity-30"></div>
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Cisco Topology Nodes Header */}
            <div className="relative z-10 flex justify-between items-center text-xs sm:text-sm font-mono">
              {/* Host A (Workstation) */}
              <div className="flex items-center gap-3 bg-white border-2 border-sky-200 px-4 py-2.5 rounded-2xl shadow-sm">
                <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
                  <Cpu size={22} />
                </div>
                <div>
                  <div className="text-slate-900 font-black text-sm sm:text-base">PC-Client-01</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Eth0 (1Gbps) • UP</span>
                  </div>
                </div>
              </div>

              {/* Central Channel Badge */}
              <div className="text-center font-mono px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hidden sm:block shadow-xs">
                <span className="text-xs text-slate-500 block font-bold">MEDIO TRANSMISIÓN</span>
                <span className="font-black text-sm text-sky-700">{mediaConfig[activeMedium].name}</span>
              </div>

              {/* Host B (Switch / Server) */}
              <div className="flex items-center gap-3 bg-white border-2 border-emerald-200 px-4 py-2.5 rounded-2xl shadow-sm">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <Server size={22} />
                </div>
                <div>
                  <div className="text-slate-900 font-black text-sm sm:text-base">Server-App-DC</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Gi0/1 • RX Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cisco Transmission Tracks (Cables with 3D Envelope Packets) */}
            <div className="relative z-10 my-auto py-4 space-y-4">
              {/* Active High-Contrast Waveguide / Medium Channel */}
              <div className={cn(
                "relative h-14 rounded-2xl transition-all duration-300 flex items-center px-5 border shadow-xs bg-white",
                activeMedium === 'copper' 
                  ? "border-amber-400 shadow-amber-500/10" 
                  : activeMedium === 'fiber'
                    ? "border-sky-400 shadow-sky-500/10"
                    : "border-purple-400 shadow-purple-500/10"
              )}>
                {/* Channel Label */}
                <div className="flex items-center gap-2 mr-4 flex-shrink-0">
                  <span className={cn(
                    "text-xs font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border",
                    activeMedium === 'copper' ? "bg-amber-50 text-amber-800 border-amber-300"
                    : activeMedium === 'fiber' ? "bg-sky-50 text-sky-800 border-sky-300"
                    : "bg-purple-50 text-purple-800 border-purple-300"
                  )}>
                    {activeMedium === 'copper' ? 'COBRE (e⁻)' : activeMedium === 'fiber' ? 'FIBRA (Fotones)' : 'RADIO (RF)'}
                  </span>
                </div>

                {/* Cable physical core */}
                <div className="flex-1 h-3.5 bg-slate-200 rounded-full relative overflow-hidden border border-slate-300">
                  {/* Packet animation */}
                  {isTransmitting && (
                    <motion.div
                      animate={{ left: ['-15%', '105%'] }}
                      transition={{ 
                        duration: activeMedium === 'copper' ? 2.0 : activeMedium === 'fiber' ? 1.3 : 1.0, 
                        repeat: Infinity, 
                        ease: 'linear' 
                      }}
                      className={cn(
                        "absolute top-0 bottom-0 w-36 rounded-full flex items-center justify-center shadow-md",
                        activeMedium === 'copper' ? "bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-amber-500"
                        : activeMedium === 'fiber' ? "bg-gradient-to-r from-transparent via-sky-500 to-transparent shadow-sky-500"
                        : "bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-purple-500"
                      )}
                    >
                      {/* Cisco Envelope PDU Tag */}
                      <span className="text-[9px] font-mono font-black bg-slate-900 text-white px-1.5 py-0.5 rounded shadow-md uppercase">
                        PDU
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer metrics */}
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm font-mono pt-3 border-t border-slate-200 text-slate-700 gap-2 font-bold">
              <div>Modulación: <span className="text-sky-700 font-black">{mediaConfig[activeMedium].signal}</span></div>
              <div>Velocidad de Propagación: <span className="text-emerald-700 font-black">{mediaConfig[activeMedium].speed}</span></div>
            </div>
          </div>

          {/* Descriptive callout card */}
          <div className="text-sm lg:text-base text-slate-700 leading-relaxed bg-sky-50/80 p-5 rounded-2xl border border-sky-200 shadow-sm">
            <strong className="text-sky-900 font-extrabold block text-base lg:text-lg mb-1">
              Comportamiento Físico del Canal:
            </strong>
            {mediaConfig[activeMedium].desc}
          </div>
        </div>
      </div>
    </Card>
  );
};
