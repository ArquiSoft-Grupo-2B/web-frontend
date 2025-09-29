// src/views/ViewMap.jsx
import Navbar from "../components/layout/navbar.jsx";
import FullMap from "../components/domain/fullMap.jsx";
import { useUserLocation } from "../hooks/useUserLocation";

export default function ViewMap() {
  const { location, setLocation, loading, error } = useUserLocation();

  return (
    <div className="generic-container">
      <Navbar />
      <FullMap userLocation={location} setUserLocation={setLocation} loadingLocation={loading} />
    </div>
  );
}
