// src/views/ViewMap.jsx
import Navbar from "../components/layout/navbar.jsx";
import FullMap from "../components/domain/fullMap.jsx";
import { useUserLocation } from "../hooks/useUserLocation";
import { useState } from "react";
import InfoPopup from "../components/ui/infoPopup.jsx";

export default function ViewMap() {
  const { location, setLocation, loading, error } = useUserLocation();
  const [infoMessage, setInfoMessage] = useState(null);

  return (
    <div className="generic-container">
      <Navbar />

      {infoMessage && (
        <InfoPopup
          message={infoMessage.text}
          type={infoMessage.type}
          onClose={() => setInfoMessage(null)}
        />
      )}


      <FullMap
        userLocation={location}
        setUserLocation={setLocation}
        loadingLocation={loading}
        infoMessage={infoMessage}
        setInfoMessage={setInfoMessage}
      />
    </div>
  );
}
