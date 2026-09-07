import { useState } from 'react';
import { Card } from '../ui/Card';
import { cn } from '../layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, CheckCircle2, Shuffle, Sparkles, Zap } from 'lucide-react';

interface PinInfo {
  pin: number;
  colorName: string;
  wireColor: string;
  isStriped: boolean;
  signal: string;
  role: 'tx' | 'rx' | 'bi';
  pair: number;
}

interface WireLink {
  fromPin: number;
  toPin: number;
  colorName: string;
  wireColor: string;
  isStriped: boolean;
  pair: number;
  direction: 'a-to-b' | 'b-to-a' | 'bi';
  desc: string;
}

export const DirectVsCrossover = () => {
  const [cableType, setCableType] = useState<'straight' | 'crossover'>('straight');
  const [hoveredCircuit, setHoveredCircuit] = useState<number | null>(null);

  // --------------------------------------------------------------------------
  // Extremo A Pins Definition
  // Straight = T568B | Crossover = T568A
  // --------------------------------------------------------------------------
  const pinsA_T568B: PinInfo[] = [
    { pin: 1, colorName: 'Blanco / Naranja', wireColor: '#ea580c', isStriped: true, signal: 'TX+ (1)', role: 'tx', pair: 2 },
    { pin: 2, colorName: 'Naranja', wireColor: '#ea580c', isStriped: false, signal: 'TX- (2)', role: 'tx', pair: 2 },
    { pin: 3, colorName: 'Blanco / Verde', wireColor: '#16a34a', isStriped: true, signal: 'RX+ (3)', role: 'rx', pair: 3 },
    { pin: 4, colorName: 'Azul', wireColor: '#2563eb', isStriped: false, signal: 'Par 1 (4)', role: 'bi', pair: 1 },
    { pin: 5, colorName: 'Blanco / Azul', wireColor: '#2563eb', isStriped: true, signal: 'Par 1 (5)', role: 'bi', pair: 1 },
    { pin: 6, colorName: 'Verde', wireColor: '#16a34a', isStriped: false, signal: 'RX- (6)', role: 'rx', pair: 3 },
    { pin: 7, colorName: 'Blanco / Marrón', wireColor: '#854d0e', isStriped: true, signal: 'Par 4 (7)', role: 'bi', pair: 4 },
    { pin: 8, colorName: 'Marrón', wireColor: '#854d0e', isStriped: false, signal: 'Par 4 (8)', role: 'bi', pair: 4 }
  ];

  const pinsA_T568A: PinInfo[] = [
    { pin: 1, colorName: 'Blanco / Verde', wireColor: '#16a34a', isStriped: true, signal: 'TX+ (1)', role: 'tx', pair: 3 },
    { pin: 2, colorName: 'Verde', wireColor: '#16a34a', isStriped: false, signal: 'TX- (2)', role: 'tx', pair: 3 },
    { pin: 3, colorName: 'Blanco / Naranja', wireColor: '#ea580c', isStriped: true, signal: 'RX+ (3)', role: 'rx', pair: 2 },
    { pin: 4, colorName: 'Azul', wireColor: '#2563eb', isStriped: false, signal: 'Par 1 (4)', role: 'bi', pair: 1 },
    { pin: 5, colorName: 'Blanco / Azul', wireColor: '#2563eb', isStriped: true, signal: 'Par 1 (5)', role: 'bi', pair: 1 },
    { pin: 6, colorName: 'Naranja', wireColor: '#ea580c', isStriped: false, signal: 'RX- (6)', role: 'rx', pair: 2 },
    { pin: 7, colorName: 'Blanco / Marrón', wireColor: '#854d0e', isStriped: true, signal: 'Par 4 (7)', role: 'bi', pair: 4 },
    { pin: 8, colorName: 'Marrón', wireColor: '#854d0e', isStriped: false, signal: 'Par 4 (8)', role: 'bi', pair: 4 }
  ];

  // --------------------------------------------------------------------------
  // Extremo B Pins Definition (Always T568B)
  // In Straight: Switch MDI-X acts as receiver on pins 1-2, transmitter on pins 3-6
  // In Crossover: PC 2 MDI acts as transmitter on pins 1-2, receiver on pins 3-6
  // --------------------------------------------------------------------------
  const pinsB: PinInfo[] = [
    {
      pin: 1,
      colorName: 'Blanco / Naranja',
      wireColor: '#ea580c',
      isStriped: true,
      signal: cableType === 'straight' ? 'RX+ (1)' : 'TX+ (1)',
      role: cableType === 'straight' ? 'rx' : 'tx',
      pair: 2
    },
    {
      pin: 2,
      colorName: 'Naranja',
      wireColor: '#ea580c',
      isStriped: false,
      signal: cableType === 'straight' ? 'RX- (2)' : 'TX- (2)',
      role: cableType === 'straight' ? 'rx' : 'tx',
      pair: 2
    },
    {
      pin: 3,
      colorName: 'Blanco / Verde',
      wireColor: '#16a34a',
      isStriped: true,
      signal: cableType === 'straight' ? 'TX+ (3)' : 'RX+ (3)',
      role: cableType === 'straight' ? 'tx' : 'rx',
      pair: 3
    },
    { pin: 4, colorName: 'Azul', wireColor: '#2563eb', isStriped: false, signal: 'Par 1 (4)', role: 'bi', pair: 1 },
    { pin: 5, colorName: 'Blanco / Azul', wireColor: '#2563eb', isStriped: true, signal: 'Par 1 (5)', role: 'bi', pair: 1 },
    {
      pin: 6,
      colorName: 'Verde',
      wireColor: '#16a34a',
      isStriped: false,
      signal: cableType === 'straight' ? 'TX- (6)' : 'RX- (6)',
      role: cableType === 'straight' ? 'tx' : 'rx',
      pair: 3
    },
    { pin: 7, colorName: 'Blanco / Marrón', wireColor: '#854d0e', isStriped: true, signal: 'Par 4 (7)', role: 'bi', pair: 4 },
    { pin: 8, colorName: 'Marrón', wireColor: '#854d0e', isStriped: false, signal: 'Par 4 (8)', role: 'bi', pair: 4 }
  ];

  const currentPinsA = cableType === 'straight' ? pinsA_T568B : pinsA_T568A;

  // --------------------------------------------------------------------------
  // Connecting Wires: Exactly where each physical wire travels
  // --------------------------------------------------------------------------
  const straightLinks: WireLink[] = [
    { fromPin: 1, toPin: 1, colorName: 'Blanco / Naranja', wireColor: '#ea580c', isStriped: true, pair: 2, direction: 'a-to-b', desc: 'Línea TX+ de PC a puerto RX+ del Switch (Par 2)' },
    { fromPin: 2, toPin: 2, colorName: 'Naranja', wireColor: '#ea580c', isStriped: false, pair: 2, direction: 'a-to-b', desc: 'Línea TX- de PC a puerto RX- del Switch (Par 2)' },
    { fromPin: 3, toPin: 3, colorName: 'Blanco / Verde', wireColor: '#16a34a', isStriped: true, pair: 3, direction: 'b-to-a', desc: 'Línea RX+ de PC alimentada por TX+ del Switch (Par 3)' },
    { fromPin: 4, toPin: 4, colorName: 'Azul', wireColor: '#2563eb', isStriped: false, pair: 1, direction: 'bi', desc: 'Conexión 1 a 1 (Par 1: Bidireccional Gigabit / PoE DC+)' },
    { fromPin: 5, toPin: 5, colorName: 'Blanco / Azul', wireColor: '#2563eb', isStriped: true, pair: 1, direction: 'bi', desc: 'Conexión 1 a 1 (Par 1: Bidireccional Gigabit / PoE DC+)' },
    { fromPin: 6, toPin: 6, colorName: 'Verde', wireColor: '#16a34a', isStriped: false, pair: 3, direction: 'b-to-a', desc: 'Línea RX- de PC alimentada por TX- del Switch (Par 3)' },
    { fromPin: 7, toPin: 7, colorName: 'Blanco / Marrón', wireColor: '#854d0e', isStriped: true, pair: 4, direction: 'bi', desc: 'Conexión 1 a 1 (Par 4: Bidireccional Gigabit / PoE DC-)' },
    { fromPin: 8, toPin: 8, colorName: 'Marrón', wireColor: '#854d0e', isStriped: false, pair: 4, direction: 'bi', desc: 'Conexión 1 a 1 (Par 4: Bidireccional Gigabit / PoE DC-)' }
  ];

  const crossoverLinks: WireLink[] = [
    { fromPin: 1, toPin: 3, colorName: 'Blanco / Verde', wireColor: '#16a34a', isStriped: true, pair: 3, direction: 'a-to-b', desc: 'CRUCE ACTIVO: TX+ de PC 1 (Pin 1) viaja hacia RX+ de PC 2 (Pin 3)' },
    { fromPin: 2, toPin: 6, colorName: 'Verde', wireColor: '#16a34a', isStriped: false, pair: 3, direction: 'a-to-b', desc: 'CRUCE ACTIVO: TX- de PC 1 (Pin 2) viaja hacia RX- de PC 2 (Pin 6)' },
    { fromPin: 3, toPin: 1, colorName: 'Blanco / Naranja', wireColor: '#ea580c', isStriped: true, pair: 2, direction: 'b-to-a', desc: 'CRUCE DE RETORNO: TX+ de PC 2 (Pin 1) viaja hacia RX+ de PC 1 (Pin 3)' },
    { fromPin: 4, toPin: 4, colorName: 'Azul', wireColor: '#2563eb', isStriped: false, pair: 1, direction: 'bi', desc: 'Directo: El par Azul (4 y 5) permanece en su posición sin cruzarse' },
    { fromPin: 5, toPin: 5, colorName: 'Blanco / Azul', wireColor: '#2563eb', isStriped: true, pair: 1, direction: 'bi', desc: 'Directo: El par Azul (4 y 5) permanece en su posición sin cruzarse' },
    { fromPin: 6, toPin: 2, colorName: 'Naranja', wireColor: '#ea580c', isStriped: false, pair: 2, direction: 'b-to-a', desc: 'CRUCE DE RETORNO: TX- de PC 2 (Pin 2) viaja hacia RX- de PC 1 (Pin 6)' },
    { fromPin: 7, toPin: 7, colorName: 'Blanco / Marrón', wireColor: '#854d0e', isStriped: true, pair: 4, direction: 'bi', desc: 'Directo: El par Marrón (7 y 8) permanece en su posición sin cruzarse' },
    { fromPin: 8, toPin: 8, colorName: 'Marrón', wireColor: '#854d0e', isStriped: false, pair: 4, direction: 'bi', desc: 'Directo: El par Marrón (7 y 8) permanece en su posición sin cruzarse' }
  ];

  const currentLinks = cableType === 'straight' ? straightLinks : crossoverLinks;

  // Active circuit when a pin or wire is hovered
  const activeLink = hoveredCircuit !== null
    ? currentLinks.find(l => l.fromPin === hoveredCircuit || l.toPin === hoveredCircuit)
    : null;

  // Exact vertical center for pin index 0..7
  const getPinY = (pinIndex: number) => 82 + pinIndex * 54;

  return (
    <div className="flex flex-col gap-8">
      {/* Type Selector (Cisco Light Active State) */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-200 max-w-xl mx-auto w-full shadow-sm">
        <button
          onClick={() => { setCableType('straight'); setHoveredCircuit(null); }}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-mono font-black transition-all text-center border-2 flex items-center justify-center gap-2",
            cableType === 'straight'
              ? "bg-sky-100 border-sky-600 text-sky-950 shadow-md ring-2 ring-sky-400/40"
              : "border-transparent text-slate-600 hover:text-slate-900"
          )}
        >
          <ArrowLeftRight size={16} className={cableType === 'straight' ? "text-sky-700" : "text-slate-500"} />
          <span>CABLE DIRECTO (Straight)</span>
        </button>
        <button
          onClick={() => { setCableType('crossover'); setHoveredCircuit(null); }}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-mono font-black transition-all text-center border-2 flex items-center justify-center gap-2",
            cableType === 'crossover'
              ? "bg-amber-100 border-amber-600 text-amber-950 shadow-md ring-2 ring-amber-400/40"
              : "border-transparent text-slate-600 hover:text-slate-900"
          )}
        >
          <Shuffle size={16} className={cableType === 'crossover' ? "text-amber-700" : "text-slate-500"} />
          <span>CABLE CRUZADO (Crossover)</span>
        </button>
      </div>

      {/* Main Interactive Diagram Card */}
      <Card
        glowColor={cableType === 'straight' ? 'cyan' : 'orange'}
        className="p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-3xl flex flex-col justify-between"
      >
        {/* Top Contextual Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-100 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-sky-700 uppercase font-black tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                {cableType === 'straight' ? 'Extremo A (T568B) ─── Extremo B (T568B)' : 'Extremo A (T568A) ─── Extremo B (T568B)'}
              </span>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">•</span>
              <span className="text-xs font-mono font-bold text-slate-600">
                {cableType === 'straight' ? 'Dispositivos Heterogéneos (MDI ↔ MDI-X)' : 'Dispositivos Homogéneos (MDI ↔ MDI)'}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-2">
              {cableType === 'straight'
                ? 'Cable Directo: PC ↔ Switch / Router ↔ Switch'
                : 'Cable Cruzado: PC ↔ PC / Switch ↔ Switch'}
            </h3>
          </div>

          <div className="text-left sm:text-right text-xs sm:text-sm font-mono bg-slate-50 p-3 px-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider">Topología Típica:</span>
            <span className="text-slate-900 font-black text-sm">
              {cableType === 'straight' ? 'Host a Concentrador de Red' : 'Enlace Punto a Punto entre Hosts'}
            </span>
          </div>
        </div>

        {/* Unified SVG Canvas with Exact Pixel Coordinates */}
        <div className="relative w-full bg-slate-50 rounded-2xl border-2 border-slate-200 p-2 sm:p-4 overflow-x-auto custom-scrollbar shadow-inner">
          <svg
            className="w-full h-auto min-w-[800px] sm:min-w-full"
            viewBox="0 0 960 530"
            style={{ maxHeight: '620px' }}
          >
            <defs>
              {/* Twisted Pair Striped Patterns */}
              <pattern id="stripe-orange" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="4" height="8" fill="#ffffff" />
                <rect x="4" width="4" height="8" fill="#ea580c" />
              </pattern>
              <pattern id="stripe-green" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="4" height="8" fill="#ffffff" />
                <rect x="4" width="4" height="8" fill="#16a34a" />
              </pattern>
              <pattern id="stripe-blue" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="4" height="8" fill="#ffffff" />
                <rect x="4" width="4" height="8" fill="#2563eb" />
              </pattern>
              <pattern id="stripe-brown" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="4" height="8" fill="#ffffff" />
                <rect x="4" width="4" height="8" fill="#854d0e" />
              </pattern>

              {/* Wire Glow Filter */}
              <filter id="wire-glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* ------------------------------------------------------------- */}
            {/* COLUMN HEADERS (Connector Jack Banners)                       */}
            {/* ------------------------------------------------------------- */}
            {/* Left Header: Extremo A */}
            <g transform="translate(16, 12)">
              <rect width="250" height="40" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" shadow-xs="true" />
              <text x="14" y="25" fontFamily="monospace" fontSize="11" fontWeight="900" fill="#0284c7">
                {cableType === 'straight' ? 'EXTREMO A (T568B)' : 'EXTREMO A (T568A)'}
              </text>
              <text x="236" y="25" textAnchor="end" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#64748b">
                Host MDI
              </text>
            </g>

            {/* Middle Badge: Status */}
            <g transform="translate(340, 12)">
              <rect
                width="280"
                height="40"
                rx="12"
                fill={cableType === 'straight' ? "#f0f9ff" : "#fffbeb"}
                stroke={cableType === 'straight' ? "#38bdf8" : "#f59e0b"}
                strokeWidth="1.5"
              />
              <text
                x="140"
                y="25"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fontWeight="900"
                fill={cableType === 'straight' ? "#0369a1" : "#b45309"}
              >
                {cableType === 'straight' ? '⚡ 8 HILOS DIRECTOS (1:1)' : '🔀 CRUCE PARES 2 (NARANJA) ⇄ 3 (VERDE)'}
              </text>
            </g>

            {/* Right Header: Extremo B */}
            <g transform="translate(694, 12)">
              <rect width="250" height="40" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
              <text x="14" y="25" fontFamily="monospace" fontSize="11" fontWeight="900" fill="#0284c7">
                EXTREMO B (T568B)
              </text>
              <text x="236" y="25" textAnchor="end" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#64748b">
                {cableType === 'straight' ? 'Puerto Switch (MDI-X)' : 'Host MDI (PC 2)'}
              </text>
            </g>

            {/* ------------------------------------------------------------- */}
            {/* LAYER 1: CONNECTING WIRES (Underneath the contact pads)       */}
            {/* ------------------------------------------------------------- */}
            {currentLinks.map((link) => {
              const yA = getPinY(link.fromPin - 1);
              const yB = getPinY(link.toPin - 1);
              const isHovered = hoveredCircuit === link.fromPin || hoveredCircuit === link.toPin;
              const isDimmed = hoveredCircuit !== null && !isHovered;

              // Smooth horizontal exit from pad at 282, smooth horizontal entry into pad at 678
              const pathD = `M 282 ${yA} C 460 ${yA}, 500 ${yB}, 678 ${yB}`;

              return (
                <g key={`wire-${link.fromPin}-${link.toPin}-${cableType}`}>
                  {/* Glowing background halo on hover */}
                  {isHovered && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={link.wireColor}
                      strokeWidth="11"
                      strokeOpacity="0.25"
                      filter="url(#wire-glow-effect)"
                    />
                  )}

                  {/* Base Colored Copper Conductor */}
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke={link.wireColor}
                    strokeWidth={isHovered ? 5.5 : 4}
                    strokeOpacity={isDimmed ? 0.2 : 1}
                    strokeLinecap="round"
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  />

                  {/* Striped Wire Overlay */}
                  {link.isStriped && (
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth={isHovered ? 3 : 2}
                      strokeDasharray="6 7"
                      strokeOpacity={isDimmed ? 0.25 : 0.95}
                      strokeLinecap="butt"
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    />
                  )}

                  {/* Moving Electrical Signal Energy Packet */}
                  <motion.circle
                    r={isHovered ? 5 : 3.5}
                    fill="#ffffff"
                    stroke={link.wireColor}
                    strokeWidth="2"
                    opacity={isDimmed ? 0 : 0.9}
                  >
                    <animateMotion
                      path={pathD}
                      dur={cableType === 'crossover' ? '1.8s' : '1.4s'}
                      repeatCount="indefinite"
                      keyPoints={link.direction === 'a-to-b' ? "0;1" : "1;0"}
                      keyTimes="0;1"
                    />
                  </motion.circle>
                </g>
              );
            })}

            {/* ------------------------------------------------------------- */}
            {/* LAYER 2: EXTREMO A PINS (Left Terminal Column, Pins 1 to 8)   */}
            {/* ------------------------------------------------------------- */}
            {currentPinsA.map((p) => {
              const y = getPinY(p.pin - 1);
              const isHovered = hoveredCircuit === p.pin;

              return (
                <g
                  key={`pin-a-${p.pin}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCircuit(p.pin)}
                  onMouseLeave={() => setHoveredCircuit(null)}
                >
                  {/* Card Container */}
                  <rect
                    x="16"
                    y={y - 22}
                    width="250"
                    height="44"
                    rx="12"
                    fill={isHovered ? "#f0f9ff" : "#ffffff"}
                    stroke={isHovered ? "#0284c7" : "#cbd5e1"}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                  />

                  {/* Pin Number Badge */}
                  <rect
                    x="26"
                    y={y - 15}
                    width="30"
                    height="30"
                    rx="8"
                    fill={isHovered ? "#0284c7" : "#0f172a"}
                  />
                  <text
                    x="41"
                    y={y + 4}
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize="12"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    P{p.pin}
                  </text>

                  {/* Color Swatch */}
                  <rect
                    x="66"
                    y={y - 10}
                    width="18"
                    height="20"
                    rx="4"
                    fill={
                      p.isStriped
                        ? p.wireColor === '#ea580c'
                          ? 'url(#stripe-orange)'
                          : p.wireColor === '#16a34a'
                          ? 'url(#stripe-green)'
                          : p.wireColor === '#2563eb'
                          ? 'url(#stripe-blue)'
                          : 'url(#stripe-brown)'
                        : p.wireColor
                    }
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />

                  {/* Pin Color Name */}
                  <text x="94" y={y - 3} fontFamily="monospace" fontSize="11" fontWeight="900" fill="#0f172a">
                    {p.colorName}
                  </text>

                  {/* Signal Function */}
                  <text
                    x="94"
                    y={y + 12}
                    fontFamily="monospace"
                    fontSize="10"
                    fontWeight="bold"
                    fill={p.role === 'tx' ? "#ea580c" : p.role === 'rx' ? "#16a34a" : "#64748b"}
                  >
                    {p.signal}
                  </text>

                  {/* Golden Terminal Contact Pad */}
                  <circle cx="282" cy={y} r="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                  <circle cx="282" cy={y} r="3.5" fill="#78350f" />
                </g>
              );
            })}

            {/* ------------------------------------------------------------- */}
            {/* LAYER 3: EXTREMO B PINS (Right Terminal Column, Pins 1 to 8)  */}
            {/* ------------------------------------------------------------- */}
            {pinsB.map((p) => {
              const y = getPinY(p.pin - 1);
              const isHovered = hoveredCircuit === p.pin;

              return (
                <g
                  key={`pin-b-${p.pin}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCircuit(p.pin)}
                  onMouseLeave={() => setHoveredCircuit(null)}
                >
                  {/* Golden Terminal Contact Pad */}
                  <circle cx="678" cy={y} r="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                  <circle cx="678" cy={y} r="3.5" fill="#78350f" />

                  {/* Card Container */}
                  <rect
                    x="694"
                    y={y - 22}
                    width="250"
                    height="44"
                    rx="12"
                    fill={isHovered ? "#f0f9ff" : "#ffffff"}
                    stroke={isHovered ? "#0284c7" : "#cbd5e1"}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                  />

                  {/* Color Swatch */}
                  <rect
                    x="706"
                    y={y - 10}
                    width="18"
                    height="20"
                    rx="4"
                    fill={
                      p.isStriped
                        ? p.wireColor === '#ea580c'
                          ? 'url(#stripe-orange)'
                          : p.wireColor === '#16a34a'
                          ? 'url(#stripe-green)'
                          : p.wireColor === '#2563eb'
                          ? 'url(#stripe-blue)'
                          : 'url(#stripe-brown)'
                        : p.wireColor
                    }
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />

                  {/* Pin Color Name */}
                  <text x="734" y={y - 3} fontFamily="monospace" fontSize="11" fontWeight="900" fill="#0f172a">
                    {p.colorName}
                  </text>

                  {/* Signal Function */}
                  <text
                    x="734"
                    y={y + 12}
                    fontFamily="monospace"
                    fontSize="10"
                    fontWeight="bold"
                    fill={p.role === 'tx' ? "#ea580c" : p.role === 'rx' ? "#16a34a" : "#64748b"}
                  >
                    {p.signal}
                  </text>

                  {/* Pin Number Badge */}
                  <rect
                    x="904"
                    y={y - 15}
                    width="30"
                    height="30"
                    rx="8"
                    fill={isHovered ? "#0284c7" : "#0f172a"}
                  />
                  <text
                    x="919"
                    y={y + 4}
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize="12"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    P{p.pin}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Circuit Telemetry HUD Callout */}
        <div className="mt-5 p-4 rounded-2xl bg-sky-50/90 border-2 border-sky-200 text-xs sm:text-sm font-mono text-slate-800 leading-relaxed shadow-xs">
          <AnimatePresence mode="wait">
            {activeLink ? (
              <motion.div
                key={`circuit-detail-${activeLink.fromPin}-${activeLink.toPin}-${cableType}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full flex-shrink-0 border border-slate-300" style={{ backgroundColor: activeLink.wireColor }} />
                  <div>
                    <strong className="text-sky-950 font-black">
                      Circuito Conectado: Pin #{activeLink.fromPin} (Extremo A) ➔ Pin #{activeLink.toPin} (Extremo B)
                    </strong>
                    <div className="text-xs text-slate-600 font-sans mt-0.5 font-medium">
                      {activeLink.desc}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-sky-300 text-sky-900 font-black text-xs">
                    Par {activeLink.pair} TIA
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-400 text-emerald-950 font-black text-xs flex items-center gap-1">
                    <CheckCircle2 size={13} className="text-emerald-700" />
                    Enlace Físico Válido
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default-guidance"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2.5 text-slate-700"
              >
                <Sparkles size={18} className="text-sky-600 flex-shrink-0" />
                <span>
                  {cableType === 'straight'
                    ? 'Regla Pin a Pin: En el cable directo, todos los 8 conductores van en paralelo exacto (Pin 1 con 1, 2 con 2, etc.). Pasa el cursor sobre cualquier pin para ver el circuito completo.'
                    : 'Regla de Cruce: En el cable cruzado, los pines de emisión TX (1 y 2) se conectan con los de recepción RX (3 y 6) del otro extremo para permitir comunicación directa sin switch.'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Technical Explanations of MDI, MDI-X and Auto MDI-X */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
              <h5 className="text-xs font-mono font-black text-sky-900 uppercase">
                MDI (Media Dependent Interface)
              </h5>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
              Configuración nativa de computadores, servidores y routers (NIC): transmiten datos por los pines <strong>1 y 2 (TX)</strong> y reciben datos por los pines <strong>3 y 6 (RX)</strong>.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              <h5 className="text-xs font-mono font-black text-amber-900 uppercase">
                MDI-X (Media Dependent Interface - Crossover)
              </h5>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
              Configuración en puertos de switches y hubs donde los circuitos están internamente invertidos: reciben en <strong>1-2</strong> y transmiten en <strong>3-6</strong>, permitiendo usar cables directos.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-emerald-600" />
              <h5 className="text-xs font-mono font-black text-emerald-900 uppercase">
                Auto MDI / MDI-X (IEEE 802.3ab)
              </h5>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
              El chip transceptor PHY detecta automáticamente el tipo de cable conectado y conmuta los circuitos electrónicos internamente. Es universal en Gigabit Ethernet (1000BASE-T) y hardware contemporáneo.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
