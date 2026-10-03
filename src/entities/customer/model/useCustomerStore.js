import { create } from "zustand";
import { fetchCustomers } from "../api/customerApi";
import { createCustomer as createCustomerRequest } from "../api/customerApi";

export const useCustomerStore = create((set) => ({
  customers: [],
  status: "idle",
  error: null,

  async loadCustomers() {
    set({ status: "loading", error: null });

    try {
      const customers = await fetchCustomers();
      set({ customers, status: "success" });
    } catch (error) {
      set({ status: "error", error: error.message });
    }
  },
  // ... mavjud kod ichida, loadCustomers'dan keyin:

  async createCustomer(data) {
    const customer = await createCustomerRequest(data);
    set((state) => ({ customers: [...state.customers, customer] }));
    return customer;
  },
}));
