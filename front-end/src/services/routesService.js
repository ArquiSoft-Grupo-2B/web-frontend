// src/services/routesService.js
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function fetchNearbyRoutes(lat, lng, radius = 5000) {
  const token = localStorage.getItem("token");

  const url = `${API_BASE}/routes/near?lat=${lat}&lng=${lng}&radius_m=${radius}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data?.message || "Error al obtener rutas cercanas");
  }

  return data.data; // FeatureCollection
}
