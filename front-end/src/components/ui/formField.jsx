import styles from "../../styles/FormField.module.css";
import React from "react";

export default function FormField({ label, testid, value = "", setValue }) {
  return (
    <div className={styles.formField}>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
        data-testid={testid}
      />
    </div>
  );
}
