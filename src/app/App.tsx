import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { SECTIONS } from '../data/sections';
import { useEffect } from 'react';
import { usePresentation } from '../hooks/usePresentation';
import { OsiModel, Quiz, T568, FiberOptics, Placeholder } from '../sections';

const PresentationController = () => {
  const { currentIndex, setCurrentIndex, presentationMode, togglePresentationMode } = usePresentation();
  const navigate = useNavigate();
  const location = useLocation();

  // Sync index with route
  useEffect(() => {
    const idx = SECTIONS.findIndex(s => s.path === location.pathname);
    if (idx !== -1 && idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  }, [location.pathname, setCurrentIndex]);

  // Sync route with index
  useEffect(() => {
    const currentSection = SECTIONS[currentIndex];
    if (currentSection && currentSection.path !== location.pathname) {
      navigate(currentSection.path);
    }
  }, [currentIndex, navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!presentationMode) return;
      
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          usePresentation.getState().nextSlide();
          break;
        case 'ArrowLeft':
          usePresentation.getState().prevSlide();
          break;
        case 'f':
        case 'F':
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
          break;
        case 'Escape':
          if (presentationMode) togglePresentationMode();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode, togglePresentationMode]);

  return null;
};

const getComponent = (componentName: string, title: string) => {
  switch (componentName) {
    case 'OsiModel':
      return <OsiModel />;\
    case 'FiberOptics':
      return <FiberOptics />;
    case 'T568':
      return <T568 />;
    default:
      return <Placeholder title={title} />;
  }
};

export const App = () => {
  return (
    <Router>
      <PresentationController />
      <Layout>
        <Routes>
          {SECTIONS.map((section) => (
            <Route 
              key={section.id} 
              path={section.path} 
              element={getComponent(section.component, section.title)} 
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
};



