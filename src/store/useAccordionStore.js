import create from 'zustand';

const useAccordionStore = create((set) => ({
  isAccordionOpen: false,
  toggleAccordion: () =>
    set((state) => ({ isAccordionOpen: !state.isAccordionOpen })),
}));

export default useAccordionStore;
