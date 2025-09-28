import react from 'react';
import FormField from '../ui/formField';
import PasswordField from '../ui/passwordField';
import SendFormButton from '../ui/sendFormButton';
import styles from '../../styles/Form.module.css';

export default function RegistrationForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form} data-testid="registration-form">
      <FormField label={"Correo"} testid={"email"} />
      <FormField label={"Alias"} testid={"alias"} />
      <PasswordField label={"Contraseña"} testid={"password"} />
      <PasswordField label={"Confirmar Contraseña"} testid={"confirm-password"} />
      <SendFormButton label={"Registrarse"} testid={"send-button"} type={1} />
    </form>
  );
}