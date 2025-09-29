import react from 'react';
import PreviewPicture from '../components/ui/previewPicture';
import EditProfileForm from '../components/layout/editProfileForm';
import UploadFileButton from '../components/ui/uploadFileButton';
import { Link } from "react-router-dom";
import styles from "../styles/Form.module.css";
import Navbar from '../components/layout/navbar.jsx';

export default function LoginView() {
  return (
    <>
      <Navbar />
      <div className={styles.spacer}>
        <div className={styles.container}>
            <PreviewPicture label="Foto de Perfil" testid="profile-picture"/>
        </div>
        <div className={styles.container}>
              <p className={styles.title}>Mi Perfil</p>
              <EditProfileForm />
              <UploadFileButton label="Subir Foto de Perfil" testid="upload-button" type={3}
                accept="image/*" multiple={false} />
        </div>
      </div>
      
    </>
    
  );
}