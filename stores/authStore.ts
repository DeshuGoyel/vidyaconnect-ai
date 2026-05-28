import { create } from "zustand";
import { UserRole } from "@/types/domain";

type AuthState = {
  role: UserRole | null;
  phone: string;
  name: string;
  setRole: (role: UserRole) => void;
  setPhone: (phone: string) => void;
  setName: (name: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  phone: "",
  name: "",
  setRole: (role) => set({ role }),
  setPhone: (phone) => set({ phone }),
  setName: (name) => set({ name })
}));
