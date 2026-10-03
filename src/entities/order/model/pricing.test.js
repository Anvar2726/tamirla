import { describe, it, expect } from "vitest";
import { calculateOrderTotal } from "./pricing";

describe("calculateOrderTotal", () => {
  it("bir nechta qatorning umumiy narxini hisoblaydi", () => {
    const items = [
      { quantity: 1, price: 450000 },
      { quantity: 2, price: 50000 },
    ];
    expect(calculateOrderTotal(items)).toBe(550000);
  });

  it("bo'sh ro'yxat uchun 0 qaytaradi", () => {
    expect(calculateOrderTotal([])).toBe(0);
  });
});
