import { mockRequest } from "@/shared/lib/mock-request";
import { mockUsers } from "./mock-data";

export function fetchUsers() {
  return mockRequest([...mockUsers]);
}
