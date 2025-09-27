import styles from "../../styles/PasswordField.module.css";
import React from "react";
import { useState } from "react";
import eye_closed from "@/assets/eye-closed.svg";
import eye_open from "@/assets/eye-open.svg";


export default function PasswordField({ label }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.passwordField}>
      <input
        type='password'
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span
        className={styles.toggleButton}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <img src="/icons/eye-off.svg" alt="Hide" /> : <img src="/icons/eye.svg" alt="Show" />}
      </span>
    </div>
  );
}
