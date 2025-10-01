import { useState } from "react";

export default function SettingsMenu({
  updateUnits,
  switchToImperial,
  switchToMetric,
  unitType,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSwitchUnitType = () => {
    console.log(unitType);
    try {
      if (unitType.toLowerCase() === "metric") {
        switchToImperial();
      } else {
        switchToMetric();
      }
    } catch (error) {
      console.log("error in handleSwitchUnitType", error);
    }
  };

  return (
    <div>
      <button
        className="flex items-center justify-between gap-4 border-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="../../../assets/images/icon-units.svg" alt="settings icon" />
        Units
        <img
          src="../../../assets/images/icon-dropdown.svg"
          alt="Weather Now Logo"
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div>
          <div>
            <button onClick={handleSwitchUnitType}>
              Switch to {unitType === "imperial" ? "Metric" : "Imperial"}
            </button>
          </div>

          <div>
            <p>Temperature</p>
            <div>
              <button
                onClick={() => updateUnits("temperature_unit", "celsius")}
              >
                Celsius (°C)
              </button>
              <button
                onClick={() => updateUnits("temperature_unit", "fahrenheit")}
              >
                Fahrenheit (°F)
              </button>
            </div>
          </div>

          <div>
            <p>Wind Speed</p>
            <div>
              <button onClick={() => updateUnits("wind_speed_unit", "kmh")}>
                km/h
              </button>
              <button onClick={() => updateUnits("wind_speed_unit", "mph")}>
                mph
              </button>
            </div>
          </div>

          <div>
            <p>Precipitation</p>
            <div>
              <button onClick={() => updateUnits("precipitation_unit", "mm")}>
                Millimeters (mm)
              </button>
              <button onClick={() => updateUnits("precipitation_unit", "inch")}>
                Inches (in)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// export default function settingsButton({ switchUnits }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [unitType, setUnitType] = useState("metric");

//   const toggleMenu = () => setIsOpen(!isOpen);
//   return (
//     <div
//       className="settings-container"
//       style={{ position: "relative", display: "inline-block" }}
//     >
//       <button onClick={toggleMenu}>
//         <svg
//           className="cog"
//           width="14"
//           height="15"
//           viewBox="0 0 14 15"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M12.3594 6.73047C12.3867 7.08594 12.3867 7.44141 12.3594 7.76953L13.2344 8.28906C13.4805 8.42578 13.6172 8.72656 13.5352 9.02734C13.2344 10.1758 12.6055 11.2148 11.7852 12.0625C11.5664 12.2539 11.2383 12.3086 10.9922 12.1719L10.1172 11.6523C9.89844 11.8164 9.48828 12.0625 9.21484 12.1719V13.1836C9.21484 13.4844 9.02344 13.7305 8.72266 13.8125C7.60156 14.1133 6.37109 14.1133 5.25 13.8125C4.97656 13.7578 4.75781 13.457 4.75781 13.1836V12.1719C4.48438 12.0625 4.07422 11.8164 3.85547 11.6523L2.98047 12.1719C2.73438 12.3086 2.40625 12.2539 2.1875 12.0625C1.36719 11.2148 0.738281 10.1758 0.4375 9.02734C0.355469 8.72656 0.492188 8.42578 0.738281 8.28906L1.61328 7.76953C1.58594 7.63281 1.58594 7.41406 1.58594 7.25C1.58594 7.11328 1.58594 6.89453 1.61328 6.73047L0.738281 6.23828C0.492188 6.10156 0.355469 5.80078 0.4375 5.5C0.738281 4.35156 1.36719 3.3125 2.1875 2.46484C2.40625 2.27344 2.73438 2.21875 2.98047 2.35547L3.85547 2.875C4.07422 2.71094 4.48438 2.46484 4.75781 2.35547V1.34375C4.75781 1.04297 4.94922 0.796875 5.25 0.714844C6.37109 0.414062 7.60156 0.414062 8.72266 0.714844C8.99609 0.769531 9.21484 1.07031 9.21484 1.34375V2.35547C9.48828 2.46484 9.89844 2.71094 10.1172 2.875L10.9922 2.35547C11.2383 2.21875 11.5664 2.27344 11.7852 2.46484C12.6055 3.3125 13.2344 4.35156 13.5352 5.5C13.6172 5.80078 13.4805 6.10156 13.2344 6.23828L12.3594 6.73047ZM10.9102 8.48047C11.1289 7.33203 11.1289 7.19531 10.9102 6.04688L12.1133 5.36328C11.9492 4.87109 11.5117 4.16016 11.1836 3.77734L9.98047 4.46094C9.13281 3.72266 8.99609 3.64062 7.90234 3.25781V1.86328C7.65625 1.83594 7.24609 1.78125 7 1.78125C6.72656 1.78125 6.31641 1.83594 6.07031 1.86328V3.25781C4.97656 3.64062 4.86719 3.72266 3.99219 4.46094L2.78906 3.77734C2.37891 4.24219 2.07812 4.78906 1.85938 5.36328L3.0625 6.04688C2.84375 7.19531 2.84375 7.33203 3.0625 8.48047L1.85938 9.16406C2.02344 9.65625 2.46094 10.3672 2.78906 10.75L3.99219 10.0664C4.83984 10.8047 4.97656 10.8867 6.07031 11.2695V12.6641C6.31641 12.6914 6.72656 12.7461 7 12.7461C7.24609 12.7461 7.65625 12.6914 7.90234 12.6641V11.2695C8.99609 10.8867 9.10547 10.8047 9.98047 10.0664L11.1836 10.75C11.5117 10.3672 11.9492 9.65625 12.1133 9.16406L10.9102 8.48047ZM7 4.625C8.42188 4.625 9.625 5.82812 9.625 7.25C9.625 8.69922 8.42188 9.875 7 9.875C5.55078 9.875 4.375 8.69922 4.375 7.25C4.375 5.82812 5.55078 4.625 7 4.625ZM7 8.5625C7.71094 8.5625 8.3125 7.98828 8.3125 7.25C8.3125 6.53906 7.71094 5.9375 7 5.9375C6.26172 5.9375 5.6875 6.53906 5.6875 7.25C5.6875 7.98828 6.26172 8.5625 7 8.5625Z"
//             fill="white"
//           ></path>
//         </svg>
//         Units
//         <svg
//           className="angle-down"
//           width="10"
//           height="6"
//           viewBox="0 0 10 6"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M5.12891 5.76562L1.08203 1.74609C0.945312 1.63672 0.945312 1.41797 1.08203 1.28125L1.62891 0.761719C1.76562 0.625 1.95703 0.625 2.09375 0.761719L5.375 3.98828L8.62891 0.761719C8.76562 0.625 8.98438 0.625 9.09375 0.761719L9.64062 1.28125C9.77734 1.41797 9.77734 1.63672 9.64062 1.74609L5.59375 5.76562C5.45703 5.90234 5.26562 5.90234 5.12891 5.76562Z"
//             fill="white"
//           ></path>
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="menu">
//           <button onClick={() => changeUnits(false, true, false)}>
//             Change to Imperial/Metric
//           </button>
//           <button onClick={() => changeUnits(true, false, false)}></button>
//           <p className="text-sm text-gray-300">Temperature</p>
//           <div>Celsius (°C) </div>
//           <div>Fahrehnehit (°F) </div>
//           <hr class="border-gray-500"></hr>
//           <p className="text-sm text-gray-300">Wind Speed</p>
//           <div>km/h </div>
//           <div>mph </div>
//           <hr class="border-gray-500"></hr>
//           <p className="text-sm text-gray-300">Precipitation</p>
//           <div>Millimeters (mm) </div>
//           <div>Inches (in) </div>
//         </div>
//       )}
//       <div></div>
//     </div>
//   );
// }
