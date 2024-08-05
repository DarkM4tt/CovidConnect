import { useEffect, useState } from "react";
import Map from "../components/Map";

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

const ChartsAndMaps: React.FC = () => {
  const [mapCountries, setMapCountries] = useState<Country[]>([]);
  const [casesType, setCasesType] = useState<"cases" | "recovered" | "deaths">(
    "cases"
  );

  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/countries"
        );
        const data: Country[] = await response.json();
        setMapCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries data:", error);
      }
    };

    getCountriesData();
  }, []);

  const mapCenter: [number, number] = [34.80746, -40.4796];
  const zoom: number = 3;

  return (
    <div>
      <h1 className="text-2xl mb-4">Charts and Maps Page</h1>
      <p>Content for Charts and Maps will go here.</p>
      <Map
        countries={mapCountries}
        center={mapCenter}
        zoom={zoom}
        casesType={casesType}
      />
    </div>
  );
};

export default ChartsAndMaps;
