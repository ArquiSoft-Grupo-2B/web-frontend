import React, { useState } from 'react';
import FormField from '../ui/formField';
import PasswordField from '../ui/passwordField';
import SendFormButton from '../ui/sendFormButton';
import styles from '../../styles/Form.module.css';
import { Link } from "react-router-dom";

export default function RecoverEmailForm() {
  const [correo, setCorreo] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ correo });
  };

  return (
    <form onSubmit={onSubmit} className={styles.form} data-testid="recover-email-form">
      <FormField label={"Correo"} testid={"email"} value={correo} setValue={setCorreo}/>
      <SendFormButton label={"Enviar Solicitud"} testid={"send-button"} type={1} />
    </form>
  );
}