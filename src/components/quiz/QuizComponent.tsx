import { useState } from 'react';
import { QUESTIONS } from '../../data/questions';
import { Card } from '../ui/Card';
import { cn } from '../layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, BookOpen } from 'lucide-react';

export const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = QUESTIONS[currentQuestion];

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setIsSubmitted(true);
    if (selectedAnswer === question.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

    if (showResults) {
      const percentage = Math.round((score / QUESTIONS.length) * 100);
      return (
        <Card glowColor="cyan" className="max-w-2xl mx-auto flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white border-2 border-slate-200 shadow-2xl rounded-2xl">
          <div className="p-5 rounded-2xl bg-sky-100 text-sky-700 mb-5 shadow-inner">
            <Award size={56} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-2">Evaluación Finalizada</h2>
          <p className="text-slate-500 text-sm font-mono font-bold mb-6">Examen de Medios de Transmisión para Ingeniería de Software</p>
          
          <div className="text-6xl sm:text-7xl font-black text-sky-600 font-mono mb-3">
            {score} <span className="text-3xl text-slate-400">/ {QUESTIONS.length}</span>
          </div>
          <div className="text-2xl font-mono text-emerald-600 font-black mb-6 bg-emerald-50 px-6 py-2 rounded-xl border-2 border-emerald-200">
            Calificación: {percentage}%
          </div>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-lg mb-8 font-sans font-medium">
            {percentage >= 85 ? '¡Nivel Experto! Dominas con rigor los principios físicos, de telecomunicaciones y su implicación directa en la arquitectura de software.' :
             percentage >= 60 ? 'Buen dominio técnico. Comprendes la mayoría de conceptos pero te recomendamos repasar los detalles de radiofrecuencia, coaxiales y conectores.' :
             'Es necesario repasar los conceptos fundamentales de la Capa Física y el modelo OSI antes de tu presentación universitaria.'}
          </p>

          <button 
            onClick={resetQuiz}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-mono font-black text-sm sm:text-base rounded-xl transition-all shadow-lg"
          >
            <RotateCcw size={18} />
            Reiniciar Evaluación
          </button>
        </Card>
      );
    }

    return (
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-5">
        {/* Progress Bar & Counter */}
        <div className="flex justify-between items-center text-sm font-mono text-slate-600">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-sky-50 text-sky-800 border-2 border-sky-300 font-black text-xs">
              {question.category}
            </span>
            <span className="font-bold">Pregunta {currentQuestion + 1} de {QUESTIONS.length}</span>
          </div>
          <span className="text-slate-900 font-black">Aciertos: {score}</span>
        </div>

        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
          <div
            className="bg-sky-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <Card 
          glowColor={isSubmitted ? (selectedAnswer === question.correctAnswer ? 'green' : 'red') : 'cyan'}
          className="p-6 sm:p-10 bg-white border-2 border-slate-200 shadow-xl rounded-2xl"
        >
          <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 mb-6 leading-relaxed">
            {question.text}
          </h3>

          <div className="space-y-3.5 mb-6">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === question.correctAnswer;
              
              let optionState = "default";
              if (isSubmitted) {
                if (isCorrect) optionState = "correct";
                else if (isSelected && !isCorrect) optionState = "incorrect";
                else optionState = "disabled";
              } else if (isSelected) {
                optionState = "selected";
              }

              const stateClasses = {
                default: "border-2 border-slate-200 bg-slate-50 hover:border-sky-400 hover:bg-sky-50/50 text-slate-800 cursor-pointer font-medium",
                selected: "border-2 border-sky-600 bg-sky-50 text-sky-950 font-black cursor-pointer shadow-md ring-2 ring-sky-400/40",
                correct: "border-2 border-emerald-600 bg-emerald-50 text-emerald-950 font-black ring-2 ring-emerald-400/30",
                incorrect: "border-2 border-red-600 bg-red-50 text-red-950 font-black ring-2 ring-red-400/30",
                disabled: "border-slate-200 bg-slate-100 opacity-40 cursor-not-allowed text-slate-400"
              };

              return (
                <div 
                  key={idx}
                  onClick={() => !isSubmitted && setSelectedAnswer(idx)}
                  className={cn(
                    "p-4 rounded-xl transition-all duration-150 flex items-center justify-between text-sm sm:text-base font-sans",
                    stateClasses[optionState as keyof typeof stateClasses]
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-mono text-xs font-black shadow-sm">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isSubmitted && isCorrect && <CheckCircle2 className="text-emerald-600 flex-shrink-0 ml-3" size={22} />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="text-red-600 flex-shrink-0 ml-3" size={22} />}
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-5 bg-sky-50/90 border-2 border-sky-200 rounded-2xl shadow-sm"
              >
                <h4 className="font-mono text-xs uppercase font-black text-sky-900 mb-1.5 flex items-center gap-2">
                  <BookOpen size={16} className="text-sky-700" />
                  Fundamento y Explicación Técnica:
                </h4>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-sans font-medium">
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end pt-5 border-t-2 border-slate-100">
            {!isSubmitted ? (
              <button 
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-sm sm:text-base font-mono font-black disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
              >
                Verificar Respuesta
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-mono text-sm sm:text-base font-black rounded-xl transition-all shadow-md"
              >
                {currentQuestion < QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados Finales'}
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </Card>
      </div>
    );
};
