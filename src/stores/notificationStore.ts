import { create } from "zustand";

interface NotificationState {
  unread: number;
  setUnread: (count: number) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  unread: 0,
  setUnread: (unread) => set({ unread })
}));
