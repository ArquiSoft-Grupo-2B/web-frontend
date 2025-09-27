import react from 'react';
import RegistrationForm from '../components/layout/registrationForm';
import { Link } from "react-router-dom";
import styles from "../styles/Registration.module.css";

export default function RegistrationView() {
  return (
    <div className={styles.container}>
        <p className={styles.title}>Registro</p>
            <RegistrationForm />
        <p>¿Ya tienes una cuenta creada? <Link to="/login">Inicia Sesión</Link></p>
    </div>
  );
}