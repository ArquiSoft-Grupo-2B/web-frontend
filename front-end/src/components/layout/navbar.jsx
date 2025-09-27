// src/components/layout/navbar.jsx
import styles from "../../styles/Navbar.module.css";
import Button from "../ui/button.jsx";
import ProfileMenu from "../ui/profileMenu.jsx";

import { useContext, useRef } from 'react';
import { AuthContext } from '../../contexts/authContext.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ showAuthButtons = true }) {

  const location = useLocation();
  const navigate = useNavigate();
  const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

  // Verificar si la ruta actual está en el arreglo
  const isOnAuthPage = authRoutes.includes(location.pathname);


  // Traemos estado y acciones del contexto de autenticación
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();          // Limpia el token y actualiza el contexto
    navigate('/');     // Redirige al home principal
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink} aria-label="Redirección a página de inicio">
            <img src="/icons/logo.svg" alt="Logo Runpath" className={styles.logoIcon} />
            <span className={styles.logoText}>RunPath</span>
          </Link>
        </div>
        {isOnAuthPage ? null : (
          <>
          {!isAuthenticated ? (
          <div className={styles.navButtons}>
            <Link 
            to="/login"
            aria-label="Redirección a página de inicio de sesión">
              <Button variant="secondary" size="md">Iniciar sesión</Button>
            </Link>
            <Link 
            to="/register"
            aria-label="Redirección a página de registro">
              <Button variant="primary" size="md">Registrarse</Button>
            </Link>
          </div>
          ) : (
            <ProfileMenu onLogout={handleLogout} />
          )}
          </>
        )} 
        
      </nav>
    </>
  );
}
