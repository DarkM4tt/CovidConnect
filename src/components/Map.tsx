import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../util";
import "./Map.css";

interface CountryInfo {
  lat: number;
  long: number;
  flag: string;
}

interface Country {
  country: string;
  countryInfo: CountryInfo;
  cases: number;
  recovered: number;
  deaths: number;
}

interface MapProps {
  countries: Country[];
  casesType: "cases" | "recovered" | "deaths";
  center: [number, number];
  zoom: number;
}

const Map: React.FC<MapProps> = ({ countries, casesType, center, zoom }) => {
  return (
    <MapContainer
      className="map"
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showDataOnMap(countries, casesType)}
    </MapContainer>
  );
};

export default Map;
