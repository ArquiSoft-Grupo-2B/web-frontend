import React, { useState } from 'react';
import FormField from '../ui/formField';
import PasswordField from '../ui/passwordField';
import SendFormButton from '../ui/sendFormButton';
import styles from '../../styles/Form.module.css';
import { Link } from "react-router-dom";

export default function ChangePasswordForm() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ code, password, confirmpassword });
  };

  return (
    <form onSubmit={onSubmit} className={styles.form} data-testid="change-password-form">
          <FormField label={"Código de recuperación"} testid={"recovery-code"} value={code} setValue={setCode}/>
          <PasswordField label={"Contraseña"} testid={"password"} value={password} setValue={setPassword}/>
          <PasswordField label={"Confirmar Contraseña"} testid={"confirm-password"} value={confirmpassword} setValue={setConfirmPassword}/>
          <SendFormButton label={"Enviar"} testid={"send-button"} type={1} />
        </form>
  );
}