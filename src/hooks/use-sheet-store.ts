import { create } from "zustand";

export type SheetType = "sidebar" | "cart"

interface SheetStore {
  type: SheetType | null;
  isOpen: boolean;
  onOpen: (type: SheetType) => void;
  onClose: () => void;
}

export const useSheet = create<SheetStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));
