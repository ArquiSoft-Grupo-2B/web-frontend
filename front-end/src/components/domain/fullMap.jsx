import { useState, useEffect, useRef } from "react";
import Map, { Source, Layer, Marker, Popup } from "react-map-gl";
import bbox from "@turf/bbox";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "../../styles/FullMap.module.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function FullMap({ routes }) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [radius, setRadius] = useState(3000);
  const [menuOpen, setMenuOpen] = useState(true);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const mapRef = useRef(null);

  // Obtener ubicación del usuario apenas se carga el componente
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.longitude, pos.coords.latitude];
        setUserLocation(coords);
        setLoadingLocation(false);
      },
      (err) => {
        console.error("Error al obtener ubicación:", err);
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Ajustar mapa al bbox de todas las rutas
  useEffect(() => {
    if (routes && mapRef.current) {
      const [minX, minY, maxX, maxY] = bbox(routes);
      mapRef.current.fitBounds(
        [
          [minX, minY],
          [maxX, maxY],
        ],
        { padding: 60, duration: 1000 }
      );
    }
  }, [routes]);

  // Cuando llega la ubicación, centrar dinámicamente
  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: userLocation,
        zoom: 14,
        duration: 1500,
      });
    }
  }, [userLocation]);

  // Click en la línea → popup
  const handleMapClick = (e) => {
    const features = e.features;
    if (features && features[0]?.layer.id === "route-line") {
      setPopupInfo({
        lngLat: e.lngLat,
        ...features[0].properties,
      });
    } else {
      setPopupInfo(null);
    }
  };

  return (
    <div className={styles.mapContainer}>
      {/* Overlay de “Obteniendo ubicación…” */}
      {loadingLocation && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingBox}>
            Obteniendo tu ubicación...
          </div>
        </div>
      )}

      {/* Menú flotante */}
      <div className={`${styles.menu} ${menuOpen ? styles.open : styles.collapsed}`}>
        <div className={styles.menuHeader} onClick={() => setMenuOpen(!menuOpen)}>
          <h3>Buscador de rutas</h3>
          <button className={styles.toggleBtn}>
            {menuOpen ? "▼" : "▲"}
          </button>
        </div>

        <div className={styles.menuContent}>
          <label>Radio de búsqueda (m):</label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
          <button>Buscar</button>
        </div>
      </div>


      {/* Mapa */}
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -75.08581, // ubicación por defecto antes de obtenerla
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
              paint={{
                "line-color": "#216bd5",
                "line-width": 6,
                "line-opacity": 0.8,
              }}
            />
          </Source>
        )}

        {/* Inicio/fin de cada ruta */}
        {routes?.features?.map((route, i) => {
          const coords = route.geometry.coordinates;
          return (
            <>
              <Marker
                key={`start-${i}`}
                longitude={coords[0][0]}
                latitude={coords[0][1]}
                anchor="bottom"
              >
                {/* SVG for start pin */}
                <svg width={32} height={32} viewBox="0 0 32 32" style={{ display: "block" }}>
                  <circle cx="16" cy="16" r="10" fill="#ff8800" stroke="#fff" strokeWidth="2" />
                  <text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold"></text>
                </svg>
              </Marker>
              <Marker
                key={`end-${i}`}
                longitude={coords[coords.length - 1][0]}
                latitude={coords[coords.length - 1][1]}
                anchor="bottom"
              >
                {/* SVG for end pin */}
                <svg width={32} height={32} viewBox="0 0 32 32" style={{ display: "block" }}>
                  <circle cx="16" cy="16" r="10" fill="#ff8800" stroke="#fff" strokeWidth="2" />
                  <text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold"></text>
                </svg>
              </Marker>
            </>
          );
        })}

        {/* Usuario */}
        {userLocation && (
          <Marker longitude={userLocation[0]} latitude={userLocation[1]}>
            <img
              src="/images/profile-placeholder.png"
              alt="Usuario"
              className={styles.userMarker}
            />
          </Marker>
        )}
        {popupInfo && (
          <Popup
            longitude={popupInfo.lngLat.lng}
            latitude={popupInfo.lngLat.lat}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
          >
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
