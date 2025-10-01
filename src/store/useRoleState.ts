import { create } from "zustand";
import { persist } from "zustand/middleware";

type role = 'USER' | 'ADMIN'
interface RoleState{
    role: role,
    setRole: (value: role) => void
}

export const useRoleState = create<RoleState>()(
  persist(
    (set) => ({
      role: "USER", 
      setRole: (value: role) => set({ role: value }),
    }),
    {
      name: "user-role", 
    }
  )
);