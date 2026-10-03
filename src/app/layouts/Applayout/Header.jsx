// import { Link } from "react-router-dom";
// import { ROUTES } from "@/shared/config/routes";
// import styles from "./Header.module.scss";

// export default function Header() {
//   return (
//     <header className={styles.header}>
//       <Link to={ROUTES.orderCreate} className={styles.newOrderLink}>
//         Yangi order
//       </Link>
//     </header>
//   );
// }
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import RoleSwitcher from "@/features/role-switch/RoleSwitcher";
import ThemeToggle from "@/features/theme-toggle/ThemeToggle";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <RoleSwitcher />
      <ThemeToggle />
      <Link to={ROUTES.orderCreate} className={styles.newOrderLink}>
        Yangi order
      </Link>
    </header>
  );
}