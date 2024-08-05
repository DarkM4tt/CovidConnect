import { useQuery } from "@tanstack/react-query";
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

const fetchCountriesData = async (): Promise<Country[]> => {
  const response = await fetch("https://disease.sh/v3/covid-19/countries");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const ChartsAndMaps: React.FC = () => {
  const {
    data: mapCountries = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["countriesData"],
    queryFn: fetchCountriesData,
  });

  const casesType = "cases";
  const mapCenter: [number, number] = [34.80746, -40.4796];
  const zoom: number = 3;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

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
