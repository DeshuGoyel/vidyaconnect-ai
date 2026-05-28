import { create } from "zustand";

interface UIState {
  language: "en" | "hi";
  theme: "light" | "dark" | "system";
  setLanguage: (language: "en" | "hi") => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useUIStore = create<UIState>((set) => ({
  language: "en",
  theme: "system",
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme })
}));
