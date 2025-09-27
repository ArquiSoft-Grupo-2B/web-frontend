import './App.css';
import FullMap from "./components/domain/FullMap.jsx";
import Home from './components/layout/home.jsx';
import Navbar from './components/layout/navbar.jsx';
import RegistrationView from './views/registrationView.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar showAuthButtons={false}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<FullMap />} />
        <Route path="/register" element={<RegistrationView />} />
      </Routes>
    </>
  );
}

export default App;