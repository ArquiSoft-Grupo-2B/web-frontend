import styles from "../../styles/FormField.module.css";
import React from "react";
import { useState } from "react";


export default function FormField({ label, testid}) {
  const [text, setText] = useState("");

  return (
    <div className={styles.formField}>
      {text === "" && <p className={styles.input_label}>{label}</p>}
      <input
        type='text'
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-testid={testid}
    />
    </div>
  );
}