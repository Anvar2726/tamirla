import { ORDER_STATUS_LABELS } from "../model/statuses";
import { ORDER_STATUS_TONE } from "../model/statusTone";
import styles from "./StatusBadge.module.scss";

export default function StatusBadge({ status }) {
  const tone = ORDER_STATUS_TONE[status] ?? "neutral";
  const label = ORDER_STATUS_LABELS[status] ?? status;

  return (
    <span className={`${styles.badge} ${styles[tone]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}
