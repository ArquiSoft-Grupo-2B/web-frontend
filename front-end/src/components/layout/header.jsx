// src/components/general/Header.jsx
import styles from "../../styles/Header.module.css";
import Button from "../ui/button.jsx";

export default function Header({ showAuthButtons = true }) {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <img src="../../../icons/logo.svg" alt="Logo" className={styles.logoIcon} />
        </div>
        <span className={styles.logoText}>RunPath</span>
      </div>

      {/* Botones opcionales */}
      {showAuthButtons && (
        <div className={styles.nav}>
            <Button variant="secondary" size="md">Iniciar sesión</Button>
            <Button variant="primary" size="md">Registrarse</Button>            
        </div>
      )}
    </header>
  );
}
