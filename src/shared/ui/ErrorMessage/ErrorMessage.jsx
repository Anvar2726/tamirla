import styles from "./ErrorMessage.module.scss";

export default function ErrorMessage({ message = "Xatolik yuz berdi.", onRetry }) {
  return (
    <div className={styles.wrapper} role="alert">
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retryButton} onClick={onRetry}>
          Qayta urinish
        </button>
      )}
    </div>
  );
}
