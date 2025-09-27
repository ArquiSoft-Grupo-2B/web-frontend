import styles from "../../styles/PasswordField.module.css";
import React from "react";
import { useState } from "react";
import eye_closed from "../../assets/eye-closed.svg";
import eye_open from "../../assets/eye-open.svg";


export default function PasswordField({ label, testid}) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.passwordField}>
      {password === "" && <p className={styles.input_label}>{label}</p>}
      <input
        type={showPassword ? "text" : "password"}
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        data-testid={testid}
      />
      <span
        className={styles.toggleButton}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <img src={eye_closed} alt="Hide" /> : <img src={eye_open} alt="Show" />}
      </span>
    </div>
  );
}
