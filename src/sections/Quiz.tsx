import { QuizComponent } from '../components/quiz/QuizComponent';
import { HelpCircle } from 'lucide-react';

export const Quiz = () => {
  return (
    <div className="h-full flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-orange/20 text-orange border border-orange/30">
          <HelpCircle size={28} />
        </div>
        <div>
          <h1 className="text-3xl text-white">Evaluación de Conocimientos</h1>
          <p className="text-slate-400">Comprueba lo que has aprendido sobre infraestructura de red</p>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto pb-8 custom-scrollbar">
        <QuizComponent />
      </div>
    </div>
  );
};
