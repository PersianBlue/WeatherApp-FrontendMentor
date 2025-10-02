import "../../styles/CurrentForecast.css";

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
      <div className="weatherInfoContainer">
        <div className="weatherInfo">
          <h1 className="location">
            {locationData.name}, {locationData.country}
          </h1>
          <p className="text-neutral-0 ">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="TemperatureContainer">
            <img
              src="../../../assets/images/icon-sunny.webp"
              className="TemperatureIcon"
            />
            <h1 className="TemperatureText">
              {temp} {tempUnit}
            </h1>
          </div>
        </div>
        <div className="WeatherDetailsContainer">
          <div className="WeatherDetails">
            <p className="Label">Feels like:</p>
            <p className="Value">
              {apparent_temp} {tempUnit}
            </p>
          </div>
          <div className="WeatherDetails">
            <p className="Label">Humidity:</p>{" "}
            <p className="Value">{rel_humidity} %</p>
          </div>
          <div className="WeatherDetails">
            <p className="Label">Precipitation:</p>{" "}
            <p className="Value">
              {precipitation} {precipitationUnit}
            </p>
          </div>
          <div className="WeatherDetails">
            <p className="Label">Wind Speed:</p>{" "}
            <p className="Value">
              {wind_speed} {windSpeedUnit}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
