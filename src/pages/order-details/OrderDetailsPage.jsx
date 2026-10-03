import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useOrderStore } from "@/entities/order/model/useOrderStore";
import { useCustomerStore } from "@/entities/customer/model/useCustomerStore";
import { useVehicleStore } from "@/entities/vehicle/model/useVehicleStore";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { ROLES } from "@/entities/user/model/roles";
import { getAvailableNextStatuses, ORDER_STATUS_LABELS } from "@/entities/order/model/statuses";
import { fetchOrderItemsByOrderId, createOrderItem } from "@/entities/order/api/orderApi";

import { isDangerousStatus } from "@/entities/order/model/statuses";
import ConfirmDialog from "@/shared/ui/ConfirmDialog/ConfirmDialog";

import StatusBadge from "@/entities/order/ui/StatusBadge";
import styles from "./OrderDetailsPage.module.scss";
import { calculateOrderTotal } from "@/entities/order/model/pricing";

function DiagnosisEditor({ initialValue, onSave }) {
  const [draft, setDraft] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    await onSave(draft);
    setIsSaving(false);
  }

  return (
    <>
      <textarea
        className={styles.textarea}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Usta topgan muammoni yozing..."
      />
      <button
        type="button"
        className={styles.saveButton}
        onClick={handleSave}
        disabled={isSaving || draft === initialValue}
      >
        {isSaving ? "Saqlanmoqda..." : "Saqlash"}
      </button>
    </>
  );
}
export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const [confirmingStatus, setConfirmingStatus] = useState(null);
  const orders = useOrderStore((state) => state.orders);
  const loadOrders = useOrderStore((state) => state.loadOrders);
  const changeOrderStatus = useOrderStore((state) => state.changeOrderStatus);
  const updateDiagnosis = useOrderStore((state) => state.updateDiagnosis);
  const assignTechnician = useOrderStore((state) => state.assignTechnician);

  const customers = useCustomerStore((state) => state.customers);
  const loadCustomers = useCustomerStore((state) => state.loadCustomers);

  const vehicles = useVehicleStore((state) => state.vehicles);
  const loadVehicles = useVehicleStore((state) => state.loadVehicles);

  const users = useUserStore((state) => state.users);
  const loadUsers = useUserStore((state) => state.loadUsers);

  useEffect(() => {
    loadOrders();
    loadCustomers();
    loadVehicles();
    loadUsers();
  }, [loadOrders, loadCustomers, loadVehicles, loadUsers]);

  const order = orders.find((item) => item.id === orderId);
  const customer = customers.find((item) => item.id === order?.customerId);
  const vehicle = vehicles.find((item) => item.id === order?.vehicleId);
  const technicians = users.filter((user) => user.role === ROLES.technician);

  const [statusError, setStatusError] = useState(null);
  const [pendingStatus, setPendingStatus] = useState(null);

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ type: "labor", name: "", quantity: 1, price: 0 });

  useEffect(() => {
    if (orderId) {
      fetchOrderItemsByOrderId(orderId).then(setItems);
    }
  }, [orderId]);

  // const total = useMemo(
  //   () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
  //   [items],
  // );
  
  const total = useMemo(() => calculateOrderTotal(items), [items]);
  if (!order) {
    return <p>Yuklanmoqda...</p>;
  }

  async function handleStatusChange(nextStatus) {
    setStatusError(null);
    setPendingStatus(nextStatus);
    const result = await changeOrderStatus(order.id, nextStatus);
    if (!result.success) {
      setStatusError(result.error);
    }
    setPendingStatus(null);
  }

  async function handleAddItem(event) {
    event.preventDefault();
    const item = await createOrderItem(order.id, {
      ...newItem,
      quantity: Number(newItem.quantity),
      price: Number(newItem.price),
    });
    setItems([...items, item]);
    setNewItem({ type: "labor", name: "", quantity: 1, price: 0 });
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{order.number}</h1>
        <StatusBadge status={order.status} />
      </div>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Umumiy ma'lumot</h2>
        <div className={styles.infoGrid}>
          <div>
            <p className={styles.infoLabel}>Mijoz</p>
            <p className={styles.infoValue}>{customer?.fullName ?? "—"}</p>
          </div>
          <div>
            <p className={styles.infoLabel}>Mashina</p>
            <p className={styles.infoValue}>
              {vehicle ? `${vehicle.make} ${vehicle.model} · ${vehicle.plateNumber}` : "—"}
            </p>
          </div>
          <div>
            <p className={styles.infoLabel}>Probeg</p>
            <p className={styles.infoValue}>{order.mileage} km</p>
          </div>
          <div>
            <p className={styles.infoLabel}>Mijoz shikoyati</p>
            <p className={styles.infoValue}>{order.complaint}</p>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Status</h2>

        {statusError && <p className={styles.error}>{statusError}</p>}
        <div className={styles.statusActions}>
          {getAvailableNextStatuses(order.status).map((nextStatus) => (
            <button
              key={nextStatus}
              type="button"
              className={styles.statusButton}
              onClick={() => {
                if (isDangerousStatus(nextStatus)) {
                  setConfirmingStatus(nextStatus);
                } else {
                  handleStatusChange(nextStatus);
                }
              }}
              disabled={pendingStatus !== null}
            >
              {pendingStatus === nextStatus ? "..." : ORDER_STATUS_LABELS[nextStatus]}
            </button>
          ))}
          {getAvailableNextStatuses(order.status).length === 0 && (
            <p>Bu order yakunlangan, status o'zgartirib bo'lmaydi.</p>
          )}
        </div>

        <ConfirmDialog
          isOpen={confirmingStatus !== null}
          title={`Orderni "${confirmingStatus ? ORDER_STATUS_LABELS[confirmingStatus] : ""}" qilib belgilaysizmi?`}
          description="Bu amalni ortga qaytarib bo'lmaydi."
          confirmLabel="Ha, davom etish"
          cancelLabel="Yo'q"
          onCancel={() => setConfirmingStatus(null)}
          onConfirm={() => {
            handleStatusChange(confirmingStatus);
            setConfirmingStatus(null);
          }}
        />
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Usta</h2>
        <select
          className={styles.select}
          value={order.technicianId ?? ""}
          onChange={(event) => assignTechnician(order.id, event.target.value || null)}
        >
          <option value="">Biriktirilmagan</option>
          {technicians.map((technician) => (
            <option key={technician.id} value={technician.id}>
              {technician.fullName}
            </option>
          ))}
        </select>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Diagnostika</h2>
        <DiagnosisEditor
          key={order.id}
          initialValue={order.diagnosis}
          onSave={(value) => updateDiagnosis(order.id, value)}
        />
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Ishlar va qismlar</h2>

        {items.length > 0 && (
          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th>Nomi</th>
                <th>Turi</th>
                <th>Soni</th>
                <th>Narxi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type === "part" ? "Qism" : "Ish"}</td>
                  <td>{item.quantity}</td>
                  <td>{(item.quantity * item.price).toLocaleString("uz-UZ")} so'm</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className={styles.itemsTotal}>
          <span>Jami</span>
          <span>{total.toLocaleString("uz-UZ")} so'm</span>
        </div>

        <form className={styles.itemForm} onSubmit={handleAddItem}>
          <select
            className={styles.select}
            value={newItem.type}
            onChange={(event) => setNewItem({ ...newItem, type: event.target.value })}
          >
            <option value="labor">Ish</option>
            <option value="part">Qism</option>
          </select>
          <input
            className={styles.textarea}
            style={{ minHeight: "auto" }}
            placeholder="Nomi"
            value={newItem.name}
            onChange={(event) => setNewItem({ ...newItem, name: event.target.value })}
            required
          />
          <input
            type="number"
            className={styles.select}
            placeholder="Soni"
            value={newItem.quantity}
            onChange={(event) => setNewItem({ ...newItem, quantity: event.target.value })}
            required
          />
          <input
            type="number"
            className={styles.select}
            placeholder="Narxi"
            value={newItem.price}
            onChange={(event) => setNewItem({ ...newItem, price: event.target.value })}
            required
          />
          <button type="submit" className={styles.saveButton}>
            Qo'shish
          </button>
        </form>
      </section>
    </div>
  );
}
