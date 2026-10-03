import { create } from "zustand";
import { fetchOrders, updateOrderStatus } from "../api/orderApi";
import { canTransitionTo } from "./statuses";
import { createOrder as createOrderRequest } from "../api/orderApi";
import {
  updateOrderDiagnosis,
  assignTechnician as assignTechnicianRequest,
} from "../api/orderApi";


const STATUS = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error",
};

export const useOrderStore = create((set, get) => ({
  orders: [],
  status: STATUS.idle,
  error: null,

  async loadOrders() {
    set({ status: STATUS.loading, error: null });

    try {
      const orders = await fetchOrders();
      set({ orders, status: STATUS.success });
    } catch (error) {
      set({ status: STATUS.error, error: error.message });
    }
  },

  async changeOrderStatus(orderId, nextStatus) {
    const order = get().orders.find((item) => item.id === orderId);

    if (!order) {
      return { success: false, error: "Order topilmadi" };
    }

    if (!canTransitionTo(order.status, nextStatus)) {
      return { success: false, error: `"${order.status}" dan "${nextStatus}" ga o'tib bo'lmaydi` };
    }

    try {
      const updatedOrder = await updateOrderStatus(orderId, nextStatus);
      set((state) => ({
        orders: state.orders.map((item) => (item.id === orderId ? updatedOrder : item)),
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // ... changeOrderStatus'dan keyin:

  async createOrder(data) {
    const order = await createOrderRequest(data);
    set((state) => ({ orders: [...state.orders, order] }));
    return order;
  },

  async updateDiagnosis(orderId, diagnosis) {
    const updatedOrder = await updateOrderDiagnosis(orderId, diagnosis);
    set((state) => ({
      orders: state.orders.map((item) => (item.id === orderId ? updatedOrder : item)),
    }));
  },

  async assignTechnician(orderId, technicianId) {
    const updatedOrder = await assignTechnicianRequest(orderId, technicianId);
    set((state) => ({
      orders: state.orders.map((item) => (item.id === orderId ? updatedOrder : item)),
    }));
  },
  
}));

export { STATUS as ORDER_STORE_STATUS };
