import { create } from "zustand";

interface TemporalCameraStore {
    selectedImages: string[];

    addSelectedImage: (image: string) => void;
    clearImages: () => void;
}

export const useCameraStore = create<TemporalCameraStore>()((set) => ({
    selectedImages: [],

    addSelectedImage: (image) => {
        set((state) => ({ selectedImages: [...state.selectedImages, image] })); //esto es para que no se pierda el estado anterior de las imágenes esparciendo el array anterior y añadiendo la nueva imagen
    },

    clearImages: () => set({ selectedImages: [] })
}))