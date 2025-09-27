// src/components/FullMap.jsx
import { useState } from "react";
import Map, { Source, Layer, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// Ruta hardcodeada
const route = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: [
      [-74.08581, 4.63692], 
      [-74.05, 4.63],
      [-74.02, 4.64],
      [-74.13671, 4.62561]   
    ]
  },
  properties: {
    distancia: "5.2 km",
    duracion: "15 min"
  }
};

export default function FullMap() {
  const [popupInfo, setPopupInfo] = useState(null);   

  const handleMapClick = (e) => {
    const features = e.features;
    if (features && features.length > 0) {
      const clickedFeature = features[0];
      if (clickedFeature.layer.id === "route-line") {
        setPopupInfo({
          lngLat: e.lngLat,
          ...clickedFeature.properties
        });
      }
    } else {
      setPopupInfo(null);
    }
  };

  return (
    <div>
        <div style={{ width: "100vw", height: "100vh", zIndex: 0 }}>
        <Map
            // Coordenadas centradas en Bogotá, Colombia
            initialViewState={{
            longitude: -74.08175,
            latitude: 4.60971,
            zoom: 12
            }}
            // Estilo y token de Mapbox
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            interactiveLayerIds={["route-line"]}
            onClick={handleMapClick}
        >
            {/* Cargar la ruta */}
            <Source id="route" type="geojson" data={route}>
            <Layer
                id="route-line"
                type="line"
                paint={{
                "line-color": "#0000FF",
                "line-width": 4
                }}
            />
            </Source>

            {popupInfo && (
            <Popup
                longitude={popupInfo.lngLat.lng}
                latitude={popupInfo.lngLat.lat}
                onClose={() => setPopupInfo(null)}
                closeOnClick={false}
            >
                <div style={{ fontSize: "14px" }}>
                <strong>Distancia:</strong> {popupInfo.distancia} <br />
                <strong>Duración:</strong> {popupInfo.duracion}
                </div>
            </Popup>
            )}
        </Map>
        </div>
    </div>
  );
}
