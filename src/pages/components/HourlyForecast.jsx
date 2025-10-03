import { useMemo, useState } from "react";
import weatherDescriptions from "../../../assets/weatherDescriptions.json";
import "../../styles/HourlyForecast.css";

export default function HourlyForecast({ weatherData, params }) {
  if (!weatherData || !weatherData.hourly.time) {
    return null;
  }
  const tempUnit = params.temperature_unit === "fahrenheit" ? "°F" : "°C";

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  const getDayDisplay = (date, index) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return "Today";

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  // Get data for selected day
  const getSelectedDayData = () => {
    if (!daysData[selectedDay]) return [];

    const dayData = daysData[selectedDay];

    // If today, only show future hours
    if (selectedDay === 0) {
      const now = new Date();
      return dayData.hours.filter((hour) => new Date(hour.time) >= now);
    }

    // For other days, show all hours
    return dayData.hours;
  };
  // Group data by day
  const daysData = useMemo(() => {
    if (!weatherData?.hourly?.time) return [];

    const groups = {};

    weatherData.hourly.time.forEach((time, index) => {
      const date = new Date(time);
      const dateKey = date.toDateString();

      if (!groups[dateKey]) {
        groups[dateKey] = {
          date: date,
          display: getDayDisplay(date, Object.keys(groups).length),
          hours: [],
        };
      }

      groups[dateKey].hours.push({
        time,
        temperature_2m: weatherData.hourly.temperature_2m[index],
        weather_code: weatherData.hourly.weather_code[index],
      });
    });

    return Object.values(groups).slice(0, 7);
  }, [weatherData]);

  const selectedData = getSelectedDayData();

  return (
    <div className="HourlyForecastContainer">
      <div className="HourlyForecastHeader">
        <h1>Hourly forecast</h1>
        <button
          className="HourlyForecastDropdown"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <label>Select Day:</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(parseInt(e.target.value))}
          >
            {daysData.map((day, index) => (
              <option key={index} value={index}>
                {day.display}
              </option>
            ))}
          </select>
          <img
            src="../../../assets/images/icon-dropdown.svg"
            alt="Dropdown Icon"
          />
        </button>
        {showDropdown && (
          <div className="DayDropdownMenu">
            <div className="Day">
              <button></button>
            </div>
          </div>
        )}
      </div>
      {weatherData.hourly.time &&
        selectedData.map((hour, index) => (
          <div key={index} className="HourlyForecastCard">
            <img
              className="WeatherIcon"
              src={weatherDescriptions[hour.weather_code]?.day?.image}
              alt="Weather Icon"
              height="40px"
              width="40px"
            />
            <span className="HourlyForecastTime">
              {new Date(hour.time).toLocaleTimeString([], {
                hour: "numeric",
                hour12: true,
              })}
            </span>
            <span className="HourlyForecastTemperatureContainer">
              {hour.temperature_2m} {tempUnit}
            </span>
          </div>
        ))}
    </div>
  );
}
