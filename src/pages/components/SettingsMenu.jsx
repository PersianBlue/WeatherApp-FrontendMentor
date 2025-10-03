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
          alt="Dropdown Icon"
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
