import { create } from "zustand";

interface ImageUploadModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useImageUploadModal = create<ImageUploadModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
