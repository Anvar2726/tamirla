import { mockRequest } from "@/shared/lib/mock-request";
import { mockOrders, mockOrderItems } from "./mock-data";
import { ORDER_STATUS } from "../model/statuses";
export function fetchOrders() {
  return mockRequest([...mockOrders]);
}

export function fetchOrderById(orderId) {
  const order = mockOrders.find((item) => item.id === orderId);
  return mockRequest(order ?? null);
}

export function fetchOrderItemsByOrderId(orderId) {
  const items = mockOrderItems.filter((item) => item.orderId === orderId);
  return mockRequest(items);
}

export function updateOrderStatus(orderId, nextStatus) {
  const order = mockOrders.find((item) => item.id === orderId);

  if (!order) {
    return Promise.reject(new Error("Order topilmadi"));
  }

  order.status = nextStatus;
  order.updatedAt = new Date().toISOString();

  return mockRequest({ ...order });
}

let nextOrderSeq = mockOrders.length + 1;

export function createOrder({ customerId, vehicleId, mileage, complaint }) {
  const now = new Date().toISOString();
  const order = {
    id: `ord-${Date.now()}`,
    number: `ORD-${String(nextOrderSeq++).padStart(4, "0")}`,
    customerId,
    vehicleId,
    technicianId: null,
    status: ORDER_STATUS.received,
    mileage,
    complaint,
    diagnosis: "",
    createdAt: now,
    updatedAt: now,
  };
  mockOrders.push(order);
  return mockRequest({ ...order });
}

export function updateOrderDiagnosis(orderId, diagnosis) {
  const order = mockOrders.find((item) => item.id === orderId);

  if (!order) {
    return Promise.reject(new Error("Order topilmadi"));
  }

  order.diagnosis = diagnosis;
  order.updatedAt = new Date().toISOString();
  return mockRequest({ ...order });
}

export function assignTechnician(orderId, technicianId) {
  const order = mockOrders.find((item) => item.id === orderId);

  if (!order) {
    return Promise.reject(new Error("Order topilmadi"));
  }

  order.technicianId = technicianId;
  order.updatedAt = new Date().toISOString();
  return mockRequest({ ...order });
}

let nextItemSeq = mockOrderItems.length + 1;

export function createOrderItem(orderId, { type, name, quantity, price }) {
  const item = { id: `item-${nextItemSeq++}`, orderId, type, name, quantity, price };
  mockOrderItems.push(item);
  return mockRequest({ ...item });
}

