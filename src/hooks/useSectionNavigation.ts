import { useLocation, useNavigate } from 'react-router-dom';
import { SECTIONS, type SectionData } from '../data/sections';
import { usePresentation } from './usePresentation';

export interface SectionNavigation {
  currentIndex: number;
  currentSection: SectionData;
  prevSection: SectionData | null;
  nextSection: SectionData | null;
  goToNext: () => void;
  goToPrev: () => void;
  goToIndex: (index: number) => void;
  goToPath: (path: string) => void;
  hasNext: boolean;
  hasPrev: boolean;
  totalSections: number;
  presentationMode: boolean;
  togglePresentationMode: () => void;
}

export const useSectionNavigation = (): SectionNavigation => {
  const location = useLocation();
  const navigate = useNavigate();
  const { presentationMode, togglePresentationMode, setCurrentIndex } = usePresentation();

  // Robust path matching
  const foundIndex = SECTIONS.findIndex(s => s.path === location.pathname);
  const currentIndex = foundIndex !== -1 ? foundIndex : 0;
  const currentSection = SECTIONS[currentIndex] || SECTIONS[0];
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;

  const goToNext = () => {
    if (nextSection) {
      setCurrentIndex(currentIndex + 1);
      navigate(nextSection.path);
    }
  };

  const goToPrev = () => {
    if (prevSection) {
      setCurrentIndex(currentIndex - 1);
      navigate(prevSection.path);
    }
  };

  const goToIndex = (index: number) => {
    if (index >= 0 && index < SECTIONS.length) {
      setCurrentIndex(index);
      navigate(SECTIONS[index].path);
    }
  };

  const goToPath = (path: string) => {
    const idx = SECTIONS.findIndex(s => s.path === path);
    if (idx !== -1) {
      setCurrentIndex(idx);
    }
    navigate(path);
  };

  return {
    currentIndex,
    currentSection,
    prevSection,
    nextSection,
    goToNext,
    goToPrev,
    goToIndex,
    goToPath,
    hasNext: Boolean(nextSection),
    hasPrev: Boolean(prevSection),
    totalSections: SECTIONS.length,
    presentationMode,
    togglePresentationMode,
  };
};
