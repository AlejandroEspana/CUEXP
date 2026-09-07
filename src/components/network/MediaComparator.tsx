import { useState, useMemo } from 'react';
import { Card } from '../ui/Card';
import { MEDIA_PROFILES } from '../../data/comparator';
import { Sparkles, Sliders } from 'lucide-react';
import { cn } from '../layout/Layout';

export const MediaComparator = () => {
  const [distanceFilter, setDistanceFilter] = useState<number>(50); // meters
  const [throughputFilter, setThroughputFilter] = useState<number>(1); // Gbps
  const [environmentFilter, setEnvironmentFilter] = useState<'indoor' | 'outdoor' | 'datacenter' | 'industrial'>('indoor');
  const [emiRisk, setEmiRisk] = useState<'low' | 'high'>('low');

  // Scoring algorithm to determine best match
  const rankedMedia = useMemo(() => {
    return MEDIA_PROFILES.map(media => {
      let score = 100;

      // Distance check
      if (distanceFilter > media.maxDistanceMeters) {
        score -= 60; // Penalty for exceeding physics
      } else {
        // Closer to optimal distance gets bonus
        score += 10;
      }

      // Throughput check
      if (throughputFilter > media.maxThroughputGbps) {
        score -= 40;
      }

      // Environment check
      if (media.environment.includes(environmentFilter)) {
        score += 20;
      } else {
        score -= 30;
      }

      // High EMI requirement favors optical and shielded
      if (emiRisk === 'high') {
        if (media.emiImmunity >= 5) score += 25;
        else if (media.emiImmunity <= 2) score -= 40;
      }

      return {
        ...media,
        calculatedScore: Math.max(0, score)
      };
    }).sort((a, b) => b.calculatedScore - a.calculatedScore);
  }, [distanceFilter, throughputFilter, environmentFilter, emiRisk]);

  const topMatch = rankedMedia[0];

  return (
    <div className="flex flex-col gap-8">
      {/* Interactive Controls Bar */}
      <Card glowColor="cyan" className="p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-2xl">
        <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-100 pb-4">
          <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
            <Sliders size={24} />
          </div>
          <h3 className="text-2xl font-display font-black text-slate-900">
            Parámetros de tu Proyecto de Red
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Distance Slider */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-baseline text-sm font-mono">
              <span className="text-slate-600 font-bold">Distancia Requerida:</span>
              <span className="text-sky-700 font-black text-base sm:text-lg">
                {distanceFilter >= 1000 ? `${(distanceFilter / 1000).toFixed(1)} km` : `${distanceFilter} metros`}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="5000"
              step="20"
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(Number(e.target.value))}
              className="w-full accent-sky-600 bg-slate-200 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
              <span>5m (Puesto)</span>
              <span>100m (LAN)</span>
              <span>5km (Campus)</span>
            </div>
          </div>

          {/* Throughput Slider */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-baseline text-sm font-mono">
              <span className="text-slate-600 font-bold">Velocidad Mínima:</span>
              <span className="text-sky-700 font-black text-base sm:text-lg">
                {throughputFilter >= 1 ? `${throughputFilter} Gbps` : `${throughputFilter * 1000} Mbps`}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="100"
              step="0.5"
              value={throughputFilter}
              onChange={(e) => setThroughputFilter(Number(e.target.value))}
              className="w-full accent-sky-600 bg-slate-200 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
              <span>100 Mbps</span>
              <span>10 Gbps</span>
              <span>100 Gbps</span>
            </div>
          </div>

          {/* Environment Selector */}
          <div className="space-y-2.5">
            <span className="text-sm font-mono font-bold text-slate-600 block">Entorno de Instalación:</span>
            <div className="grid grid-cols-2 gap-2">
              {(['indoor', 'outdoor', 'datacenter', 'industrial'] as const).map((env) => (
                <button
                  key={env}
                  onClick={() => setEnvironmentFilter(env)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all border-2",
                    environmentFilter === env
                      ? "bg-sky-100 border-sky-600 text-sky-950 font-black ring-2 ring-sky-400/40 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                  )}
                >
                  {env === 'indoor' ? 'Interior' : env === 'outdoor' ? 'Exterior' : env === 'datacenter' ? 'Datacenter' : 'Industrial'}
                </button>
              ))}
            </div>
          </div>

          {/* EMI Interference Risk */}
          <div className="space-y-2.5">
            <span className="text-sm font-mono font-bold text-slate-600 block">Riesgo de Ruido EMI:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setEmiRisk('low')}
                className={cn(
                  "px-3 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border-2",
                  emiRisk === 'low'
                    ? "bg-emerald-100 border-emerald-600 text-emerald-950 font-black ring-2 ring-emerald-400/40 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                )}
              >
                Normal / Bajo
              </button>
              <button
                onClick={() => setEmiRisk('high')}
                className={cn(
                  "px-3 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border-2",
                  emiRisk === 'high'
                    ? "bg-amber-100 border-amber-600 text-amber-950 font-black ring-2 ring-amber-400/40 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                )}
              >
                Severo (Motores)
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Top Recommendation Highlight Card */}
      <Card glowColor="green" className="p-6 sm:p-8 bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/40 border-2 border-emerald-500 shadow-xl rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-emerald-100 pb-5 mb-5">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-700 border-2 border-emerald-300 shadow-sm">
              <Sparkles size={28} />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-emerald-700 font-black tracking-wider">
                Recomendación Óptima del Sistema
              </span>
              <h3 className="text-2xl sm:text-4xl font-display font-black text-slate-900 mt-0.5">
                {topMatch.name}
              </h3>
            </div>
          </div>

          <div className="text-left sm:text-right bg-white p-3 px-5 rounded-2xl border-2 border-emerald-200 shadow-sm">
            <span className="text-xs font-mono text-slate-500 font-bold block">Índice de Compatibilidad</span>
            <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-600">{topMatch.calculatedScore}%</span>
          </div>
        </div>

        <p className="text-slate-800 text-base sm:text-lg leading-relaxed mb-6 font-medium">
          {topMatch.bestSuitedFor}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm font-mono">
          <div className="p-5 bg-white rounded-2xl border-2 border-emerald-200 shadow-sm">
            <span className="text-emerald-800 font-black text-base block mb-2">✓ Principales Ventajas:</span>
            <ul className="space-y-1.5 text-slate-700 font-sans text-sm sm:text-base font-medium">
              {topMatch.pros.map((p, i) => <li key={i}>• {p}</li>)}
            </ul>
          </div>
          <div className="p-5 bg-white rounded-2xl border-2 border-amber-200 shadow-sm">
            <span className="text-amber-800 font-black text-base block mb-2">⚠ Limitaciones a Considerar:</span>
            <ul className="space-y-1.5 text-slate-700 font-sans text-sm sm:text-base font-medium">
              {topMatch.cons.map((c, i) => <li key={i}>• {c}</li>)}
            </ul>
          </div>
        </div>
      </Card>

      {/* Comparison Grid of All Media */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {rankedMedia.slice(1).map((media) => (
          <Card key={media.id} className="p-5 bg-white border-2 border-slate-200 hover:border-sky-400 shadow-md rounded-2xl flex flex-col justify-between transition-all hover:shadow-lg">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {media.category}
                </span>
                <span className="text-xs font-mono text-sky-700 font-black bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  Score: {media.calculatedScore}%
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-display font-black text-slate-900 mb-3">
                {media.name}
              </h4>

              <div className="space-y-1.5 text-xs font-mono text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>Alcance máx: <strong className="text-slate-900">{media.maxDistanceLabel}</strong></div>
                <div>Velocidad máx: <strong className="text-sky-700">{media.maxThroughputLabel}</strong></div>
              </div>
            </div>

            <p className="text-xs text-slate-600 italic line-clamp-2 pt-3 border-t-2 border-slate-100 font-sans">
              {media.primaryUse}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
