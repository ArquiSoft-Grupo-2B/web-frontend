import react from 'react';
import FormField from '../ui/formField';
import PasswordField from '../ui/passwordField';
import SendFormButton from '../ui/sendFormButton';
import styles from '../../styles/FormLogin.module.css';
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form} data-testid="login-form">
      <FormField label={"Correo"} testid={"email"} />
      <PasswordField label={"Contraseña"} testid={"password"} />
      <Link to="/forgot-password" className={styles.forgot_link}>¿Olvidaste tu contraseña?</Link>
      <SendFormButton label={"Iniciar Sesión"} testid={"send-button"} type={2} />
    </form>
  );
}