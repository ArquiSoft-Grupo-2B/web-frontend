// src/components/ui/InfoPopup.jsx
import styles from "../../styles/InfoPopup.module.css";

export default function InfoPopup({ message, type = "info", onClose }) {
  return (
    <div className={`${styles.popup} ${styles[type]}`}>
      <p>{message}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}
