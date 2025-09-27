import './App.css';
import FullMap from "./components/domain/FullMap.jsx";
import Home from './components/layout/home.jsx';
import Navbar from './components/layout/navbar.jsx';

function App() {
  return (
    <>
      <Navbar showAuthButtons={false}/>
      {/* <FullMap /> */}
      <Home />
    </>
  );
}

export default App;
