// src/components/domain/FullMap.jsx
import { useState, useRef } from "react";
import Map, { Source, Layer, Marker, Popup } from "react-map-gl";
import bbox from "@turf/bbox";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "../../styles/FullMap.module.css";
import { fetchNearbyRoutes } from "../../services/routesService";
import InfoPopup from "../ui/infoPopup.jsx";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function FullMap({ userLocation, setUserLocation, loadingLocation }) {
  const [routes, setRoutes] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(true);
  const [radius, setRadius] = useState(3000);
  const [infoMessage, setInfoMessage] = useState(null);
  const mapRef = useRef(null);

  // Buscar rutas
  const handleSearch = async () => {
    if (!userLocation) return;
    try {
      setInfoMessage({ type: "info", text: "Buscando rutas cercanas..." });
      const data = await fetchNearbyRoutes(userLocation[0], userLocation[1], radius);
      setRoutes(data);
      setInfoMessage({ type: "success", text: `Se encontraron ${data.features.length} rutas.` });

      if (data.features.length > 0) {
        const [minX, minY, maxX, maxY] = bbox(data);
        mapRef.current.fitBounds([[minX, minY], [maxX, maxY]], { padding: 60, duration: 1000 });
      }
    } catch (err) {
      setInfoMessage({ type: "error", text: err.message });
    }
  };

  const handleMapClick = (e) => {
    const feature = e.features?.[0];
    if (feature?.layer.id === "route-line") {
      setPopupInfo({ lngLat: e.lngLat, ...feature.properties });
    } else {
      setPopupInfo(null);
    }
  };

  return (
    <div className={styles.mapContainer}>
      {/* Overlay de ubicación */}
      {loadingLocation && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingBox}>Obteniendo tu ubicación...</div>
        </div>
      )}

      {/* Popup informativo */}
      {infoMessage && (
        <InfoPopup message={infoMessage.text} type={infoMessage.type} onClose={() => setInfoMessage(null)} />
      )}

      {/* Menú flotante */}
      <div className={`${styles.menu} ${menuOpen ? styles.open : styles.collapsed}`}>
        <div className={styles.menuHeader} onClick={() => setMenuOpen(!menuOpen)}>
          <h3>Buscador de rutas</h3>
          <button className={styles.toggleBtn}>{menuOpen ? "▼" : "▲"}</button>
        </div>

        <div className={styles.menuContent}>
          <label>Radio de búsqueda (m):</label>
          <input type="number" value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
          <button onClick={handleSearch}>Buscar</button>
        </div>
      </div>

      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -74.08175,
          latitude: 4.60971,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={["route-line"]}
        onClick={handleMapClick}
      >
        {/* Rutas */}
        {routes && (
          <Source id="routes" type="geojson" data={routes}>
            <Layer
              id="route-line"
              type="line"
              paint={{ "line-color": "#216bd5", "line-width": 6, "line-opacity": 0.8 }}
            />
          </Source>
        )}

        {/* Marcador de usuario (arrastrable) */}
        {userLocation && (
          <Marker
            longitude={userLocation[0]}
            latitude={userLocation[1]}
            draggable
            onDragEnd={(e) => setUserLocation([e.lngLat.lng, e.lngLat.lat])}
          >
            <img src="/images/profile-placeholder.png" alt="Usuario" className={styles.userMarker} />
          </Marker>
        )}

        {/* Popup de ruta */}
        {popupInfo && (
          <Popup longitude={popupInfo.lngLat.lng} latitude={popupInfo.lngLat.lat} onClose={() => setPopupInfo(null)}>
            <div className={styles.popup}>
              <strong>{popupInfo.nombre || "Ruta sin nombre"}</strong>
              <br />
              Distancia: {popupInfo.distancia || "Distancia no disponible"}
              <br />
              Duración: {popupInfo.duracion || "Duración no disponible"}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
