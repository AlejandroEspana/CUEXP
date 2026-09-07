import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { RG8_DATA } from '../data/rf';
import { Card } from '../components/ui/Card';
import { Radio, AlertTriangle, History } from 'lucide-react';

export const RG8 = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="14 • CABLES COAXIALES CLÁSICOS"
        badgeColor="orange"
        icon={<Radio size={28} className="text-orange" />}
        title="Cable Coaxial RG-8 / RG-8U"
        subtitle="Línea de 50 ohmios con especificación militar MIL-C-17, base fundacional de 10BASE5 (Thicknet) y líneas de RF"
      />

      {/* Historical Context Card (10BASE5) */}
      <Card glowColor="orange" className="p-6 sm:p-8 bg-amber-50/80 border border-amber-300 rounded-3xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="p-4 rounded-2xl bg-amber-100 text-amber-800 flex-shrink-0 border border-amber-300 shadow-sm">
            <History size={32} />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-amber-800 font-extrabold tracking-wider">
              Hito Histórico en la Arquitectura de Redes
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              {RG8_DATA.historicalImpact.title}
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              {RG8_DATA.historicalImpact.description}
            </p>
          </div>
        </div>
      </Card>

      {/* Technical Data and Attenuation Curve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md flex flex-col justify-between rounded-3xl">
          <div className="space-y-5">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-mono text-sky-700 uppercase font-black tracking-wider">Ficha Técnica</span>
              <h4 className="text-2xl font-display font-black text-slate-900 mt-1">{RG8_DATA.name}</h4>
              <div className="text-sm font-mono text-slate-600 mt-0.5 font-medium">Familia: {RG8_DATA.family}</div>
            </div>

            <div className="space-y-3 text-sm font-mono">
              <div className="flex justify-between items-center p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-semibold">Impedancia Característica:</span>
                <span className="text-amber-800 font-black text-base">{RG8_DATA.impedance}</span>
              </div>
              <div className="flex justify-between items-center p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-semibold">Diámetro Exterior:</span>
                <span className="text-slate-900 font-bold text-base">{RG8_DATA.diameter}</span>
              </div>
              <div className="flex justify-between items-center p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-semibold">Conductor Central:</span>
                <span className="text-slate-900 font-bold">Cobre 7 hilos (AWG 10-11)</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-slate-500 block mb-2 font-extrabold tracking-wider">Usos Actuales en Radiofrecuencia:</span>
              <ul className="text-sm sm:text-base text-slate-700 space-y-1.5 list-disc list-inside font-normal">
                {RG8_DATA.modernApplications.map((app: string, i: number) => <li key={i}>{app}</li>)}
              </ul>
            </div>
          </div>

          {/* Academic Caution Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-sm font-mono text-amber-950 flex items-start gap-3 shadow-xs">
            <AlertTriangle size={20} className="text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed text-slate-800 font-medium">
              {RG8_DATA.academicCaution}
            </p>
          </div>
        </Card>

        {/* Attenuation vs Frequency Table */}
        <Card className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md flex flex-col justify-between rounded-3xl">
          <div>
            <div className="border-b border-slate-200 pb-4 mb-5">
              <span className="text-xs font-mono text-sky-700 uppercase font-black tracking-wider">Comportamiento Electromagnético</span>
              <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-1">Atenuación Típica vs. Frecuencia</h4>
              <p className="text-sm text-slate-600 mt-1">Pérdida en decibelios cada 100 metros a medida que se incrementa la frecuencia</p>
            </div>

            <div className="space-y-2.5 font-mono text-sm">
              {RG8_DATA.attenuationCurve.map((row: { freq: string; loss: string }, i: number) => (
                <div key={i} className="flex justify-between items-center p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-extrabold text-slate-900">{row.freq}</span>
                  <span className="text-amber-700 font-black text-base">{row.loss}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mt-5 pt-4 border-t border-slate-200 leading-relaxed font-sans">
            A frecuencias de gigahercios (1 GHz), la atenuación se dispara a 26 dB/100m debido a pérdidas resistivas por efecto pelicular y absorción en el dieléctrico, razón por la cual hoy se prefieren líneas corrugadas como Heliax.
          </p>
        </Card>
      </div>

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="La Herencia de Ethernet & Algoritmos de Backoff"
        takeaway="El algoritmo de retroceso exponencial de CSMA/CD fue creado específicamente para lidiar con colisiones eléctricas en cables coaxiales RG-8."
      >
        <p>
          En los días de 10BASE5 sobre cable RG-8, docenas de estaciones compartían un único bus eléctrico continuo. Si dos estaciones transmitían al mismo tiempo, los voltajes se sumaban en el cable y se producía una <strong>colisión física de datos</strong>.
        </p>
        <p>
          Para resolver esto, Robert Metcalfe inventó el algoritmo <strong>Exponential Backoff (retroceso exponencial truncado)</strong>: si hay colisión, cada nodo espera un tiempo pseudoaleatorio antes de reintentar. Hoy en día los switches eliminaron las colisiones en Ethernet cableado, pero este mismo algoritmo matemático es la base de las políticas de reintento (`Retry-After` con jitter) que todo desarrollador implementa en clientes HTTP para evitar tormentas de peticiones contra microservicios saturados.
        </p>
      </EngineeringConnection>
    </div>
  );
};
