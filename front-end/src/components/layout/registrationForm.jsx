import React, { useState } from 'react';
import FormField from '../ui/formField';
import PasswordField from '../ui/passwordField';
import SendFormButton from '../ui/sendFormButton';
import styles from '../../styles/Form.module.css';

export default function RegistrationForm() {
  const [correo, setCorreo] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ correo, alias, password, confirmpassword });
  };

  return (
    <form onSubmit={onSubmit} className={styles.form} data-testid="registration-form">
      <FormField label="Correo" testid="email" value={correo} setValue={setCorreo} />
      <FormField label="Alias" testid="alias" value={alias} setValue={setAlias} />
      <PasswordField label="Contraseña" testid="password" value={password} setValue={setPassword} />
      <PasswordField label="Confirmar Contraseña" testid="confirm-password" value={confirmpassword} setValue={setConfirmPassword} />
      <SendFormButton label="Registrarse" testid="send-button" type={1} />
    </form>
  );
}
