// src/store/index.js
import { createPinia } from 'pinia';

export const store = createPinia();

// Define the store logic inside the store function
export const useAdminStore = store(() => {
  const state = {
    currentSection: null,
  };

  const setCurrentSection = (section) => {
    // Set the current section in the store
    state.currentSection = section;
  };

  return { state, setCurrentSection };
});
