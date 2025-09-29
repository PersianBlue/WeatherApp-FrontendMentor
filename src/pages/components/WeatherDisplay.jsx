import { useState } from "react";
import { fetchWeatherApi } from "openmeteo";
import weatherDescriptions from "../../../assets/weatherDescriptions.json";
import { set } from "astro:schema";

export default function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = "https://api.open-meteo.com/v1/forecast";

  async function geocodeLocation(cityName) {
    const location = encodeURIComponent(cityName);
    console.log(location);
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`;

    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return {
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
        name: data.results[0].name,
        country: data.results[0].country,
      };
    }
    throw new Error("Location not found");
  }

  async function handleFetchAPI(url, params) {
    try {
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];

      const latitude = response.latitude();
      const longitude = response.longitude();
      const elevation = response.elevation();
      const utcOffsetSeconds = response.utcOffsetSeconds();

      const current = response.current();
      const hourly = response.hourly();
      const daily = response.daily();

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherDataObj = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: Math.round(current.variables(0).value()),
          apparent_temperature: Math.round(current.variables(1).value()),
          relative_humidity_2m: Math.round(current.variables(2).value()),
          precipitation: Math.round(current.variables(3).value()),
          weather_code: Math.round(current.variables(4).value()),
          wind_speed_10m: Math.round(current.variables(5).value()),
        },
        hourly: {
          time: [
            ...Array(
              (Number(hourly.timeEnd()) - Number(hourly.time())) /
                hourly.interval()
            ),
          ].map(
            (_, i) =>
              new Date(
                (Number(hourly.time()) +
                  i * hourly.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          temperature_2m: hourly
            .variables(0)
            .valuesArray()
            .map((n) => Math.round(n)),
          weather_code: hourly
            .variables(1)
            .valuesArray()
            .map((n) => Math.round(n)),
        },
        daily: {
          time: [
            ...Array(
              (Number(daily.timeEnd()) - Number(daily.time())) /
                daily.interval()
            ),
          ].map(
            (_, i) =>
              new Date(
                (Number(daily.time()) +
                  i * daily.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          weather_code: daily
            .variables(0)
            .valuesArray()
            .map((n) => Math.round(n)),
          temperature_2m_max: daily
            .variables(1)
            .valuesArray()
            .map((n) => Math.round(n)),
          temperature_2m_min: daily
            .variables(2)
            .valuesArray()
            .map((n) => Math.round(n)),
        },
      };
      console.log("Processed weather data:", weatherDataObj);

      return weatherDataObj;
      // 'weatherData' now contains a simple structure with arrays with datetime and weather data
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  async function handleSearch(cityName) {
    setLoading(true);
    const params = {
      latitude: 52.52,
      longitude: 13.41,
      daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", ,],
      hourly: ["temperature_2m", "weather_code"],
      current: [
        "temperature_2m",
        "apparent_temperature",
        "relative_humidity_2m",
        "precipitation",
        "weather_code",
        "wind_speed_10m",
      ],
    };
    try {
      // Your existing search logic
      const location = await geocodeLocation(cityName);
      console.log(
        `Found ${location.name}: ${location.latitude}, ${location.longitude}`
      );
      params.latitude = location.latitude;
      params.longitude = location.longitude;
      setLocationData(location);
      const response = await handleFetchAPI(url, params);
      console.log("Weather data response:", response);
      setWeatherData(response);
      setLoading(false);
    } catch (error) {
      console.error("Error in handleSearch", error);
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          handleSearch(formData.get("search"));
        }}
      >
        <input type="text" name="search" placeholder="Search for a place..." />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {weatherData && weatherData.current && weatherData.daily && (
        <>
          <div>
            <p>{locationData.name}</p>
            <p>
              Current date:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            Temperature: {weatherData.current.temperature_2m ?? "N/A"} °C
            <br />
            Feels like: {weatherData.current.apparent_temperature ?? "N/A"} °C
            <br />
            Humidity: {weatherData.current.relative_humidity_2m ?? "N/A"} %
            <br />
            Precipitation: {weatherData.current.precipitation ?? "N/A"} mm
            <br />
            Wind Speed{" "}
            {weatherData.current.wind_speed_10m
              ? weatherData.current.wind_speed_10m
              : "N/A"}{" "}
            km/h
            <br />
            Daily forecast:
          </div>
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
