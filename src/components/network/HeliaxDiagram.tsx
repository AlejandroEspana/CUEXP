import { Card } from '../ui/Card';
import { Radio, TowerControl as Tower } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeliaxDiagram = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Visual Diagram: Cell Tower Feed Line (6 cols) */}
      <Card className="lg:col-span-6 p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-2xl flex flex-col justify-between">
        <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
              <Radio size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-display font-black text-slate-900 uppercase tracking-wider">
              Línea de Transmisión en Torre Celular
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            Alimentación RF de 50Ω
          </span>
        </div>

        {/* Vertical Tower & Heliax Cable Schematic */}
        <div className="relative h-88 bg-slate-50 rounded-2xl border-2 border-slate-200 p-5 flex items-center justify-around overflow-hidden shadow-xs">
          {/* Left: Antenna Sectorial */}
          <div className="flex flex-col items-center justify-between h-full py-2 z-10">
            {/* Tower Top Antennas */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-white border-2 border-sky-300 text-sky-700 shadow-md">
              <Tower size={36} />
              <span className="text-xs font-mono font-black mt-1 text-slate-900">Antenas 4G/5G</span>
              <span className="text-[11px] font-mono text-sky-700 font-bold">Altura: 45 metros</span>
            </div>

            {/* Heliax corrugated cable vertical span with simulated RF flow */}
            <div className="my-3 flex-1 flex items-center justify-center relative w-20">
              {/* Outer corrugated copper tube representation */}
              <div className="w-10 h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 rounded-sm relative overflow-hidden border-2 border-amber-500 shadow-md">
                {/* Corrugation ridges */}
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="w-full h-1 bg-amber-900/60 border-b border-amber-200/60 my-1.5"></div>
                ))}

                {/* Animated upward RF energy pulses */}
                <motion.div
                  animate={{ top: ['105%', '-25%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-x-0 h-14 bg-gradient-to-t from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#38bdf8]"
                />
              </div>

              {/* Annotation */}
              <div className="absolute left-12 text-xs font-mono font-black text-sky-900 bg-white px-2.5 py-1 rounded-lg border-2 border-sky-300 shadow-sm whitespace-nowrap">
                Heliax® 7/8"
              </div>
            </div>

            {/* Base Station Transceiver */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-white border-2 border-slate-300 text-slate-700 shadow-md">
              <span className="text-xs font-mono font-black text-slate-900">Transceptor BBU</span>
              <span className="text-[11px] font-mono text-slate-500 font-semibold">Caseta en Base</span>
            </div>
          </div>

          {/* Right: Cross-section Callout */}
          <div className="w-56 bg-white p-4 rounded-2xl border-2 border-slate-200 text-xs font-mono space-y-2.5 shadow-md">
            <div className="font-black text-amber-800 border-b border-slate-200 pb-1.5 text-xs uppercase tracking-wider">
              Capas del Cable Heliax:
            </div>
            <div>
              <div className="text-slate-900 font-black">1. Forro PE Exterior</div>
              <div className="text-[11px] text-slate-600 font-sans">Inmune a rayos UV y hielo</div>
            </div>
            <div>
              <div className="text-amber-800 font-black">2. Cobre Corrugado</div>
              <div className="text-[11px] text-slate-600 font-sans">Blindaje 100% estanco</div>
            </div>
            <div>
              <div className="text-slate-800 font-black">3. Espuma Dieléctrica</div>
              <div className="text-[11px] text-slate-600 font-sans">Inyección de nitrógeno</div>
            </div>
            <div>
              <div className="text-yellow-700 font-black">4. Conductor Central</div>
              <div className="text-[11px] text-slate-600 font-sans">Tubo de cobre sólido</div>
            </div>
          </div>
        </div>

        <div className="text-xs sm:text-sm font-mono text-slate-600 mt-4 pt-3 border-t-2 border-slate-100">
          <strong className="text-slate-900 font-bold">Impedancia: </strong> 50 Ohmios nominales • Rango de frecuencia: DC hasta 5 GHz
        </div>
      </Card>

      {/* Technical Narrative & Clarification (6 cols) */}
      <Card glowColor="cyan" className="lg:col-span-6 p-6 sm:p-8 bg-white border-2 border-sky-200 shadow-lg rounded-2xl flex flex-col justify-between">
        <div className="space-y-5">
          <div className="border-b-2 border-slate-100 pb-3">
            <span className="text-xs font-mono text-sky-700 uppercase tracking-wider font-black">
              Clarificación Académica Importante
            </span>
            <h3 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mt-1">
              ¿Qué es realmente "Heliax"?
            </h3>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            A menudo en clases de redes se menciona "Heliax" como si fuera un tipo genérico de cable con una única medida. En realidad, <strong>Heliax® es una marca registrada de CommScope</strong> (desarrollada originalmente por Andrew Corporation) que engloba una prestigiosa familia de líneas coaxiales corrugadas de ultra baja pérdida.
          </p>

          <div className="space-y-2">
            <h5 className="text-xs font-mono uppercase text-sky-800 font-black">
              ¿Por qué el blindaje es corrugado?
            </h5>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed bg-sky-50/80 p-4 rounded-xl border-2 border-sky-200 font-sans">
              Un tubo metálico liso de cobre de 22 mm de grosor (7/8") sería imposible de doblar sin quebrarse o aplastarse. La <strong>corrugación anular o helicoidal</strong> otorga flexibilidad mecánica para subir por mástiles y sortear esquinas manteniendo una geometría concéntrica perfecta, sin alterar la impedancia de 50Ω ni inducir ondas estacionarias (SWR).
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="text-xs font-mono uppercase text-emerald-700 font-black">
              Ventajas en Estaciones Base 4G y 5G
            </h5>
            <ul className="text-sm sm:text-base text-slate-700 space-y-1.5 list-disc list-inside font-sans font-medium">
              <li>Pérdida por inserción significativamente menor que cualquier cable de malla trenzada.</li>
              <li>Aislamiento electromagnético absoluto: cero fuga de potencia RF a los vecinos.</li>
              <li>Estanqueidad frente al agua mediante conectores DIN 7/16 o 4.3-10 estancos.</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t-2 border-slate-100 text-sm font-mono text-slate-700">
          <strong className="text-sky-700 font-bold">Impacto en Software Móvil: </strong>
          Cada decibelio de potencia ahorrado en la línea Heliax se traduce en mejor cobertura celular en sótanos y mayor velocidad en descargas para usuarios de apps móviles.
        </div>
      </Card>
    </div>
  );
};
