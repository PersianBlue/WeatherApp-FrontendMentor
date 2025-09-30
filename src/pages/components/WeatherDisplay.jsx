import { useState } from "react";
import weatherDescriptions from "../../../assets/weatherDescriptions.json";
import { set } from "astro:schema";
import { geocodeLocation, handleFetchAPI } from "../../services/FetchData";
import SearchForm from "./SearchForm";
import WeatherSummary from "./WeatherSummary";
import Header from "../layout/header";

export default function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    latitude: 52.52,
    longitude: 13.41,
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
    wind_speed_unit: "mph",
    temperature_unit: "fahrenheit",
    precipitation_unit: "inch",
  });

  const url = "https://api.open-meteo.com/v1/forecast";

  const switchUnits = (
    changeTemp = false,
    changeWind_speed = false,
    changePrecipitation = false
  ) => {
    const updates = {};

    if (changeTemp) {
      updates.temperature_unit =
        params.temperature_unit === "fahrenheit" ? "celsius" : "fahrenheit";
    }
    if (changeWind_speed) {
      updates.wind_speed_unit =
        params.wind_speed_unit === "mph" ? "kmh" : "mph";
    }
    if (changePrecipitation) {
      updates.precipitation_unit =
        params.precipitation_unit === "inch" ? "mm" : "inch";
    }

    if (Object.keys(updates).length > 0) {
      setParams({ ...params, ...updates });
    }
  };

  async function handleSearch(cityName) {
    setLoading(true);

    try {
      const location = await geocodeLocation(cityName);
      console.log(
        `Found ${location.name}: ${location.latitude}, ${location.longitude}`
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

  return (
    <div>
      <SearchForm handleSearch={handleSearch} />
      <button onClick={() => switchUnits(true, true, true)}>
        Switch Units
      </button>
      <Header switchUnits={switchUnits} />

      {loading && <p>Loading...</p>}

      {weatherData && weatherData.current && weatherData.daily && (
        <>
          <WeatherSummary
            weatherData={weatherData}
            locationData={locationData}
            params={params}
          />
          <div>Daily forecast:</div>
          <ul>
            {weatherData.daily.time &&
              weatherData.daily.time.map((date, index) => (
                <li key={date}>
                  {new Date(date).toDateString()}:{" "}
                  {weatherData.daily.temperature_2m_max
                    ? weatherData.daily.temperature_2m_max[index]
                    : "N/A"}{" "}
                  °C /{" "}
                  {weatherData.daily.temperature_2m_min
                    ? weatherData.daily.temperature_2m_min[index]
                    : "N/A"}{" "}
                  °C
                  {
                    <img
                      src={
                        weatherDescriptions[
                          weatherData.daily.weather_code[index]
                        ].day.image
                      }
                      alt="Weather Code Icon    "
                    ></img>
                  }
                </li>
              ))}
          </ul>
          <p>Hourly forecast</p>
          <ul>
            {weatherData.hourly.time &&
              weatherData.hourly.time.map((time, index) => (
                <li key={time}>
                  {weatherData.hourly.time
                    ? new Date(time).toLocaleTimeString([], { hour: "numeric" })
                    : "N/A"}{" "}
                  {weatherData.hourly.temperature_2m
                    ? weatherData.hourly.temperature_2m[index]
                    : "N/A"}{" "}
                  °C /{" "}
                  {
                    <img
                      src={
                        weatherDescriptions[
                          weatherData.hourly.weather_code[index]
                        ].day.image
                      }
                      alt="Weather Code Icon    "
                    ></img>
                  }
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
