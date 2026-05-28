"use client";

export function useNotifications() {
  return {
    permission: typeof Notification === "undefined" ? "unsupported" : Notification.permission,
    requestPermission: () => Notification.requestPermission()
  };
}
