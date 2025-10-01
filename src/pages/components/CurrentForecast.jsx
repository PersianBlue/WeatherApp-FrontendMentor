import React from "react";

export default function CurrentForecast({ weatherData, locationData, params }) {
  if (!weatherData || !weatherData.current) {
    return null;
  }
  const tempUnit = params.temperature_unit === "fahrenheit" ? "°F" : "°C";
  const windSpeedUnit = params.wind_speed_unit === "mph" ? "mph" : "km/h";
  const precipitationUnit = params.precipitation_unit === "inch" ? "in" : "mm";

  const temp = weatherData.current.temperature_2m ?? "N/A";
  const apparent_temp = weatherData.current.apparent_temperature ?? "N/A";
  const rel_humidity = weatherData.current.relative_humidity_2m ?? "N/A";
  const precipitation = weatherData.current.precipitation ?? "N/A";
  const wind_speed = weatherData.current.wind_speed_10m ?? "N/A";

  return (
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
        <p>
          Temperature: {temp} {tempUnit}
        </p>
        <p>
          Feels like: {apparent_temp} {tempUnit}
        </p>
        <p>Humidity: {rel_humidity} %</p>
        <p>
          Precipitation: {precipitation} {precipitationUnit}
        </p>
        <p>
          Wind Speed: {wind_speed} {windSpeedUnit}
        </p>
      </div>
    </>
  );
}
