import react from 'react';
import FormField from '../ui/formField';
import DisabledField from '../ui/disabledField';
import SendFormButton from '../ui/sendFormButton';
import RedirectButton from '../ui/redirectButton';
import styles from '../../styles/Form.module.css';
import { Form } from 'react-router-dom';

export default function EditProfileForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form} data-testid="profile-form">
      <DisabledField testid="email-field" text="user@example.com" />
      <FormField label="Alias" testid="name-field" value='User123'/>
      <div className={styles.buttonrow}>
        <SendFormButton label="Guardar Cambios" testid="save-button" type={1} />
        <RedirectButton route="/map" label="Descartar Cambios" testid="cancel-button" type={2} />
      </div>
    </form>
  );
}