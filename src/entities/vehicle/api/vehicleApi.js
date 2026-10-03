import { mockRequest } from "@/shared/lib/mock-request";
import { mockVehicles } from "./mock-data";

export function fetchVehicles() {
  return mockRequest([...mockVehicles]);
}

export function fetchVehiclesByCustomerId(customerId) {
  const vehicles = mockVehicles.filter((item) => item.customerId === customerId);
  return mockRequest(vehicles);
}

let nextVehicleSeq = mockVehicles.length + 1;

export function createVehicle({ customerId, make, model, year, plateNumber }) {
  const vehicle = { id: `veh-${nextVehicleSeq++}`, customerId, make, model, year, plateNumber };
  mockVehicles.push(vehicle);
  return mockRequest({ ...vehicle });
}
