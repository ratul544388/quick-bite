import { create } from "zustand";

interface ModalStore {
  isLoading: boolean;
  onLoading: () => void;
  onClose: () => void;
}

export const useLoadingStore = create<ModalStore>((set) => ({
  isLoading: false,
  onLoading: () => set({ isLoading: true }),
  onClose: () => set({ isLoading: false }),
}));
