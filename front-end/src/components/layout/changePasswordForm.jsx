import react from 'react';
import FormField from '../ui/formField';
import PasswordField from '../ui/passwordField';
import SendFormButton from '../ui/sendFormButton';
import styles from '../../styles/Form.module.css';
import { Link } from "react-router-dom";

export default function ChangePasswordForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form} data-testid="change-password-form">
          <FormField label={"Código de recuperación"} testid={"recovery-code"} />
          <PasswordField label={"Contraseña"} testid={"password"} />
          <PasswordField label={"Confirmar Contraseña"} testid={"confirm-password"} />
          <SendFormButton label={"Enviar"} testid={"send-button"} type={1} />
        </form>
  );
}