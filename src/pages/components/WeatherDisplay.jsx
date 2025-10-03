import { useEffect, useRef, useState } from "react";
import { set } from "astro:schema";
import { geocodeLocation, handleFetchAPI } from "../../services/FetchData";
import SearchForm from "./SearchForm";
import SettingsMenu from "./SettingsMenu.jsx";
import DailyForecast from "./DailyForecast.jsx";
import HourlyForecast from "./HourlyForecast.jsx";
import CurrentForecast from "./CurrentForecast.jsx";
import "../../styles/global.css";
import "../..//styles/weatherDisplay.css";
export default function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState({
    name: "Berlin",
    country: "Germany",
    latitude: 52.52437,
    longitude: 13.41053,
  });
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    latitude: 52.52437,
    longitude: 13.41053,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    hourly: ["temperature_2m", "weather_code"],
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ],
  });

  const [unitType, setUnitType] = useState("metric");
  const timeoutRef = useRef();

  const updateUnits = (unitType, newUnit) => {
    setParams((oldParams) => ({
      ...oldParams,
      [unitType]: newUnit,
    }));
  };

  const switchToImperial = () => {
    setParams((oldParams) => ({
      ...oldParams,
      temperature_unit: "fahrenheit",
      wind_speed_unit: "mph",
      precipitation_unit: "inch",
    }));
    setUnitType("imperial");
  };

  const switchToMetric = () => {
    setParams((prev) => ({
      ...prev,
      temperature_unit: "celsius",
      wind_speed_unit: "kmh",
      precipitation_unit: "mm",
    }));
    setUnitType("metric");
  };

  const url = "https://api.open-meteo.com/v1/forecast";

  async function handleSearch(cityName) {
    setLoading(true);

    try {
      const location = await geocodeLocation(cityName);
      console.log(
        `Found ${location.name}: ${location.latitude}, ${location.longitude}, ${location.country}`
      );
      setLocationData(location);
      // Update params with new latitude and longitude
      console.log("Old params", params);
      const updatedParams = {
        ...params,
        latitude: location.latitude,
        longitude: location.longitude,
      };
      console.log("Updated params:", updatedParams);
      setParams(updatedParams);
      const response = await handleFetchAPI(url, updatedParams);
      console.log("Weather data response:", response);
      setWeatherData(response);
      setLoading(false);
    } catch (error) {
      console.error("Error in handleSearch", error);
    }
  }

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced fetch
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await handleFetchAPI(url, params);
        console.log("Weather data response:", response);
        setWeatherData(response);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    }, 300); // Wait 300ms after last params change

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [params]);

  return (
    <div className="home gap-2">
      <div className="Header flex items-center justify-between">
        <img
          className="logo"
          src="/assets/images/logo.svg"
          alt="Weather Now Logo"
        />
        <SettingsMenu
          updateUnits={updateUnits}
          switchToImperial={switchToImperial}
          switchToMetric={switchToMetric}
          unitType={unitType}
        />
      </div>
      <h1 className="titleHeader">How's the sky looking today?</h1>

      <SearchForm handleSearch={handleSearch} />
      {loading && <p>Loading...</p>}

      <div className="main ">
        <div className="MainContainer">
          <CurrentForecast
            weatherData={weatherData}
            locationData={locationData}
            params={params}
          />
          <DailyForecast weatherData={weatherData} params={params} />
        </div>
        <HourlyForecast weatherData={weatherData} params={params} />
      </div>
    </div>
  );
}
