import { Card } from '../ui/Card';
import { RJ8_ANALYSIS } from '../../data/connectors';
import { BookOpen, ShieldAlert } from 'lucide-react';

export const Rj8Clarification = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Banner of Rigorous Academic Warning */}
      <Card glowColor="orange" className="p-6 sm:p-8 bg-amber-50 border-2 border-amber-400 shadow-md rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-200 text-amber-900 flex-shrink-0 shadow-inner">
            <ShieldAlert size={32} />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-amber-800 font-black tracking-wider">
              Investigación Académica Rigurosa
            </span>
            <h3 className="text-2xl lg:text-3xl font-display font-black text-amber-950 mt-1">
              {RJ8_ANALYSIS.title}
            </h3>
            <p className="text-slate-800 text-sm sm:text-base mt-2.5 leading-relaxed font-medium">
              {RJ8_ANALYSIS.summary}
            </p>
          </div>
        </div>
      </Card>

      {/* Breakdown Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RJ8_ANALYSIS.points.map((point, idx) => (
          <Card key={idx} className="p-6 bg-white border-2 border-slate-200 shadow-md rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 border-2 border-sky-300 flex items-center justify-center text-sm font-mono font-black shadow-sm">
                  {idx + 1}
                </div>
                <h4 className="text-base sm:text-lg font-display font-black text-slate-900">
                  {point.topic}
                </h4>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans font-medium">
                {point.detail}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Comparison table of modular connector designations */}
      <Card className="p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-2xl">
        <h4 className="text-xl font-display font-black text-slate-900 mb-5 flex items-center gap-2.5">
          <BookOpen size={24} className="text-sky-600" />
          Cuadro Comparativo: Conectores Modulares Reales vs. Códigos RJ
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-700 bg-slate-50">
                <th className="py-3 px-4 font-black">Nombre Físico Real</th>
                <th className="py-3 px-4 text-sky-800 font-black">Código RJ Popular</th>
                <th className="py-3 px-4 text-slate-700 font-black">Uso Original de Telecom</th>
                <th className="py-3 px-4 text-emerald-800 font-black">Estado Técnico Oficial</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100 text-slate-800 font-sans">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 font-mono text-xs sm:text-sm">6P2C / 6P4C</td>
                <td className="py-3.5 px-4 text-sky-800 font-black font-mono text-xs sm:text-sm">RJ11 / RJ14</td>
                <td className="py-3.5 px-4 text-xs sm:text-sm">Línea telefónica analógica de 1 o 2 pares (POTS)</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold text-xs sm:text-sm">Estándar formal FCC</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 font-mono text-xs sm:text-sm">8P8C (Con muesca/key)</td>
                <td className="py-3.5 px-4 text-sky-800 font-black font-mono text-xs sm:text-sm">RJ45S (Histórico)</td>
                <td className="py-3.5 px-4 text-xs sm:text-sm">Módem analógico Bell System con resistencia de programación</td>
                <td className="py-3.5 px-4 text-slate-500 font-medium text-xs sm:text-sm">Obsoleto para Ethernet</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 font-mono text-xs sm:text-sm">8P8C (Sin muesca)</td>
                <td className="py-3.5 px-4 text-sky-800 font-black font-mono text-xs sm:text-sm">Coloquialmente "RJ45"</td>
                <td className="py-3.5 px-4 text-xs sm:text-sm">Redes de área local Ethernet (1000BASE-T, 10GBASE-T)</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold text-xs sm:text-sm">ANSI/TIA-568 e ISO/IEC 11801</td>
              </tr>
              <tr className="bg-red-50/70 border-2 border-red-200 text-red-950">
                <td className="py-3.5 px-4 font-black text-red-700 font-mono text-xs sm:text-sm">Ninguno estándar</td>
                <td className="py-3.5 px-4 text-red-700 font-black font-mono text-xs sm:text-sm">"RJ8"</td>
                <td className="py-3.5 px-4 text-red-800 text-xs sm:text-sm">Confusión popular por asociar "8 contactos" a la sigla RJ</td>
                <td className="py-3.5 px-4 text-red-700 font-black text-xs sm:text-sm">Inexistente como estándar de red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
