export function calculateOrderTotal(items) {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
}
