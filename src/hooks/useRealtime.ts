"use client";

export function useRealtime(channel: string) {
  return {
    channel,
    connected: true,
    unreadCount: 0
  };
}
