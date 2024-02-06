import { Food, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "ADDRESS_MODAL"
  | "LOGOUT_MODAL"
  | "CONFIRM_ORDER_MODAL"
  | "CANCEL_ORDER_MODAL"
  | "DELETE_FOOD_MODAL"
  | "DELETE_REVIEW_MODAL"
  | "EDIT_REVIEW_MODAL"
  | "DELIVER_ORDER_MODAL"
  | "AUTH_MODAL"
  | "ORDER_MODAL"

interface ModalData {
  user?: User;
  orderId?: string;
  foodId?: string;
  reviewId?: string;
  redirectUrl?: string;
  phone?: string;
  address?: string;
  food?: Food;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
