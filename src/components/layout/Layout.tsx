import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { GlobalBackground } from './GlobalBackground';
import { PresentationControls } from './PresentationControls';
import { SectionNavigation } from './SectionNavigation';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
export { cn };

export const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);
  const { 
    presentationMode, 
    togglePresentationMode, 
    goToNext, 
    goToPrev 
  } = useSectionNavigation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Scroll to top whenever route changes so new slide isn't scrolled down
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrev();
          break;
        case 'f':
        case 'F':
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
          break;
        case 'p':
        case 'P':
          togglePresentationMode();
          break;
        case 'Escape':
          if (presentationMode) {
            togglePresentationMode();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode, togglePresentationMode, goToNext, goToPrev]);

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden relative select-none">
      <GlobalBackground />

      {/* Desktop Sidebar */}
      {!presentationMode && (
        <div className="w-72 lg:w-80 flex-shrink-0 z-30 hidden md:block">
          <Sidebar />
        </div>
      )}

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {!presentationMode && mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-80 h-full z-10"
            >
              <Sidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        {!presentationMode && (
          <Topbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        )}

        <main 
          ref={mainRef}
          className={cn(
            "flex-1 overflow-y-auto custom-scrollbar transition-all duration-300",
            presentationMode 
              ? "p-6 lg:p-14 max-w-7xl mx-auto w-full pb-36" 
              : "p-6 sm:p-8 lg:p-10 max-w-[1500px] mx-auto w-full pb-20"
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex flex-col min-h-full"
            >
              <div className="flex-1">
                {children}
              </div>
              <SectionNavigation />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Floating controls in presentation mode */}
        {presentationMode && <PresentationControls />}
      </div>
    </div>
  );
};
