import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useOrderStore } from "@/entities/order/model/useOrderStore";
import { ORDER_STATUS, ORDER_STATUS_LABELS } from "@/entities/order/model/statuses";
import { isOrderDelayed } from "@/entities/order/model/delayed";
import { ROUTES } from "@/shared/config/routes";
import Spinner from "@/shared/ui/Spinner/Spinner";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";

import styles from "./DashboardPage.module.scss";

export default function DashboardPage() {
  const orders = useOrderStore((state) => state.orders);
  const ordersStatus = useOrderStore((state) => state.status);
  const loadOrders = useOrderStore((state) => state.loadOrders);
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const statusCounts = useMemo(() => {
    const counts = {};
    for (const status of Object.values(ORDER_STATUS)) {
      counts[status] = orders.filter((order) => order.status === status).length;
    }
    return counts;
  }, [orders]);

  const delayedOrders = useMemo(() => orders.filter(isOrderDelayed), [orders]);

  if (ordersStatus === "loading" || ordersStatus === "idle") {
    return <Spinner label="Dashboard yuklanmoqda..." />;
  }

  if (ordersStatus === "error") {
    return <ErrorMessage message="Ma'lumotlarni yuklab bo'lmadi." onRetry={loadOrders} />;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.statusGrid}>
        {Object.values(ORDER_STATUS).map((status) => (
          <div key={status} className={styles.statusCard}>
            <span className={styles.statusCount}>{statusCounts[status]}</span>
            <span className={styles.statusLabel}>{ORDER_STATUS_LABELS[status]}</span>
          </div>
        ))}
      </div>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Kechikkan orderlar (24 soatdan ortiq)</h2>
        {delayedOrders.length === 0 ? (
          <p className={styles.empty}>Hozircha kechikkan order yo'q.</p>
        ) : (
          <ul className={styles.list}>
            {delayedOrders.map((order) => (
              <li key={order.id} className={styles.listItem}>
                <Link
                  to={ROUTES.orderDetails.replace(":orderId", order.id)}
                  className={styles.itemLink}
                >
                  {order.number}
                </Link>
                <span>{ORDER_STATUS_LABELS[order.status]}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
