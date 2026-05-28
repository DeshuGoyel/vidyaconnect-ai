import { create } from "zustand";

type UiState = {
  language: "en" | "hi";
  setLanguage: (language: "en" | "hi") => void;
};

export const useUiStore = create<UiState>((set) => ({
  language: "en",
  setLanguage: (language) => set({ language })
}));
