import styles from "../../styles/PreviewPicture.module.css";
import React from "react";
import { useState } from "react";

export default function PreviewPicture({ route="/images/profile-placeholder.png", label, testid}) {

  return (
    <div className={styles.picture_container}>
        <img src="/images/profile-placeholder.png" alt={label} className={styles.picture} data-testid={testid}></img>
    </div>
  );
}
