"use client";

import { create } from "zustand";

interface UiState {
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: true,
  mobileSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMobileSidebar: () =>
    set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
  closeMobileSidebar: () => set({ mobileSidebarOpen: false }),
}));
