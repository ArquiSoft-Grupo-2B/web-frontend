import { useState } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// Rutas decorativas
const routes = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { id: "1123694574" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-74.0521366, 4.6593956],
          [-74.0520667, 4.6593476],
          [-74.0519956, 4.6593102],
          [-74.0518863, 4.6592687],
          [-74.0517515, 4.6593295],
          [-74.0516174, 4.6594104],
          [-74.051506, 4.6594833],
          [-74.0514209, 4.6595254],
          [-74.0513425, 4.6595521],
          [-74.0512687, 4.6595628],
          [-74.0511923, 4.6595508],
          [-74.0511212, 4.6595134],
          [-74.0510769, 4.6594773],
          [-74.0510447, 4.6594225],
          [-74.0510286, 4.6593797],
          [-74.051018, 4.6593133],
          [-74.0510313, 4.6592594],
          [-74.0510903, 4.6591337],
          [-74.0516053, 4.6583625],
          [-74.0516127, 4.6582783],
          [-74.0515972, 4.6582081],
          [-74.0515671, 4.6581125],
          [-74.0515135, 4.6580256],
          [-74.0514189, 4.6578746],
          [-74.0514437, 4.6578521],
          [-74.0514524, 4.6578599],
          [-74.0515383, 4.6579842],
          [-74.0515812, 4.6580524],
          [-74.0516093, 4.6580965],
          [-74.0516496, 4.6581352],
          [-74.0517046, 4.6581499],
          [-74.0517595, 4.6581326],
          [-74.0517931, 4.6580925],
          [-74.0519714, 4.6578278],
          [-74.0523597, 4.6573159]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "845530295" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-74.0443621, 4.6508897],
          [-74.0447413, 4.6509827],
          [-74.0448911, 4.6510975],
          [-74.045048, 4.6511348],
          [-74.0451408, 4.6511494],
          [-74.0452074, 4.6512606],
          [-74.0452109, 4.651377],
          [-74.0451089, 4.651452],
          [-74.0451228, 4.6515596],
          [-74.0453033, 4.6515996],
          [-74.0453607, 4.6516498],
          [-74.045338, 4.6517765],
          [-74.0455278, 4.6517929],
          [-74.0456417, 4.6516537],
          [-74.0457188, 4.651396],
          [-74.0458657, 4.6511869],
          [-74.0459207, 4.6508184],
          [-74.0462553, 4.6505888],
          [-74.0464508, 4.6504333],
          [-74.0465443, 4.6504195],
          [-74.0466027, 4.6502851],
          [-74.0468057, 4.6501563],
          [-74.0469185, 4.6502114],
          [-74.0470895, 4.6502738],
          [-74.0472385, 4.6503314],
          [-74.0473184, 4.6503701],
          [-74.0475424, 4.6504952],
          [-74.0477822, 4.6504911],
          [-74.0478121, 4.6504224],
          [-74.0478195, 4.6502921],
          [-74.0477697, 4.6501402],
          [-74.0476723, 4.6499118],
          [-74.0476233, 4.6497204],
          [-74.0475485, 4.6496325],
          [-74.0475329, 4.6495838],
          [-74.0473446, 4.6495025],
          [-74.0474131, 4.6494813],
          [-74.0475959, 4.6495074],
          [-74.0476869, 4.6495182]
        ]
      }
    }
  ]
};

// Pins decorativos
const pins = [
  { id: "start", coordinates: [-74.0521366, 4.6593956] }, 
  { id: "end", coordinates: [-74.0523597, 4.6573159] },
  { id: "start-1", coordinates: [-74.0443621, 4.6508897] },
  { id: "end-1", coordinates: [-74.0476869, 4.6495182] }
];

export default function DecorativeMap( {className}) {
  return (
    <div style={{ width: "100%", height: "500px", borderRadius: "16px", overflow: "hidden" }} className={className}>
      <Map
        initialViewState={{
          longitude: -74.0543621,
          latitude: 4.6538897,
          zoom: 14.25
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactive={false}
      >
        {/* Rutas decorativas */}
        <Source id="routes" type="geojson" data={routes}>
          <Layer
            id="routes-line"
            type="line"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": "#ff8000",
              "line-width": 4,
            }}
          />
        </Source>

        {/* Pins decorativos usando Marker */}
        {pins.map(pin => (
          <Marker
            key={pin.id}
            longitude={pin.coordinates[0]}
            latitude={pin.coordinates[1]}
            anchor="center"
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#ff8000",
                borderRadius: "50%",
                border: "2px solid white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
              }}
            />
          </Marker>
        ))}
      </Map>
    </div>
  );
}
