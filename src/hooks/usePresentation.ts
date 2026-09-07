import { create } from 'zustand';
import { SECTIONS } from '../data/sections';

interface PresentationState {
  presentationMode: boolean;
  togglePresentationMode: () => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

export const usePresentation = create<PresentationState>((set, get) => ({
  presentationMode: false,
  togglePresentationMode: () => set((state) => ({ presentationMode: !state.presentationMode })),
  currentIndex: 0,
  setCurrentIndex: (index) => set({ currentIndex: index }),
  nextSlide: () => {
    const { currentIndex } = get();
    if (currentIndex < SECTIONS.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },
  prevSlide: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  }
}));
