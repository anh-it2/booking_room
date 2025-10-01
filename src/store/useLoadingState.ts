import { create } from "zustand";

interface LoadingState{
    loading: boolean,
    setLoading: (state: boolean) => void
}

export const useLoadingState = create<LoadingState>((set) => ({
    loading: false,
    setLoading: (state: boolean) => set({loading: state})
}))