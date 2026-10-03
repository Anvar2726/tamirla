import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ROLES } from "./roles";

export const useRoleStore = create(
  persist(
    (set) => ({
      role: ROLES.manager,
      setRole: (role) => set({ role }),
    }),
    { name: "role" },
  ),
);
