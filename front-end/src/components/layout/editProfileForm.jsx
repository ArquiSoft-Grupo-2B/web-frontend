import React, { useState, useContext, useEffect } from 'react';
import FormField from '../ui/formField';
import DisabledField from '../ui/disabledField';
import PasswordField from '../ui/passwordField';
import SendFormButton from '../ui/sendFormButton';
import RedirectButton from '../ui/redirectButton';
import styles from '../../styles/Form.module.css';
import { fetchGraphQL } from "../../utils/graphql/fetchGraphQL";
import { UPDATE_USER } from '../../utils/graphql/mutations/updateUser';
import {GET_USER} from '../../utils/graphql/queries/getUser';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext"; 

export default function EditProfileForm({ setPhoto }) {
  const [idUser, setIdUser] = useState("");
  const [email, setEmail] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const id_user = localStorage.getItem("iduser");
      if (!id_user) {
        console.warn("No se encontró iduser en localStorage");
        return;
      }

      console.log(id_user);
      const response_user = await fetchGraphQL(GET_USER, { userId: id_user });
      console.log(response_user);

      const user = response_user.data?.getUser;
      if (!user) {
        console.error("No se encontró el usuario en la respuesta");
        return;
      }

      setIdUser(user.id);
      setEmail(user.email);
      setAlias(user.alias);
      setPhoto(user.photoUrl);
    } catch (error) {
      console.error("Error en useEffect:", error);
    }
  };

  fetchData();
}, []);


  const onSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);
  
      if (!alias.trim()) {
        setError("El campo de alias no puede estar vacío");
        return;
      }

      if (!password.trim()) {
        try {
          const response_update = await fetchGraphQL(UPDATE_USER, { email , alias });
          if (response_update.errors?.[0]?.message) {
            console.error(response_update.errors[0].message);
            setError(response_update.errors[0].message);
            return;
          }
          if (response_update.data) {
            setSuccess("Usuario logueado correctamente");
            navigate("/map");
          } 
  
        } catch (err) {
          console.error(err);
          setError("Hubo un error en la petición");
        }
      }
      else{
        try {
          const response_update = await fetchGraphQL(UPDATE_USER, {
            email,
            password,
            alias,
          });
  
        if (response_update.errors?.[0]?.message) {
            console.error(response_update.errors[0].message);
            setError(response_update.errors[0].message);
            return;
        }
  
        if (response_update.data) {
          setSuccess("Usuario logueado correctamente");
          navigate("/map");
        } 
  
        } catch (err) {
          console.error(err);
          setError("Hubo un error en la petición");
        }
      }
  
  };
  
  return (
    <form onSubmit={onSubmit} className={styles.form} data-testid="profile-form">
      <DisabledField testid="email-field" value={email} /> 
      <FormField label="Alias" testid="name-field" value={alias} setValue={setAlias}/>
      <PasswordField label="Nueva contraseña" testid="password" value={password} setValue={setPassword}/>
      <p>Llena este campo solamente si quieres cambiar tu contraseña actual</p>
      <div className={styles.buttonrow}>
        <SendFormButton label="Guardar Cambios" testid="save-button" type={1} />
        <RedirectButton redirectTo="/map" label="Descartar Cambios" testid="cancel-button" type={2} />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}