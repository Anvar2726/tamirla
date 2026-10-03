import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOrderStore } from "@/entities/order/model/useOrderStore";
import { useCustomerStore } from "@/entities/customer/model/useCustomerStore";
import { useVehicleStore } from "@/entities/vehicle/model/useVehicleStore";
import StatusBadge from "@/entities/order/ui/StatusBadge";
import { ROUTES } from "@/shared/config/routes";

import Spinner from "@/shared/ui/Spinner/Spinner";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";
import EmptyState from "@/shared/ui/EmptyState/EmptyState";

import styles from "./OrdersPage.module.scss";

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.orders);
  const ordersStatus = useOrderStore((state) => state.status);
  const loadOrders = useOrderStore((state) => state.loadOrders);

  const customers = useCustomerStore((state) => state.customers);
  const loadCustomers = useCustomerStore((state) => state.loadCustomers);

  const vehicles = useVehicleStore((state) => state.vehicles);
  const loadVehicles = useVehicleStore((state) => state.loadVehicles);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
    loadCustomers();
    loadVehicles();
  }, [loadOrders, loadCustomers, loadVehicles]);

  if (ordersStatus === "loading" || ordersStatus === "idle") {
    return <Spinner label="Orderlar yuklanmoqda..." />;
  }

  if (ordersStatus === "error") {
    return <ErrorMessage message="Orderlarni yuklab bo'lmadi." onRetry={loadOrders} />;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Orders</h1>

      <div className={styles.card}>
        {orders.length === 0 ? (
          <EmptyState
            title="Hali order yo'q"
            description="Birinchi orderni yaratib, ishni boshlang."
            actionLabel="Yangi order"
            onAction={() => navigate(ROUTES.orderCreate)}
          />
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Mijoz</th>
                  <th>Mashina</th>
                  <th>Muammo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const customer = customers.find((item) => item.id === order.customerId);
                  const vehicle = vehicles.find((item) => item.id === order.vehicleId);
                  const detailsUrl = ROUTES.orderDetails.replace(":orderId", order.id);

                  return (
                    <tr key={order.id}>
                      <td>
                        <Link to={detailsUrl} className={styles.rowLink}>
                          <span className={styles.orderNumber}>{order.number}</span>
                        </Link>
                      </td>
                      <td>{customer?.fullName ?? "—"}</td>
                      <td>
                        {vehicle
                          ? `${vehicle.make} ${vehicle.model} · ${vehicle.plateNumber}`
                          : "—"}
                      </td>
                      <td>{order.complaint}</td>
                      <td>
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
