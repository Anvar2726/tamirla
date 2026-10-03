import { ORDER_STATUS } from "../model/statuses";

export const mockOrders = [
  {
    id: "ord-1",
    number: "ORD-0001",
    customerId: "cust-1",
    vehicleId: "veh-1",
    technicianId: null,
    status: ORDER_STATUS.diagnosing,
    mileage: 84000,
    complaint: "Tormoz chiyillayapti",
    diagnosis: "",
    createdAt: "2026-09-18T09:15:00.000Z",
    updatedAt: "2026-09-18T10:00:00.000Z",
  },
  {
    id: "ord-2",
    number: "ORD-0002",
    customerId: "cust-2",
    vehicleId: "veh-2",
    technicianId: null,
    status: ORDER_STATUS.awaitingApproval,
    mileage: 32000,
    complaint: "Motor yoqmayapti",
    diagnosis: "Akkumulyator zaryadsiz",
    createdAt: "2026-09-19T08:00:00.000Z",
    updatedAt: "2026-09-19T09:30:00.000Z",
  },
  {
    id: "ord-3",
    number: "ORD-0003",
    customerId: "cust-3",
    vehicleId: "veh-3",
    technicianId: null,
    status: ORDER_STATUS.received,
    mileage: 51000,
    complaint: "Konditsioner sovutmayapti",
    diagnosis: "",
    createdAt: "2026-09-20T07:45:00.000Z",
    updatedAt: "2026-09-20T07:45:00.000Z",
  },
];

export const mockOrderItems = [
  {
    id: "item-1",
    orderId: "ord-2",
    type: "part",
    name: "Akkumulyator",
    quantity: 1,
    price: 450000,
  },
  {
    id: "item-2",
    orderId: "ord-2",
    type: "labor",
    name: "O'rnatish ishi",
    quantity: 1,
    price: 50000,
  },
];

for (let i = 0; i < 20; i++) {
  mockOrders.push({
    id: `ord-stress-${i}`,
    number: `ORD-STRESS-${i}`,
    customerId: "cust-1",
    vehicleId: "veh-1",
    technicianId: null,
    status: ORDER_STATUS.received,
    mileage: 50000,
    complaint: "Stress test order",
    diagnosis: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}