import { ORDER_STATUS } from "./statuses";

const DELAYED_THRESHOLD_HOURS = 24;

const TERMINAL_STATUSES = [ORDER_STATUS.delivered, ORDER_STATUS.rejected, ORDER_STATUS.cancelled];

export function isOrderDelayed(order) {
  if (TERMINAL_STATUSES.includes(order.status)) {
    return false;
  }

  const hoursSinceUpdate = (Date.now() - new Date(order.updatedAt).getTime()) / (1000 * 60 * 60);
  return hoursSinceUpdate > DELAYED_THRESHOLD_HOURS;
}
