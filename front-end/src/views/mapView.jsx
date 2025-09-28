import Navbar from '../components/layout/navbar.jsx';
import FullMap from '../components/domain/fullMap.jsx';

const ViewMap = () => {

  const testRoutes = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { nombre: "Ruta A", distancia: "5 km", duracion: "30 min" },
        geometry: {
          type: "LineString",
          coordinates: [
            [-74.08581, 4.60971],
            [-74.08, 4.61],
            [-74.075, 4.615],
          ],
        },
      },
      {
        type: "Feature",
        properties: { nombre: "Ruta B", distancia: "8 km", duracion: "50 min" },
        geometry: {
          type: "LineString",
          coordinates: [
            [-74.07, 4.62],
            [-74.065, 4.625],
            [-74.06, 4.63],
          ],
        },
      },
    ],
  };



  return (
    <div className="generic-container">
      <Navbar />
      <FullMap routes={testRoutes} />
    </div>
  );
};

export default ViewMap;