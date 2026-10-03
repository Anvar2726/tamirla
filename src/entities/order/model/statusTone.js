import { ORDER_STATUS } from "./statuses";

export const ORDER_STATUS_TONE = {
  [ORDER_STATUS.received]: "neutral",
  [ORDER_STATUS.diagnosing]: "info",
  [ORDER_STATUS.awaitingApproval]: "warning",
  [ORDER_STATUS.inRepair]: "info",
  [ORDER_STATUS.waitingForParts]: "warning",
  [ORDER_STATUS.ready]: "success",
  [ORDER_STATUS.delivered]: "success",
  [ORDER_STATUS.rejected]: "danger",
  [ORDER_STATUS.cancelled]: "neutral",
};
