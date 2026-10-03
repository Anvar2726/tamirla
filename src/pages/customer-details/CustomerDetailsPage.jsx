import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCustomerStore } from "@/entities/customer/model/useCustomerStore";
import { useVehicleStore } from "@/entities/vehicle/model/useVehicleStore";
import { useOrderStore } from "@/entities/order/model/useOrderStore";
import StatusBadge from "@/entities/order/ui/StatusBadge";
import { ROUTES } from "@/shared/config/routes";
import styles from "./CustomerDetailsPage.module.scss";

export default function CustomerDetailsPage() {
  const { customerId } = useParams();

  const customers = useCustomerStore((state) => state.customers);
  const loadCustomers = useCustomerStore((state) => state.loadCustomers);

  const vehicles = useVehicleStore((state) => state.vehicles);
  const loadVehicles = useVehicleStore((state) => state.loadVehicles);

  const orders = useOrderStore((state) => state.orders);
  const loadOrders = useOrderStore((state) => state.loadOrders);

  useEffect(() => {
    loadCustomers();
    loadVehicles();
    loadOrders();
  }, [loadCustomers, loadVehicles, loadOrders]);

  const customer = customers.find((item) => item.id === customerId);
  const customerVehicles = vehicles.filter((item) => item.customerId === customerId);
  const customerOrders = orders.filter((item) => item.customerId === customerId);

  if (!customer) {
    return <p>Yuklanmoqda...</p>;
  }

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.title}>{customer.fullName}</h1>
        <p className={styles.subtitle}>{customer.phone}</p>
      </div>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Mashinalari</h2>
        {customerVehicles.length === 0 ? (
          <p className={styles.empty}>Hali mashina qo'shilmagan.</p>
        ) : (
          <ul className={styles.list}>
            {customerVehicles.map((vehicle) => (
              <li key={vehicle.id} className={styles.listItem}>
                <span>
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </span>
                <span>{vehicle.plateNumber}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Order tarixi</h2>
        {customerOrders.length === 0 ? (
          <p className={styles.empty}>Hali order yo'q.</p>
        ) : (
          <ul className={styles.list}>
            {customerOrders.map((order) => (
              <li key={order.id} className={styles.listItem}>
                <Link
                  to={ROUTES.orderDetails.replace(":orderId", order.id)}
                  className={styles.itemLink}
                >
                  {order.number}
                </Link>
                <StatusBadge status={order.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
