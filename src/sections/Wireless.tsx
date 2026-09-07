import { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { WIFI_STANDARDS, UNGUIDED_PHENOMENA, type WifiStandard } from '../data/wireless';
import { Card } from '../components/ui/Card';
import { Radio, Wifi, Layers, ShieldAlert, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../components/layout/Layout';

type FrequencyBand = '2.4ghz' | '5ghz' | '6ghz';
type PropagationScenario = 'los' | 'wall' | 'contention';

interface BandConfig {
  name: string;
  wavelength: string;
  channels: string;
  bandwidth: string;
}

const BAND_CONFIGS: Record<FrequencyBand, BandConfig> = {
  '2.4ghz': {
    name: '2.4 GHz (Onda Larga)',
    wavelength: 'λ ≈ 12.5 cm',
    channels: '3 canales no superpuestos (1, 6, 11)',
    bandwidth: 'Canales de 20 MHz'
  },
  '5ghz': {
    name: '5.0 GHz (Onda Media)',
    wavelength: 'λ ≈ 6.0 cm',
    channels: 'Hasta 24 canales no superpuestos',
    bandwidth: 'Canales de 80 / 160 MHz'
  },
  '6ghz': {
    name: '6.0 GHz (Wi-Fi 6E / 7)',
    wavelength: 'λ ≈ 4.8 cm',
    channels: 'Canales ultra-anchos sin congestión',
    bandwidth: 'Canales masivos de 320 MHz'
  }
};

interface ScenarioMetrics {
  rssi: string;
  rssiNum: number;
  snr: string;
  modulation: string;
  throughput: string;
  packetLoss: string;
  statusLabel: string;
  statusColor: 'emerald' | 'amber' | 'rose';
  explanation: string;
}

const METRICS_MATRIX: Record<FrequencyBand, Record<PropagationScenario, ScenarioMetrics>> = {
  '2.4ghz': {
    los: {
      rssi: '-44 dBm',
      rssiNum: 5,
      snr: '41 dB',
      modulation: '1024-QAM (MCS 11)',
      throughput: '520 Mbps',
      packetLoss: '< 0.05%',
      statusLabel: 'Enlace Óptimo',
      statusColor: 'emerald',
      explanation: 'Línea de vista directa. La onda electromagnética se propaga sin difracción ni sombras, permitiendo la constelación QAM más densa.'
    },
    wall: {
      rssi: '-66 dBm',
      rssiNum: 3,
      snr: '22 dB',
      modulation: '64-QAM (MCS 7)',
      throughput: '180 Mbps',
      packetLoss: '2.8%',
      statusLabel: 'Atenuación Moderada',
      statusColor: 'amber',
      explanation: 'A 2.4 GHz la onda larga (12.5 cm) difracta y atraviesa el muro con pérdida moderada (~12 dB), conservando suficiente SNR para enlaces estables.'
    },
    contention: {
      rssi: '-58 dBm',
      rssiNum: 3,
      snr: '14 dB (Ruido Alto)',
      modulation: '16-QAM (MCS 4)',
      throughput: '65 Mbps (Jitter)',
      packetLoss: '16.4%',
      statusLabel: 'Contienda CSMA/CA',
      statusColor: 'rose',
      explanation: 'Colisión en medio compartido. Los algoritmos de Clear Channel Assessment (CCA) pausan el transmisor mediante Random Exponential Backoff.'
    }
  },
  '5ghz': {
    los: {
      rssi: '-48 dBm',
      rssiNum: 5,
      snr: '44 dB',
      modulation: '1024-QAM / 4096-QAM',
      throughput: '2,150 Mbps',
      packetLoss: '< 0.02%',
      statusLabel: 'Enlace Ultra-Rápido',
      statusColor: 'emerald',
      explanation: 'Canal de 160 MHz libre de interferencias. Velocidades multigigabit ideales para streaming 4K/8K y replicación de bases de datos.'
    },
    wall: {
      rssi: '-78 dBm',
      rssiNum: 2,
      snr: '13 dB',
      modulation: 'QPSK (MCS 2)',
      throughput: '86 Mbps',
      packetLoss: '8.5%',
      statusLabel: 'Fuerte Desvanecimiento',
      statusColor: 'rose',
      explanation: 'A 5 GHz la onda corta (6 cm) sufre fuerte absorción en concreto armado. La señal cae -20 dB y el módem conmuta a modulación robusta pero lenta.'
    },
    contention: {
      rssi: '-52 dBm',
      rssiNum: 4,
      snr: '28 dB',
      modulation: '256-QAM (MCS 8)',
      throughput: '980 Mbps',
      packetLoss: '4.1%',
      statusLabel: 'Tráfico Concurrente',
      statusColor: 'amber',
      explanation: 'Gracias al mayor número de canales no superpuestos, la contienda es menor que en 2.4 GHz y el canal recupera capacidad velozmente.'
    }
  },
  '6ghz': {
    los: {
      rssi: '-42 dBm',
      rssiNum: 5,
      snr: '48 dB',
      modulation: '4096-QAM (12 bits/símbolo)',
      throughput: '4,600 Mbps',
      packetLoss: '< 0.01%',
      statusLabel: 'Rendimiento Máximo Wi-Fi 7',
      statusColor: 'emerald',
      explanation: 'Canal puro de 320 MHz con constelación 4096-QAM. Cero contienda de dispositivos legacy, con latencia comparable a un cable Ethernet.'
    },
    wall: {
      rssi: '-86 dBm',
      rssiNum: 1,
      snr: '6 dB',
      modulation: 'BPSK (MCS 0)',
      throughput: '22 Mbps',
      packetLoss: '24.2%',
      statusLabel: 'Pérdida Severa por Muro',
      statusColor: 'rose',
      explanation: 'A 6 GHz la señal prácticamente no atraviesa paredes macizas. Wi-Fi 7 resuelve esto mediante Multi-Link Operation (MLO) alternando a 2.4/5 GHz.'
    },
    contention: {
      rssi: '-45 dBm',
      rssiNum: 5,
      snr: '42 dB',
      modulation: '1024-QAM (MCS 10)',
      throughput: '3,200 Mbps',
      packetLoss: '0.8%',
      statusLabel: 'OFDMA Multi-Usuario',
      statusColor: 'emerald',
      explanation: 'La banda de 6 GHz opera con OFDMA estricto donde el AP asigna Resource Units (RUs) concurrentes sin colisión CSMA/CA aleatoria.'
    }
  }
};

export const Wireless = () => {
  const [band, setBand] = useState<FrequencyBand>('5ghz');
  const [scenario, setScenario] = useState<PropagationScenario>('los');

  const currentBand = BAND_CONFIGS[band];
  const metrics = METRICS_MATRIX[band][scenario];
  const waveCount = band === '2.4ghz' ? 4 : band === '5ghz' ? 6 : 8;

  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="18 • MEDIOS NO GUIADOS"
        badgeColor="purple"
        icon={<Wifi size={28} className="text-purple-600" />}
        title="Transmisión Inalámbrica y Wi-Fi"
        subtitle="Propagación de ondas electromagnéticas en el espacio libre: medio compartido half-duplex y desafíos de contienda"
      />

      {/* MASTER CISCO RF SIMULATOR CARD */}
      <Card className="p-6 sm:p-8 bg-white border-2 border-purple-200 shadow-xl rounded-3xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-100 text-purple-700 border border-purple-300 shadow-sm">
              <Radio size={26} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight">
                Simulador Dinámico de Propagación RF & Contienda
              </h3>
              <p className="text-xs sm:text-sm font-mono text-slate-500 font-semibold">
                Mecanismos de Radiación Electromagnética, Atenuación FSPL y Acceso al Medio CSMA/CA
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-black text-purple-800 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-300 self-start sm:self-auto shadow-xs">
            Laboratorio Interactivo Wi-Fi
          </span>
        </div>

        {/* CONTROLS BAR: BANDS + SCENARIOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Frequency Band Selector (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-1.5">
            <span className="text-xs font-mono font-black text-slate-600 uppercase tracking-wider">
              1. Banda de Frecuencia y Longitud de Onda (λ):
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['2.4ghz', '5ghz', '6ghz'] as FrequencyBand[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setBand(b)}
                  className={cn(
                    "py-2.5 px-3 rounded-xl border-2 font-mono text-xs font-black transition-all shadow-xs text-center flex flex-col items-center justify-center",
                    band === b
                      ? "bg-purple-100 border-purple-600 text-purple-950 shadow-md ring-2 ring-purple-400/40 scale-[1.02]"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-purple-50 hover:border-purple-300"
                  )}
                >
                  <span className={cn(band === b ? "text-purple-950 font-black" : "text-slate-800")}>
                    {b === '2.4ghz' ? '2.4 GHz' : b === '5ghz' ? '5.0 GHz' : '6.0 GHz'}
                  </span>
                  <span className={cn("text-[10px] font-bold", band === b ? "text-purple-700" : "text-slate-500")}>
                    {BAND_CONFIGS[b].wavelength}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Propagation Scenario Selector (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-1.5">
            <span className="text-xs font-mono font-black text-slate-600 uppercase tracking-wider">
              2. Escenario Físico del Entorno:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'los', label: 'Espacio Libre', sub: 'LOS Directo' },
                { id: 'wall', label: 'Muro Concreto', sub: 'Atenuación' },
                { id: 'contention', label: 'Contienda', sub: 'CSMA/CA' }
              ].map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setScenario(sc.id as PropagationScenario)}
                  className={cn(
                    "py-2.5 px-3 rounded-xl border-2 font-mono text-xs font-black transition-all shadow-xs text-center flex flex-col items-center justify-center",
                    scenario === sc.id
                      ? "bg-sky-100 border-sky-600 text-sky-950 shadow-md ring-2 ring-sky-400/40 scale-[1.02]"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-300"
                  )}
                >
                  <span className={cn(scenario === sc.id ? "text-sky-950 font-black" : "text-slate-800")}>
                    {sc.label}
                  </span>
                  <span className={cn("text-[10px] font-bold", scenario === sc.id ? "text-sky-700" : "text-slate-500")}>
                    {sc.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* REAL-TIME ELECTROMAGNETIC WAVE CANVAS */}
        <div className="relative h-64 sm:h-72 bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 sm:p-6 overflow-hidden flex items-center justify-between shadow-xs">
          {/* TRANSMITTER: Access Point TX */}
          <div className="relative z-20 flex flex-col items-center bg-white p-3 sm:p-4 rounded-2xl border-2 border-purple-300 shadow-md w-36 sm:w-44 text-center">
            {/* Dual Antennas */}
            <div className="flex justify-around w-full mb-1">
              <div className="w-1.5 h-6 bg-purple-600 rounded-t-full shadow-xs"></div>
              <div className="w-1.5 h-6 bg-purple-600 rounded-t-full shadow-xs"></div>
            </div>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700 mb-1 border border-purple-200">
              <Radio size={22} />
            </div>
            <span className="text-xs sm:text-sm font-mono font-black text-slate-900 leading-tight">
              Access Point TX
            </span>
            <span className="text-[10px] font-mono text-purple-700 font-bold mt-0.5">
              Potencia: 20 dBm (100mW)
            </span>
            <div className="flex items-center gap-1 mt-1 text-[9px] font-mono font-bold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>MIMO 4x4 ACTIVO</span>
            </div>
          </div>

          {/* DYNAMIC WAVEFIELD CANVAS */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 700 240" preserveAspectRatio="none">
              {/* Forward Propagating Spherical Waves */}
              {[...Array(waveCount)].map((_, i) => {
                const delay = (i * 2.0) / waveCount;
                return (
                  <motion.path
                    key={`wave-${i}-${band}-${scenario}`}
                    d="M 160 30 A 180 180 0 0 1 160 210"
                    fill="none"
                    stroke={scenario === 'contention' ? "#ef4444" : "#9333ea"}
                    strokeWidth={band === '2.4ghz' ? 4 : band === '5ghz' ? 3 : 2.5}
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M 140 90 A 30 30 0 0 1 140 150",
                        scenario === 'wall'
                          ? "M 320 50 A 140 140 0 0 1 320 190"
                          : "M 340 40 A 160 160 0 0 1 340 200",
                        scenario === 'wall'
                          ? "M 550 60 A 240 240 0 0 1 550 180"
                          : "M 560 20 A 240 240 0 0 1 560 220"
                      ],
                      opacity: scenario === 'wall' 
                        ? [0.95, 0.7, 0.2]
                        : [0.95, 0.65, 0.05]
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: delay,
                      ease: "linear"
                    }}
                  />
                );
              })}

              {/* Reflected Waves in Wall Scenario */}
              {scenario === 'wall' && (
                <>
                  {[0, 1].map((rw) => (
                    <motion.path
                      key={`refl-${rw}`}
                      d="M 330 60 A 90 90 0 0 0 330 180"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="3"
                      strokeDasharray="6 3"
                      animate={{
                        d: [
                          "M 340 80 A 50 50 0 0 0 340 160",
                          "M 220 50 A 120 120 0 0 0 220 190"
                        ],
                        opacity: [0.85, 0]
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: rw * 0.9,
                        ease: 'easeOut'
                      }}
                    />
                  ))}
                </>
              )}

              {/* Carrier Photon Particles */}
              <motion.circle
                r="5"
                fill={scenario === 'contention' ? "#ef4444" : "#9333ea"}
                stroke="#ffffff"
                strokeWidth="2"
                animate={{
                  cx: [140, scenario === 'wall' ? 340 : 540],
                  cy: [120, 120],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
              />
            </svg>

            {/* Concrete Wall Obstacle */}
            <AnimatePresence>
              {scenario === 'wall' && (
                <motion.div
                  key="wall-obstacle"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-12 sm:w-16 bg-slate-200 border-2 border-slate-400 rounded-xl shadow-lg flex flex-col items-center justify-around py-3 z-10"
                >
                  <div className="w-full border-b border-slate-300"></div>
                  <span className="text-[10px] font-mono font-black text-slate-700 -rotate-90 uppercase tracking-wider whitespace-nowrap">
                    MURO HORMIGÓN (-18 dB)
                  </span>
                  <div className="w-full border-t border-slate-300"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contention Collision Alert */}
            <AnimatePresence>
              {scenario === 'contention' && (
                <motion.div
                  key="contention-alert"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="absolute top-3 left-1/2 -translate-x-1/2 bg-rose-50 border-2 border-rose-400 text-rose-900 px-3.5 py-1.5 rounded-xl shadow-md z-10 text-center font-mono"
                >
                  <div className="flex items-center gap-1.5 text-xs font-black text-rose-700">
                    <ShieldAlert size={14} className="text-rose-600 animate-bounce" />
                    <span>COLISIÓN DETECTADA (CANAL OCUPADO)</span>
                  </div>
                  <div className="text-[10px] text-slate-600">
                    Ejecutando Random Exponential Backoff: <strong>Timer = 34 µs</strong>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RECEIVER: Client RX */}
          <div className="relative z-20 flex flex-col items-center bg-white p-3 sm:p-4 rounded-2xl border-2 border-sky-300 shadow-md w-36 sm:w-44 text-center">
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700 mb-1 border border-sky-200">
              <Wifi size={22} />
            </div>
            <span className="text-xs sm:text-sm font-mono font-black text-slate-900 leading-tight">
              Cliente Wi-Fi RX
            </span>

            {/* 5-Bar Signal Strength Meter */}
            <div className="flex items-end gap-1 my-1.5 h-5">
              {[1, 2, 3, 4, 5].map((bar) => {
                const isActive = bar <= metrics.rssiNum;
                return (
                  <div
                    key={bar}
                    className={cn(
                      "w-1.5 sm:w-2 rounded-t transition-all",
                      isActive
                        ? metrics.statusColor === 'emerald'
                          ? "bg-emerald-500"
                          : metrics.statusColor === 'amber'
                          ? "bg-amber-500"
                          : "bg-rose-500"
                        : "bg-slate-200"
                    )}
                    style={{ height: `${bar * 20}%` }}
                  />
                );
              })}
            </div>

            <span className="text-[11px] font-mono font-black text-slate-800">
              RSSI: {metrics.rssi}
            </span>
            <span className={cn(
              "text-[9px] font-mono font-black px-2 py-0.5 rounded-full mt-1 uppercase",
              metrics.statusColor === 'emerald' && "bg-emerald-50 text-emerald-800 border border-emerald-200",
              metrics.statusColor === 'amber' && "bg-amber-50 text-amber-800 border border-amber-200",
              metrics.statusColor === 'rose' && "bg-rose-50 text-rose-800 border border-rose-200"
            )}>
              {metrics.statusLabel}
            </span>
          </div>
        </div>

        {/* 6-METRIC TELEMETRY GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Frecuencia / λ</span>
            <span className="text-xs sm:text-sm font-black text-slate-900">{currentBand.wavelength}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Potencia Rx (RSSI)</span>
            <span className="text-xs sm:text-sm font-black text-purple-700">{metrics.rssi}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Relación Señal/Ruido</span>
            <span className="text-xs sm:text-sm font-black text-sky-700">{metrics.snr}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Throughput Efectivo</span>
            <span className="text-xs sm:text-sm font-black text-emerald-700">{metrics.throughput}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Modulación PHY (MCS)</span>
            <span className="text-xs sm:text-sm font-black text-amber-800">{metrics.modulation}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Pérdida de Paquetes</span>
            <span className="text-xs sm:text-sm font-black text-rose-700">{metrics.packetLoss}</span>
          </div>
        </div>

        {/* Real-time Physical Explanation Callout */}
        <div className="p-4 rounded-2xl bg-purple-50/80 border-2 border-purple-200 text-xs sm:text-sm font-sans text-slate-800 leading-relaxed shadow-xs flex items-start gap-3">
          <Activity size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-purple-950 font-black">Comportamiento Electromagnético: </strong>
            {metrics.explanation}
          </div>
        </div>
      </Card>

      {/* Degradation Phenomena in Unguided Media */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {UNGUIDED_PHENOMENA.map((item: { title: string; description: string; formula: string }, idx: number) => (
          <Card key={idx} className="p-6 bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between rounded-3xl">
            <div>
              <h4 className="text-base sm:text-lg font-display font-black text-slate-900 mb-2">{item.title}</h4>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 font-normal">{item.description}</p>
            </div>
            <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-200 text-xs sm:text-sm font-mono text-purple-900 font-bold shadow-xs">
              {item.formula}
            </div>
          </Card>
        ))}
      </div>

      {/* Wi-Fi Generations Evolution Table */}
      <Card className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md rounded-3xl">
        <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900 mb-6 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
            <Layers size={22} />
          </div>
          Evolución de Estándares Wi-Fi (Familia IEEE 802.11)
        </h4>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm font-mono border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-black">
                <th className="py-3.5 px-4">Generación</th>
                <th className="py-3.5 px-4">Estándar IEEE</th>
                <th className="py-3.5 px-4">Bandas de Frecuencia</th>
                <th className="py-3.5 px-4 text-sky-700">Velocidad Máxima Teórica</th>
                <th className="py-3.5 px-4">Modulación PHY</th>
                <th className="py-3.5 px-4">Innovación Clave</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {WIFI_STANDARDS.map((w: WifiStandard) => (
                <tr key={w.generation} className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-black text-purple-950">{w.generation}</td>
                  <td className="py-3.5 px-4 text-purple-700 font-extrabold">{w.ieee}</td>
                  <td className="py-3.5 px-4 font-semibold">{w.frequencies.join(', ')}</td>
                  <td className="py-3.5 px-4 text-sky-700 font-black">{w.maxTheoreticalSpeed}</td>
                  <td className="py-3.5 px-4">{w.modulation}</td>
                  <td className="py-3.5 px-4 text-xs sm:text-sm text-slate-600 font-sans">{w.keyFeatures[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="HTTP/3, QUIC & Pérdida de Paquetes en Wi-Fi"
        takeaway="La naturaleza inestable del Wi-Fi motivó a Google y al IETF a diseñar HTTP/3 sobre UDP para evitar el bloqueo de cabeza de línea (HOL blocking)."
      >
        <p>
          En Wi-Fi, cuando un usuario camina por una oficina o entra a un ascensor, la señal sufre <strong>desvanecimiento multitrayecto</strong> momentáneo que causa pérdida de tramas a nivel físico.
        </p>
        <p>
          En HTTP/2 (que corre sobre TCP), un solo paquete perdido en el Wi-Fi congela todos los demás flujos multiplexados (`Head-of-Line Blocking`), porque TCP insiste en entregar los bytes estrictamente en orden. Para solucionar este problema inherente del medio inalámbrico, se diseñó <strong>HTTP/3 con el protocolo QUIC (sobre UDP)</strong>: si se pierde un paquete en el aire, solo se retrasa ese recurso individual, mientras que el resto de llamadas a la API de tu aplicación web continúan procesándose sin interrupción.
        </p>
      </EngineeringConnection>
    </div>
  );
};
