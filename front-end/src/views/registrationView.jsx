import react from 'react';
import RegistrationForm from '../components/layout/registrationForm';
import { Link } from "react-router-dom";
import styles from "../styles/FormRegistration.module.css";
import Navbar from '../components/layout/navbar.jsx';

export default function RegistrationView() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
          <p className={styles.title}>Registro</p>
              <RegistrationForm />
          <p className={styles.redirect_text}>¿Ya tienes una cuenta creada? <Link to="/login" className={styles.redirect_link}>Inicia Sesión</Link></p>
      </div>
    </>
    
  );
}