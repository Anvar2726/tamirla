import styles from "./Spinner.module.scss";

export default function Spinner({ label = "Yuklanmoqda..." }) {
  return (
    <div className={styles.wrapper} role="status">
      <div className={styles.spinner} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
