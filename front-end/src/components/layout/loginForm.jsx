import react from 'react';
import FormField from '../ui/formField';
import PasswordField from '../ui/passwordField';
import SendFormButton from '../ui/sendFormButton';
import styles from '../../styles/Form.module.css';

export default function LoginForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.formregistration} data-testid="login-form">
      <FormField label={"Correo"} testid={"email"} />
      <PasswordField label={"Contraseña"} testid={"password"} />
      <SendFormButton label={"Iniciar Sesión"} testid={"send-button"} type={2} />
    </form>
  );
}