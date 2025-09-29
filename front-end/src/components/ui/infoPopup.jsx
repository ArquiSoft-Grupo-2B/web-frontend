// src/components/ui/InfoPopup.jsx
import styles from "../../styles/InfoPopup.module.css";
import Button from "./button.jsx";

export default function InfoPopup({ message, type = "info", onClose }) {
  return (
    <div className={`${styles.popup} ${styles[type]}`}>
      <p className={styles.message}>{message}</p>
      <Button variant="primary" size="sm" onClick={onClose}>
        Cerrar
      </Button>
    </div>
  );
}
