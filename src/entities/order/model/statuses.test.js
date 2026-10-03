import { describe, it, expect } from "vitest";
import { canTransitionTo, getAvailableNextStatuses, ORDER_STATUS } from "./statuses";

describe("canTransitionTo", () => {
  it("to'g'ri asosiy o'tishga ruxsat beradi", () => {
    expect(canTransitionTo(ORDER_STATUS.received, ORDER_STATUS.diagnosing)).toBe(true);
  });

  it("bosqichlarni sakrab o'tishga ruxsat bermaydi", () => {
    expect(canTransitionTo(ORDER_STATUS.received, ORDER_STATUS.delivered)).toBe(false);
  });

  it("yakunlangan statusdan chiqishga ruxsat bermaydi", () => {
    expect(canTransitionTo(ORDER_STATUS.delivered, ORDER_STATUS.received)).toBe(false);
  });
});

describe("getAvailableNextStatuses", () => {
  it("yakunlangan statuslar uchun bo'sh ro'yxat qaytaradi", () => {
    expect(getAvailableNextStatuses(ORDER_STATUS.delivered)).toEqual([]);
  });

  it("noma'lum status uchun bo'sh ro'yxat qaytaradi", () => {
    expect(getAvailableNextStatuses("not_a_real_status")).toEqual([]);
  });
});
