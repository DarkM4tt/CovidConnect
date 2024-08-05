import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

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

const casesTypeColors: Record<
  "cases" | "recovered" | "deaths",
  { hex: string; multiplier: number }
> = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7DD71D",
    multiplier: 1200,
  },
  deaths: {
    hex: "#C0C0C0",
    multiplier: 2000,
  },
};

export const sortData = (data: Country[]) => {
  return [...data].sort((a, b) => b.cases - a.cases);
};

export const prettyPrintStat = (stat: number) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (
  data: Country[],
  casesType: "cases" | "recovered" | "deaths"
) =>
  data.map((country, index) => (
    <Circle
      key={index} // Add a unique key prop
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={{
        fillOpacity: 0.4,
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      radius={
        Math.sqrt(country[casesType] / 10) *
        casesTypeColors[casesType].multiplier
      }
      {...(true as any)} // Cast the entire props object to any
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
