import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerStore } from "@/entities/customer/model/useCustomerStore";
import { useVehicleStore } from "@/entities/vehicle/model/useVehicleStore";
import { useOrderStore } from "@/entities/order/model/useOrderStore";
import { ROUTES } from "@/shared/config/routes";
import styles from "./OrderCreatePage.module.scss";

export default function OrderCreatePage() {
  const navigate = useNavigate();

  const customers = useCustomerStore((state) => state.customers);
  const loadCustomers = useCustomerStore((state) => state.loadCustomers);
  const createCustomer = useCustomerStore((state) => state.createCustomer);

  const vehicles = useVehicleStore((state) => state.vehicles);
  const loadVehicles = useVehicleStore((state) => state.loadVehicles);
  const createVehicle = useVehicleStore((state) => state.createVehicle);

  const createOrder = useOrderStore((state) => state.createOrder);

  useEffect(() => {
    loadCustomers();
    loadVehicles();
  }, [loadCustomers, loadVehicles]);

  const [customerMode, setCustomerMode] = useState("existing");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [newCustomer, setNewCustomer] = useState({ fullName: "", phone: "" });

  const [vehicleMode, setVehicleMode] = useState("existing");
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [newVehicle, setNewVehicle] = useState({ make: "", model: "", year: "", plateNumber: "" });

  const [mileage, setMileage] = useState("");
  const [complaint, setComplaint] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const customerVehicles = vehicles.filter((vehicle) => vehicle.customerId === selectedCustomerId);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      let customerId = selectedCustomerId;

      if (customerMode === "new") {
        const customer = await createCustomer(newCustomer);
        customerId = customer.id;
      }

      let vehicleId = selectedVehicleId;

      if (vehicleMode === "new" || customerMode === "new") {
        const vehicle = await createVehicle({
          customerId,
          ...newVehicle,
          year: Number(newVehicle.year),
        });
        vehicleId = vehicle.id;
      }

      const order = await createOrder({
        customerId,
        vehicleId,
        mileage: Number(mileage),
        complaint,
      });

      navigate(ROUTES.orderDetails.replace(":orderId", order.id));
    } catch (error) {
      setSubmitError(error.message);
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Yangi order</h1>

      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Mijoz</h2>

          <div className={styles.modeSwitch}>
            <label className={styles.modeOption}>
              <input
                type="radio"
                checked={customerMode === "existing"}
                onChange={() => setCustomerMode("existing")}
              />
              Mavjud mijoz
            </label>
            <label className={styles.modeOption}>
              <input
                type="radio"
                checked={customerMode === "new"}
                onChange={() => setCustomerMode("new")}
              />
              Yangi mijoz
            </label>
          </div>

          {customerMode === "existing" ? (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="customer">
                Mijozni tanlang
              </label>
              <select
                id="customer"
                className={styles.select}
                value={selectedCustomerId}
                onChange={(event) => setSelectedCustomerId(event.target.value)}
                required
              >
                <option value="" disabled>
                  Tanlang...
                </option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.fullName} — {customer.phone}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="fullName">
                  Ism familiya
                </label>
                <input
                  id="fullName"
                  className={styles.input}
                  value={newCustomer.fullName}
                  onChange={(event) =>
                    setNewCustomer({ ...newCustomer, fullName: event.target.value })
                  }
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="phone">
                  Telefon
                </label>
                <input
                  id="phone"
                  className={styles.input}
                  value={newCustomer.phone}
                  onChange={(event) =>
                    setNewCustomer({ ...newCustomer, phone: event.target.value })
                  }
                  required
                />
              </div>
            </>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Mashina</h2>

          {customerMode === "existing" && (
            <div className={styles.modeSwitch}>
              <label className={styles.modeOption}>
                <input
                  type="radio"
                  checked={vehicleMode === "existing"}
                  onChange={() => setVehicleMode("existing")}
                  disabled={!selectedCustomerId}
                />
                Mavjud mashina
              </label>
              <label className={styles.modeOption}>
                <input
                  type="radio"
                  checked={vehicleMode === "new"}
                  onChange={() => setVehicleMode("new")}
                />
                Yangi mashina
              </label>
            </div>
          )}

          {customerMode === "existing" && vehicleMode === "existing" ? (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="vehicle">
                Mashinani tanlang
              </label>
              <select
                id="vehicle"
                className={styles.select}
                value={selectedVehicleId}
                onChange={(event) => setSelectedVehicleId(event.target.value)}
                required
                disabled={!selectedCustomerId}
              >
                <option value="" disabled>
                  Tanlang...
                </option>
                {customerVehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.make} {vehicle.model} — {vehicle.plateNumber}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className={styles.grid}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="make">
                  Marka
                </label>
                <input
                  id="make"
                  className={styles.input}
                  value={newVehicle.make}
                  onChange={(event) => setNewVehicle({ ...newVehicle, make: event.target.value })}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="model">
                  Model
                </label>
                <input
                  id="model"
                  className={styles.input}
                  value={newVehicle.model}
                  onChange={(event) => setNewVehicle({ ...newVehicle, model: event.target.value })}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="year">
                  Yil
                </label>
                <input
                  id="year"
                  type="number"
                  className={styles.input}
                  value={newVehicle.year}
                  onChange={(event) => setNewVehicle({ ...newVehicle, year: event.target.value })}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="plateNumber">
                  Davlat raqami
                </label>
                <input
                  id="plateNumber"
                  className={styles.input}
                  value={newVehicle.plateNumber}
                  onChange={(event) =>
                    setNewVehicle({ ...newVehicle, plateNumber: event.target.value })
                  }
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Qabul ma'lumotlari</h2>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="mileage">
              Probeg (km)
            </label>
            <input
              id="mileage"
              type="number"
              className={styles.input}
              value={mileage}
              onChange={(event) => setMileage(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="complaint">
              Mijoz nima deyapti
            </label>
            <textarea
              id="complaint"
              className={styles.textarea}
              value={complaint}
              onChange={(event) => setComplaint(event.target.value)}
              required
            />
          </div>
        </div>

        {submitError && <p className={styles.error}>{submitError}</p>}

        <button type="submit" className={styles.submit} disabled={isSubmitting}>
          {isSubmitting ? "Saqlanmoqda..." : "Orderni ochish"}
        </button>
      </form>
    </div>
  );
}
