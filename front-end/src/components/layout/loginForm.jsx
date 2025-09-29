import React, { useState, useContext } from 'react';
import FormField from '../ui/formField';
import PasswordField from '../ui/passwordField';
import SendFormButton from '../ui/sendFormButton';
import styles from '../../styles/Form.module.css';
import { Link } from "react-router-dom";
import { fetchGraphQL } from "../../utils/graphql/fetchGraphQL";
import { LOGIN_USER } from '../../utils/graphql/mutations/loginUser';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext"; 

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetchGraphQL(LOGIN_USER, { email, password });

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
    <form onSubmit={onSubmit} className={styles.form} data-testid="login-form">
      <FormField label="Email" testid="email" value={email} setValue={setEmail}/>
      <PasswordField label="Contraseña" testid="password" value={password} setValue={setPassword}/>
      <Link to="/forgot-pass" className={styles.forgot_link}>¿Olvidaste tu contraseña?</Link>
      <SendFormButton label="Iniciar Sesión" testid="send-button" type={2} />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}
