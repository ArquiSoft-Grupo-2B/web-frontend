import react from 'react';
import ChangePasswordForm from '../components/layout/changePasswordForm.jsx';
import { Link } from "react-router-dom";
import styles from "../styles/Form.module.css";
import Navbar from '../components/layout/navbar.jsx';

export default function ChangePassword() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
          <p className={styles.title2}>Cambiar Contraseña</p>
              <ChangePasswordForm />
      </div>
    </>
    
  );
}