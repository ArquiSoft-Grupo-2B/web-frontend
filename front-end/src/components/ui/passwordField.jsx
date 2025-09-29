import styles from "../../styles/PasswordField.module.css";
import React, { useState } from "react";
import eye_closed from "/icons/eye-closed.svg";
import eye_open from "/icons/eye-open.svg";

export default function PasswordField({ label, testid, value = "", setValue }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.passwordField}>
      {value === "" && <p className={styles.input_label}>{label}</p>}
      <input
        type={showPassword ? "text" : "password"}
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-testid={testid}
      />
      <span className={styles.toggleButton} onClick={togglePasswordVisibility}>
        {showPassword ? (
          <img src={eye_closed} alt="Hide" />
        ) : (
          <img src={eye_open} alt="Show" />
        )}
      </span>
    </div>
  );
}
