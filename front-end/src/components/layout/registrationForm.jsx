import React, { useState } from "react";
import FormField from "../ui/formField";
import PasswordField from "../ui/passwordField";
import SendFormButton from "../ui/sendFormButton";
import styles from "../../styles/Form.module.css";
import { fetchGraphQL } from "../../utils/graphql/fetchGraphQL";
import { CREATE_USER } from "../../utils/graphql/mutations/createUser";

export default function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim() || !alias.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmpassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetchGraphQL(CREATE_USER, {
        email,
        password,
        alias,
      });
    
      if (response.errors?.[0]?.message) {
        console.error(response.errors[0].message);
        setError(response.errors[0].message);
        return;
      }
    
      if (response.data?.loginUser) {
        setSuccess("Usuario logueado correctamente");
        login(response.data.loginUser.idToken);
        navigate("/map");
      } 
    
    } catch (err) {
      console.error(err);
      setError("Hubo un error en la petición");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={styles.form}
      data-testid="registration-form"
    >
      <FormField
        label="Correo"
        testid="email"
        value={email}
        setValue={setEmail}
      />
      <FormField
        label="Alias"
        testid="alias"
        value={alias}
        setValue={setAlias}
      />
      <PasswordField
        label="Contraseña"
        testid="password"
        value={password}
        setValue={setPassword}
      />
      <PasswordField
        label="Confirmar Contraseña"
        testid="confirm-password"
        value={confirmpassword}
        setValue={setConfirmPassword}
      />
      <SendFormButton label="Registrarse" testid="send-button" type={1} />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}
