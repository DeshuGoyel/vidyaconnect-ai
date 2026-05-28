import { create } from "zustand";
import { UserRole } from "@/types/database";

interface AuthState {
  userId: string | null;
  role: UserRole | null;
  name: string;
  setSession: (value: { userId: string; role: UserRole; name: string }) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  role: null,
  name: "",
  setSession: (value) => set(value),
  clear: () => set({ userId: null, role: null, name: "" })
}));
