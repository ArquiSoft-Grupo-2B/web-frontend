import './App.css';

import PrivateRoute from './components/privateRoute.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ViewHome from './views/homeView.jsx';
import ViewMap from './views/mapView.jsx';
import RegistrationView from './views/registrationView.jsx';

function App() {

  return (
    <Routes>
      {/* Rutas publicas */}
      <Route path="/" element={<ViewHome />} />
      <Route path="/login" element={<></>} />
      <Route path="/register" element={<RegistrationView />} />
      <Route path="/pass-recovery" element={<></>} />
      {/* Rutas privadas */}
      <Route 
        path='/profile' 
        element={
          <PrivateRoute>
            <></>
          </PrivateRoute>
        }>
      </Route>
      <Route 
        path='/map' 
        element={
          <PrivateRoute>
            <ViewMap />
          </PrivateRoute>
        }>
      </Route>
    </Routes>
  );
}

export default App;