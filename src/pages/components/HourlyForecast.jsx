import { useMemo, useState } from "react";
import weatherDescriptions from "/assets/weatherDescriptions.json";
import "../../styles/HourlyForecast.css";

export default function HourlyForecast({ weatherData, params, loading }) {
  if (!weatherData || !weatherData.hourly.time) {
    return null;
  }
  const tempUnit = params.temperature_unit === "fahrenheit" ? "°F" : "°C";

  // if (loading || !weatherData) {
  //   const arr = [1, 3, 4, 5, 6, 7, 8, 9, 10];
  //   return (
  //     <div className="HourlyForecastContainer skeleton">
  //       <div className="HourlyForecastHeader">
  //         <h1>Hourly forecast</h1>
  //         <button
  //           // className="HourlyForecastDropdown"
  //           onClick={() => setShowDropdown(!showDropdown)}
  //         >
  //           <label>
  //             {/* {daysData[selectedDay]?.date.toLocaleString("en-us", {
  //             weekday: "long",
  //           })} */}
  //           </label>
  //           <select className="HourlyForecastDropdown skeleton"></select>
  //           {/* <img
  //           src="../../../assets/images/icon-dropdown.svg"
  //           alt="Dropdown Icon"
  //         /> */}
  //         </button>
  //       </div>
  //       {arr.map((hour, index) => (
  //         <div key={index} className="HourlyForecastCard">
  //           <p className="skeleton skeleton-text"></p>
  //           <p></p>
  //           <p></p>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  const getDayDisplay = (dateLocal, index) => {
    const now = new Date();
    const todayLocal = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    if (dateLocal.getTime() === todayLocal.getTime()) {
      return "Today";
    } else {
      return dateLocal.toLocaleDateString("en-US", { weekday: "long" });
    }
  };

  // Get data for selected day
  const getSelectedDayData = () => {
    if (!daysData[selectedDay]) return [];

    const dayData = daysData[selectedDay];
    const now = new Date();

    // Check if selected day is today (timezone-safe)
    const todayLocal = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const selectedDayLocal = new Date(
      dayData.date.getFullYear(),
      dayData.date.getMonth(),
      dayData.date.getDate()
    );

    const isToday = selectedDayLocal.getTime() === todayLocal.getTime();

    // If today, only show future hours
    if (isToday) {
      return dayData.hours.filter((hour) => new Date(hour.time) >= now);
    }

    // For other days, show all hours
    return dayData.hours;
  };
  // Group data by day
  const daysData = useMemo(() => {
    if (!weatherData?.hourly?.time) return [];

    const groups = {};
    const now = new Date();

    // Filter out all past hours first
    weatherData.hourly.time.forEach((time, index) => {
      const hourDate = new Date(time);
      if (hourDate < now) return; // Skip past hours

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
  console.log("Selected day", selectedDay);

  return (
    <div className="HourlyForecastContainer">
      <div className="HourlyForecastHeader">
        <h1>Hourly forecast</h1>
        <button
          // className="HourlyForecastDropdown"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <label>
            {/* {daysData[selectedDay]?.date.toLocaleString("en-us", {
              weekday: "long",
            })} */}
          </label>
          <select
            className="HourlyForecastDropdown"
            value={selectedDay}
            onChange={(e) => setSelectedDay(parseInt(e.target.value))}
          >
            {daysData.map((day, index) => (
              <option key={index} value={index}>
                {day.display}
              </option>
            ))}
          </select>
          {/* <img
            src="../../../assets/images/icon-dropdown.svg"
            alt="Dropdown Icon"
          /> */}
        </button>
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
