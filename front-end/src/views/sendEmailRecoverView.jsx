import react from 'react';
import RecoverEmailForm from '../components/layout/recoverEmailForm.jsx';
import { Link } from "react-router-dom";
import styles from "../styles/Form.module.css";
import Navbar from '../components/layout/navbar.jsx';

export default function SendEmailRecoverView() {
  return (
    <div className={styles.view}>
      <Navbar />
      <div className={styles.container}>
          <p className={styles.title2}>¿Olvidaste tu contraseña?</p>
              <RecoverEmailForm />
      </div>
    </div>
    
  );
}