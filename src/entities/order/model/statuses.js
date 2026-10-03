export const ORDER_STATUS = {
  received: "received",
  diagnosing: "diagnosing",
  awaitingApproval: "awaiting_approval",
  inRepair: "in_repair",
  waitingForParts: "waiting_for_parts",
  ready: "ready",
  delivered: "delivered",
  rejected: "rejected",
  cancelled: "cancelled",
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.received]: "Qabul qilindi",
  [ORDER_STATUS.diagnosing]: "Diagnostika",
  [ORDER_STATUS.awaitingApproval]: "Tasdiq kutilmoqda",
  [ORDER_STATUS.inRepair]: "Ta'mirda",
  [ORDER_STATUS.waitingForParts]: "Ehtiyot qism kutilmoqda",
  [ORDER_STATUS.ready]: "Tayyor",
  [ORDER_STATUS.delivered]: "Topshirildi",
  [ORDER_STATUS.rejected]: "Rad etildi",
  [ORDER_STATUS.cancelled]: "Bekor qilindi",
};

// Kalit — hozirgi status, qiymat — o'sha statusdan borish mumkin bo'lgan statuslar ro'yxati
const ORDER_STATUS_TRANSITIONS = {
  [ORDER_STATUS.received]: [ORDER_STATUS.diagnosing, ORDER_STATUS.cancelled],
 
  [ORDER_STATUS.diagnosing]: [ORDER_STATUS.awaitingApproval, ORDER_STATUS.cancelled],
  [ORDER_STATUS.awaitingApproval]: [
    ORDER_STATUS.inRepair,
    ORDER_STATUS.rejected,
    ORDER_STATUS.cancelled,
  ],
  [ORDER_STATUS.inRepair]: [
    ORDER_STATUS.waitingForParts,
    ORDER_STATUS.awaitingApproval,
    ORDER_STATUS.ready,
    ORDER_STATUS.cancelled,
  ],
  [ORDER_STATUS.waitingForParts]: [ORDER_STATUS.inRepair, ORDER_STATUS.cancelled],
  [ORDER_STATUS.ready]: [ORDER_STATUS.delivered],
  [ORDER_STATUS.delivered]: [],
  [ORDER_STATUS.rejected]: [],
  [ORDER_STATUS.cancelled]: [],
};

export function getAvailableNextStatuses(currentStatus) {
  return ORDER_STATUS_TRANSITIONS[currentStatus] ?? [];
}

export function canTransitionTo(currentStatus, nextStatus) {
  return getAvailableNextStatuses(currentStatus).includes(nextStatus);
}

const DANGEROUS_STATUSES = [ORDER_STATUS.cancelled, ORDER_STATUS.rejected];

export function isDangerousStatus(status) {
  return DANGEROUS_STATUSES.includes(status);
}
