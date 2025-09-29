import styles from "../../styles/FormField.module.css";
import React from "react";
import { useState } from "react";


export default function DisabledField({ text, testid}) {

  return (
    <div className={styles.formField}>
      {text === "" && <p className={styles.input_label}>{label}</p>}
      <input
        type='text'
        className={styles.input}
        value={text}
        readOnly
        onChange={(e) => setText(e.target.value)}
        data-testid={testid}
    />
    </div>
  );
}