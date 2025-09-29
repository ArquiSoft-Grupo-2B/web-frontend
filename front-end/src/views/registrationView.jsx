import react from 'react';
import RegistrationForm from '../components/layout/registrationForm';
import { Link } from "react-router-dom";
import styles from "../styles/Form.module.css";
import Navbar from '../components/layout/navbar.jsx';

export default function RegistrationView() {
  return (
    <div className={styles.view}>
      <Navbar />
      <div className={styles.container}>
          <p className={styles.title2}>Registro</p>
              <RegistrationForm />
          <p className={styles.redirect_text}>¿Ya tienes una cuenta creada? <Link to="/login" className={styles.redirect}>Inicia Sesión</Link></p>
      </div>
    </div>
    
  );
}