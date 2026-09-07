import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../layout/Layout';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full';
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '2xl'
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-6xl w-full'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              "relative w-full glass-panel bg-white/98 border border-slate-200/90 p-6 sm:p-8 shadow-2xl z-10 flex flex-col max-h-[90vh] rounded-2xl",
              maxWidthClasses[maxWidth]
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200/80 mb-6 flex-shrink-0">
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-slate-600 text-base sm:text-lg mt-1 font-normal">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Cerrar modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
