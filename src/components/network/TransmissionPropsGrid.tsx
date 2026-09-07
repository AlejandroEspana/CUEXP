import { useState } from 'react';
import { TRANSMISSION_PROPERTIES, type TransmissionProperty } from '../../data/cables';
import { Card } from '../ui/Card';
import { 
  Activity, 
  Zap, 
  Clock, 
  TrendingDown, 
  Radio, 
  Share2, 
  AlertTriangle, 
  ShieldCheck,
  Code2
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { motion } from 'framer-motion';

export const TransmissionPropsGrid = () => {
  const [selectedProp, setSelectedProp] = useState<TransmissionProperty | null>(null);

  const iconMap: Record<string, typeof Activity> = {
    Activity,
    Zap,
    Clock,
    TrendingDown,
    Radio,
    Share2,
    AlertTriangle,
    ShieldCheck
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {TRANSMISSION_PROPERTIES.map((prop, index) => {
          const IconComponent = iconMap[prop.iconName] || Activity;
          return (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedProp(prop)}
              className="cursor-pointer"
            >
              <Card 
                glowColor="primary"
                className="h-full flex flex-col justify-between p-6 bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-400 transition-all duration-200 rounded-3xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 shadow-xs">
                      <IconComponent size={22} />
                    </div>
                    <span className="text-xs font-mono text-slate-500 font-bold uppercase bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      {prop.unit.split(' ')[0]}
                    </span>
                  </div>

                  <h4 className="text-lg lg:text-xl font-display font-black text-slate-900 mb-2">
                    {prop.name}
                  </h4>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 font-normal">
                    {prop.definition}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 mt-auto">
                  <div className="text-xs text-slate-500 font-sans italic line-clamp-2">
                    <strong className="text-sky-700 font-bold not-italic">Ejemplo: </strong>
                    {prop.example}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedProp && (
        <Modal
          isOpen={!!selectedProp}
          onClose={() => setSelectedProp(null)}
          title={selectedProp.name}
          subtitle={`Unidad de medida: ${selectedProp.unit}`}
          maxWidth="lg"
        >
          <div className="space-y-5">
            <div>
              <h5 className="text-xs font-mono uppercase text-slate-500 font-extrabold mb-1.5">
                Definición Técnica
              </h5>
              <p className="text-slate-800 text-base leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 font-normal">
                {selectedProp.definition}
              </p>
            </div>

            {selectedProp.formula && (
              <div>
                <h5 className="text-xs font-mono uppercase text-sky-700 font-extrabold mb-1.5">
                  Ecuación Fundamental
                </h5>
                <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 font-mono text-sm sm:text-base font-bold text-sky-950 shadow-xs">
                  {selectedProp.formula}
                </div>
              </div>
            )}

            <div>
              <h5 className="text-xs font-mono uppercase text-emerald-700 font-extrabold mb-1.5">
                Ejemplo en Telecomunicaciones
              </h5>
              <p className="text-slate-800 text-base leading-relaxed bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 font-normal">
                {selectedProp.example}
              </p>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase text-purple-700 font-extrabold mb-1.5 flex items-center gap-1.5">
                <Code2 size={16} />
                Impacto Directo en Ingeniería de Software
              </h5>
              <p className="text-purple-950 text-base leading-relaxed bg-purple-50/70 p-4 rounded-2xl border border-purple-200 font-medium">
                {selectedProp.impactOnSoftware}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
