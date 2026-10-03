import { describe, it, expect } from "vitest";
import { isOrderDelayed } from "./delayed";
import { ORDER_STATUS } from "./statuses";

function hoursAgo(hours) {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

describe("isOrderDelayed", () => {
  it("24 soatdan kam vaqt o'tgan faol orderni kechikkan demaydi", () => {
    const order = { status: ORDER_STATUS.diagnosing, updatedAt: hoursAgo(5) };
    expect(isOrderDelayed(order)).toBe(false);
  });

  it("24 soatdan ko'p vaqt o'tgan faol orderni kechikkan deb topadi", () => {
    const order = { status: ORDER_STATUS.diagnosing, updatedAt: hoursAgo(30) };
    expect(isOrderDelayed(order)).toBe(true);
  });

  it("topshirilgan orderni kechikkan demaydi", () => {
    const order = { status: ORDER_STATUS.delivered, updatedAt: hoursAgo(100) };
    expect(isOrderDelayed(order)).toBe(false);
  });
});
