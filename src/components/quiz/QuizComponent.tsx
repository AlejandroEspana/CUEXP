import { useState } from 'react';
import { QUESTIONS } from '../../data/questions';
import { Card } from '../ui/Card';
import { cn } from '../layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

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
    return (
      <Card glowColor="cyan" className="max-w-2xl mx-auto flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-3xl font-display text-white mb-6">Resultados</h2>
        <div className="text-6xl font-bold text-cyan mb-8">
          {score} <span className="text-3xl text-slate-500">/ {QUESTIONS.length}</span>
        </div>
        <p className="text-slate-300 mb-8">
          {score === QUESTIONS.length ? '¡Excelente! Tienes un dominio perfecto de los medios de transmisión.' :
           score >= QUESTIONS.length / 2 ? 'Buen trabajo. Tienes conocimientos sólidos, aunque puedes repasar algunos conceptos.' :
           'Necesitas estudiar más los conceptos básicos de infraestructura de red.'}
        </p>
        <button 
          onClick={resetQuiz}
          className="flex items-center gap-2 px-6 py-3 bg-cyan text-dark-900 font-bold rounded-lg hover:bg-cyan/90 transition-colors"
        >
          <RotateCcw size={20} />
          Intentar de nuevo
        </button>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="mb-6 flex justify-between items-center text-sm font-mono text-slate-400">
        <span>Pregunta {currentQuestion + 1} de {QUESTIONS.length}</span>
        <span>Puntuación: {score}</span>
      </div>

      <Card glowColor={isSubmitted ? (selectedAnswer === question.correctAnswer ? 'green' : 'red') : 'cyan'}>
        <h3 className="text-xl text-white mb-6 leading-relaxed">
          {question.text}
        </h3>

        <div className="space-y-3 mb-8">
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
              default: "border-dark-600 bg-dark-800 hover:border-cyan/50 hover:bg-dark-700 cursor-pointer",
              selected: "border-cyan bg-cyan/10 text-cyan cursor-pointer",
              correct: "border-green bg-green/10 text-green border-2",
              incorrect: "border-red bg-red/10 text-red",
              disabled: "border-dark-700 bg-dark-800/50 opacity-50 cursor-not-allowed"
            };

            return (
              <div 
                key={idx}
                onClick={() => !isSubmitted && setSelectedAnswer(idx)}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200 flex items-center justify-between",
                  stateClasses[optionState as keyof typeof stateClasses]
                )}
              >
                <span>{option}</span>
                {isSubmitted && isCorrect && <CheckCircle2 className="text-green" />}
                {isSubmitted && isSelected && !isCorrect && <XCircle className="text-red" />}
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8 p-4 bg-dark-900 border border-dark-700 rounded-lg"
            >
              <h4 className="font-bold text-slate-300 mb-2">Explicación:</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{question.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end">
          {!isSubmitted ? (
            <button 
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Verificar
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-cyan text-dark-900 font-bold rounded hover:bg-cyan/90 transition-colors"
            >
              {currentQuestion < QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};
