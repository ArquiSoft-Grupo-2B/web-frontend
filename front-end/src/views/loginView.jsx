import react from 'react';
import LoginForm from '../components/layout/loginForm';
import { Link } from "react-router-dom";
import styles from "../styles/Form.module.css";
import Navbar from '../components/layout/navbar.jsx';

export default function LoginView() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
          <p className={styles.title}>Iniciar Sesión</p>
              <LoginForm />
          <p className={styles.redirect_text}>¿No tienes una cuenta creada? <Link to="/register" className={styles.redirect_link}>Regístrate</Link></p>
      </div>
    </>
    
  );
}