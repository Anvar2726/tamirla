import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCustomerStore } from "@/entities/customer/model/useCustomerStore";
import { useVehicleStore } from "@/entities/vehicle/model/useVehicleStore";
import { ROUTES } from "@/shared/config/routes";

import Spinner from "@/shared/ui/Spinner/Spinner";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";
import EmptyState from "@/shared/ui/EmptyState/EmptyState";

import styles from "./CustomersPage.module.scss";

export default function CustomersPage() {
  const customers = useCustomerStore((state) => state.customers);
  const customersStatus = useCustomerStore((state) => state.status);
  const loadCustomers = useCustomerStore((state) => state.loadCustomers);

  const vehicles = useVehicleStore((state) => state.vehicles);
  const loadVehicles = useVehicleStore((state) => state.loadVehicles);

  useEffect(() => {
    loadCustomers();
    loadVehicles();
  }, [loadCustomers, loadVehicles]);

    if (customersStatus === "loading" || customersStatus === "idle") {
      return <Spinner label="Mijozlar yuklanmoqda..." />;
    }

    if (customersStatus === "error") {
      return <ErrorMessage message="Mijozlarni yuklab bo'lmadi." onRetry={loadCustomers} />;
    }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Customers</h1>

      {customers.length === 0 ? (
        <EmptyState title="Hali mijozlar yo'q" description="Mijozlar yo'q" />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ism</th>
                <th>Telefon</th>
                <th>Mashinalar soni</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => {
                const vehicleCount = vehicles.filter((v) => v.customerId === customer.id).length;
                const detailsUrl = ROUTES.customerDetails.replace(":customerId", customer.id);

                return (
                  <tr key={customer.id}>
                    <td>
                      <Link to={detailsUrl} className={styles.rowLink}>
                        {customer.fullName}
                      </Link>
                    </td>
                    <td>{customer.phone}</td>
                    <td>{vehicleCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
