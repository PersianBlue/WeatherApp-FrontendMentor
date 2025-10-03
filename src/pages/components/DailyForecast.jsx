import weatherDescriptions from "../../../assets/weatherDescriptions.json";
import "../../styles/DailyForecast.css";

export default function DailyForecast({ weatherData, params }) {
  if (!weatherData) {
    return null;
  }
  const tempUnit = params.temperature_unit === "fahrenheit" ? "°F" : "°C";

  return (
    <div className="DailyForecastContainer">
      <h1>Daily forecast</h1>
      <div className="DailyForecast">
        {weatherData.daily.time &&
          weatherData.daily.time.map((date, index) => (
            <div className="WeatherCard" key={date}>
              <p className="cardLabel">
                {new Date(date)
                  .toLocaleString("en", { weekday: "long" })
                  .slice(0, 3)}
              </p>
              <img
                className="WeatherCardIcon"
                height="60px"
                width="60px"
                src={
                  weatherDescriptions[weatherData.daily.weather_code[index]].day
                    .image
                }
                alt="Weather Code Icon"
              ></img>

              <div className="TemperatureRange">
                <span className="MaxTemperature">
                  {weatherData.daily.temperature_2m_max
                    ? weatherData.daily.temperature_2m_max[index]
                    : "N/A"}{" "}
                  {tempUnit}
                </span>
                <span className="MinTemperature">
                  {weatherData.daily.temperature_2m_min
                    ? weatherData.daily.temperature_2m_min[index]
                    : "N/A"}{" "}
                  {tempUnit}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
