import styles from "../../styles/SendFormButton.module.css";
import React, { useState, useEffect } from "react";

export default function SendFormButton({ label, testid, type }) {
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (type === 1) {
      setClassName(styles.sendButtonPrimary);
    } else if (type === 2) {
      setClassName(styles.sendButtonSecondary);
    } else if (type === 3) {
      setClassName(styles.sendButtonTertiary);
    } else {
      setClassName(styles.sendButtonDisabled); 
    }
  }, [type]);

  return (
    <button
      type="submit"
      data-testid={testid}
      className={className}
    >
      {label}
    </button>
  );
}
