import { create } from "zustand";


type OpenModalState = {
    isOpen: boolean,
    open: () => void,
    close: () => void,
};

export const useOpenModal = create<OpenModalState>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}));