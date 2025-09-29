import React, { useState } from 'react';
import FormField from '../ui/formField';
import PasswordField from '../ui/passwordField';
import SendFormButton from '../ui/sendFormButton';
import styles from '../../styles/Form.module.css';
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ correo, password });
  };

  return (
    <form onSubmit={onSubmit} className={styles.form} data-testid="login-form">
      <FormField label={"Correo"} testid={"email"} value={correo} setValue={setCorreo}/>
      <PasswordField label={"Contraseña"} testid={"password"} value={password} setValue={setPassword}/>
      <Link to="/forgot-pass" className={styles.forgot_link}>¿Olvidaste tu contraseña?</Link>
      <SendFormButton label={"Iniciar Sesión"} testid={"send-button"} type={2} />
    </form>
  );
}