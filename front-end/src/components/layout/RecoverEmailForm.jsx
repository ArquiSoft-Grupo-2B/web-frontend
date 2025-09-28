import react from 'react';
import FormField from '../ui/formField';
import PasswordField from '../ui/passwordField';
import SendFormButton from '../ui/sendFormButton';
import styles from '../../styles/Form.module.css';
import { Link } from "react-router-dom";

export default function RecoverEmailForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form} data-testid="recover-email-form">
      <FormField label={"Correo"} testid={"email"} />
      <SendFormButton label={"Enviar Solicitud"} testid={"send-button"} type={1} />
    </form>
  );
}