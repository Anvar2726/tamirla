import { mockRequest } from "@/shared/lib/mock-request";
import { mockCustomers } from "./mock-data";

export function fetchCustomers() {
  return mockRequest([...mockCustomers]);
}

export function fetchCustomerById(customerId) {
  const customer = mockCustomers.find((item) => item.id === customerId);
  return mockRequest(customer ?? null);
}

let nextCustomerSeq = mockCustomers.length + 1;

export function createCustomer({ fullName, phone }) {
  const customer = { id: `cust-${nextCustomerSeq++}`, fullName, phone };
  mockCustomers.push(customer);
  return mockRequest({ ...customer });
}