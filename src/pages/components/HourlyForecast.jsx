import weatherDescriptions from "../../../assets/weatherDescriptions.json";

export default function HourlyForecast({ weatherData }) {
  if (!weatherData) {
    return null;
  }
  return (
    <>
      <p>Hourly forecast</p>
      <ul>
        {weatherData.hourly.time &&
          weatherData.hourly.time.map((time, index) => (
            <li key={time}>
              {weatherData.hourly.time
                ? new Date(time).toLocaleTimeString([], {
                    hour: "numeric",
                  })
                : "N/A"}{" "}
              {weatherData.hourly.temperature_2m
                ? weatherData.hourly.temperature_2m[index]
                : "N/A"}{" "}
              °C /{" "}
              {
                <img
                  src={
                    weatherDescriptions[weatherData.hourly.weather_code[index]]
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
