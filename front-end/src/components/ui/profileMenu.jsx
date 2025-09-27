import { useState, useRef } from "react";
import styles from "../../styles/ProfileMenu.module.css";
import { Link } from "react-router-dom";
import useClickOutside from '../../hooks/useClickOutside.jsx';

export default function ProfileMenu( { onLogout } ) {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  useClickOutside(profileRef, () => setIsOpen(false));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  
  return (
    <div className={styles.profileContainer} ref={profileRef}>
      {/* Imagen de perfil */}
      <div 
        className={styles.profilePic} 
        onClick={toggleMenu}
      >
        <img 
          src="/images/profile-placeholder.png" 
          alt="Imagen de perfil del usuario" 
          className={styles.profileImage} 
        />
      </div>

      {/* Popup */}
      {isOpen && (
        <div className={styles.popupMenu}>
          <Link to="/profile" aria-label="Redirección a página de perfil">
            <button>Editar perfil</button>
          </Link>
          <button onClick={onLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}