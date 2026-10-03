import { NavLink } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import styles from "./Sidebar.module.scss";

const NAV_ITEMS = [
  { to: ROUTES.dashboard, label: "Dashboard" },
  { to: ROUTES.orders, label: "Orders" },
  { to: ROUTES.customers, label: "Customers" },
];

function getLinkClassName({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav aria-label="Asosiy navigatsiya">
        <ul className={styles.list}>
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={getLinkClassName}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
