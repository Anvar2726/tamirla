import { create } from "zustand";
import { fetchVehicles } from "../api/vehicleApi";
import {  createVehicle as createVehicleRequest } from '../api/vehicleApi'


export const useVehicleStore = create((set) => ({
  vehicles: [],
  status: "idle",
  error: null,

  async loadVehicles() {
    set({ status: "loading", error: null });

    try {
      const vehicles = await fetchVehicles();
      set({ vehicles, status: "success" });
    } catch (error) {
      set({ status: "error", error: error.message });
    }
  },
  // ... loadVehicles'dan keyin:
  async createVehicle(data) {
    const vehicle = await createVehicleRequest(data);
    set((state) => ({ vehicles: [...state.vehicles, vehicle] }));
    return vehicle;
  },
}));


