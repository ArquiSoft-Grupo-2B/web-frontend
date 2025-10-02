// src/components/domain/FullMap.jsx
import React, { useState, useRef} from "react";
import Map, { Source, Layer, Marker, Popup } from "react-map-gl";
import bbox from "@turf/bbox";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "../../styles/FullMap.module.css";
import Button from "../ui/button";
import { fetchNearbyRoutes } from "../../services/routesService";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function FullMap({ userLocation, setUserLocation, loadingLocation, setInfoMessage }) {
  const [routes, setRoutes] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(true);
  const [radius, setRadius] = useState(3000);
  const mapRef = useRef(null);

  // Buscar rutas
  const handleSearch = async () => {
    if (!userLocation) return;

    try {
      setInfoMessage({ type: "info", text: "Buscando rutas cercanas..." });

      const data = await fetchNearbyRoutes(userLocation[1], userLocation[0], radius);
      setRoutes(data);

      setInfoMessage({
        type: "success",
        text: `Se encontraron ${data.features.length} rutas.`,
      });

      if (data.features.length > 0) {
        const [minX, minY, maxX, maxY] = bbox(data);
        mapRef.current.fitBounds([[minX, minY], [maxX, maxY]], {
          padding: 60,
          duration: 1000,
        });
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


      {/* Menú flotante */}
      <div className={`${styles.menu} ${menuOpen ? styles.open : styles.collapsed}`}>
        <div className={styles.menuHeader} onClick={() => setMenuOpen(!menuOpen)}>
          <h3>Buscador de rutas</h3>
          <button className={styles.toggleBtn}>{menuOpen ? "▼" : "▲"}</button>
        </div>

        <div className={styles.menuContent}>
          <label>Radio de búsqueda (m):</label>
          <input type="number" value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
          <Button onClick={handleSearch} variant="primary" size="md">
            Buscar
          </Button>
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
        dragRotate={false}
        touchZoomRotate={true}
        pitchWithRotate={false}
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

        {/* Marcadores de inicio y fin de cada ruta */}
        {routes?.features?.map((route, index) => {
          let coords = [];

          // Maneja LineString
          if (route.geometry?.type === "LineString") {
            coords = route.geometry.coordinates;
          }

          // Maneja MultiLineString
          if (route.geometry?.type === "MultiLineString") {
            coords = route.geometry.coordinates[0]; // usa el primer segmento
          }

          if (!coords || coords.length === 0) return null;

          const start = coords[0];
          const end = coords[coords.length - 1];

          console.log("🧭 Ruta", index, "inicio:", start, "fin:", end);

          return (
            <React.Fragment key={index}>
              <Marker longitude={start[0]} latitude={start[1]} anchor="bottom">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="#FF7A00"
                  stroke="#F9F9F9"
                  strokeWidth="1"
                  style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))" }}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 10.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 5.5 12 5.5s3.5 1.57 3.5 3.5S13.93 12.5 12 12.5z" />
                </svg>
              </Marker>

              <Marker longitude={end[0]} latitude={end[1]} anchor="bottom">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="#FF7A00"
                  stroke="#F9F9F9"
                  strokeWidth="1"
                  style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))" }}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 10.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 5.5 12 5.5s3.5 1.57 3.5 3.5S13.93 12.5 12 12.5z" />
                </svg>
              </Marker>

            </React.Fragment>
          );
        })}



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
