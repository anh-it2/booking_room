import { create } from "zustand"

type Notify = {
    notify: any,
    setNotify: (data: any) => void
}

export const useNotifyState = create<Notify>((set) => ({
    notify: [],
    setNotify: (data: Notify) => set({notify: data})
}))