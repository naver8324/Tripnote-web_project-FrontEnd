import create from 'zustand';

const useCheckboxStore = create((set) => ({
  ageChecked: false,
  privacyChecked: false,
  termsChecked: false,
  toggleAgeChecked: () => set((state) => ({ ageChecked: !state.ageChecked })),
  togglePrivacyChecked: () =>
    set((state) => ({ privacyChecked: !state.privacyChecked })),
  toggleTermsChecked: () =>
    set((state) => ({ termsChecked: !state.termsChecked })),
  toggleAllChecked: (checked) => {
    set((state) => ({
      ageChecked: checked,
      privacyChecked: checked,
      termsChecked: checked,
    }));
  },
  resetAllChecked: () => {
    set({
      ageChecked: false,
      privacyChecked: false,
      termsChecked: false,
    });
  },
}));

export default useCheckboxStore;
