import { create } from "zustand";
import { fetchUsers } from "../api/userApi";

export const useUserStore = create((set) => ({
  users: [],
  status: "idle",
  error: null,

  async loadUsers() {
    set({ status: "loading", error: null });

    try {
      const users = await fetchUsers();
      set({ users, status: "success" });
    } catch (error) {
      set({ status: "error", error: error.message });
    }
  },
}));
