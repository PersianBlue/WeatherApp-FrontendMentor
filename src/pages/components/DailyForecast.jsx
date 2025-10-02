import weatherDescriptions from "../../../assets/weatherDescriptions.json";
import "../../styles/DailyForecast.css";

export default function DailyForecast({ weatherData }) {
  if (!weatherData) {
    return null;
  }
  return (
    <div className="DailyForecastContainer">
      <h1>Daily forecast</h1>
      <div className="DailyForecast">
        {weatherData.daily.time &&
          weatherData.daily.time.map((date, index) => (
            <div className="WeatherCard" key={date}>
              <p className="cardLabel">
                {new Date(date).toLocaleString("en", { weekday: "long" })}
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
                  °C
                </span>
                <span className="MinTemperature">
                  {weatherData.daily.temperature_2m_min
                    ? weatherData.daily.temperature_2m_min[index]
                    : "N/A"}{" "}
                  °C
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
