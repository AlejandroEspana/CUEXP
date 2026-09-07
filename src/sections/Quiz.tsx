import { SectionHeader } from '../components/ui/SectionHeader';
import { EngineeringConnection } from '../components/ui/EngineeringConnection';
import { QuizComponent } from '../components/quiz/QuizComponent';
import { HelpCircle } from 'lucide-react';

export const Quiz = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SectionHeader
        badge="21 • EVALUACIÓN DE CONOCIMIENTOS"
        badgeColor="orange"
        icon={<HelpCircle size={28} className="text-orange" />}
        title="Evaluación Interactiva de Dominio Técnico"
        subtitle="18 preguntas rigurosas sobre el modelo OSI, cableado estructurado, fibra monomodo/multimodo, RF e impacto en software"
      />

      {/* Quiz Interactive Component */}
      <QuizComponent />

      {/* Engineering Connection */}
      <EngineeringConnection
        topic="Entrevistas Técnicas de System Design & Redes"
        takeaway="Preguntas sobre latencia de red, MTU, handshakes TLS y transporte TCP son habituales en entrevistas de ingeniería en empresas tecnológicas líderes."
      >
        <p>
          En entrevistas de diseño de sistemas (System Design Interviews) para roles de software engineer senior o backend lead en empresas como Google, Meta o Amazon, es estándar que te pregunten: <em>"¿Qué sucede exactamente desde que escribes google.com en el navegador hasta que ves la página?"</em> o <em>"¿Cómo diseñarías la replicación de datos entre dos regiones con 80 ms de RTT?"</em>.
        </p>
        <p>
          Tener claros los conceptos de este quiz te permite responder con precisión matemática, explicando la encapsulación de cabeceras, la velocidad física de propagación de la luz en la fibra y el impacto del control de flujo TCP en el rendimiento global de la plataforma.
        </p>
      </EngineeringConnection>
    </div>
  );
};
