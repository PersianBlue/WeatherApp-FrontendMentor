import weatherDescriptions from "../../../assets/weatherDescriptions.json";

export default function DailyForecast({ weatherData }) {
  if (!weatherData) {
    return null;
  }
  return (
    <>
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
                    weatherDescriptions[weatherData.daily.weather_code[index]]
                      .day.image
                  }
                  alt="Weather Code Icon"
                ></img>
              }
            </li>
          ))}
      </ul>
    </>
  );
}
