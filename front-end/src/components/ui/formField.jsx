import styles from "../../styles/FormField.module.css";
import React from "react";

export default function FormField({ label, testid, value = "", setValue }) {
  return (
    <div className={styles.formField}>
      {value === "" && <p className={styles.input_label}>{label}</p>}
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-testid={testid}
      />
    </div>
  );
}
