import { useState } from "react";
import "../..//styles/SettingsMenu.css";

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
    } finally {
      setTimeout(() => {
        setIsOpen(!isOpen);
      }, 500);
    }
  };

  return (
    <div className="SettingsMenu">
      <button className=" SettingsButton f" onClick={() => setIsOpen(!isOpen)}>
        <img src="/assets/images/icon-units.svg" alt="settings icon" />
        Units
        <img src="/assets/images/icon-dropdown.svg" alt="Dropdown Icon" />
      </button>
      {isOpen && (
        <div className="UnitsDropdownMenu">
          <button className="SwitchButton" onClick={handleSwitchUnitType}>
            Switch to {unitType === "imperial" ? "Metric" : "Imperial"}
          </button>

          <div className="DropdownSection">
            <div className="DropdownLabel">Temperature</div>
            <div className="OptionsContainer">
              <button
                className={`OptionButton ${
                  (unitType === "imperial" ? "fahrenheit" : "celsius") ===
                  "celsius"
                    ? "selected"
                    : ""
                }`}
                onClick={() => updateUnits("temperature_unit", "celsius")}
              >
                <span>Celsius (°C)</span>
                {(unitType === "imperial" ? "fahrenheit" : "celsius") ===
                  "celsius" && <span className="Checkmark">✓</span>}
              </button>
              <button
                className={`OptionButton ${
                  (unitType === "imperial" ? "fahrenheit" : "celsius") ===
                  "fahrenheit"
                    ? "selected"
                    : ""
                }`}
                onClick={() => updateUnits("temperature_unit", "fahrenheit")}
              >
                <span>Fahrenheit (°F)</span>
                {(unitType === "imperial" ? "fahrenheit" : "celsius") ===
                  "fahrenheit" && <span className="Checkmark">✓</span>}
              </button>
            </div>
            <div className="Separator"></div>
          </div>

          <div className="DropdownSection">
            <div className="DropdownLabel">Wind Speed</div>
            <div className="OptionsContainer">
              <button
                className={`OptionButton ${
                  (unitType === "imperial" ? "mph" : "kmh") === "kmh"
                    ? "selected"
                    : ""
                }`}
                onClick={() => updateUnits("wind_speed_unit", "kmh")}
              >
                <span>km/h</span>
                {(unitType === "imperial" ? "mph" : "kmh") === "kmh" && (
                  <span className="Checkmark">✓</span>
                )}
              </button>
              <button
                className={`OptionButton ${
                  (unitType === "imperial" ? "mph" : "kmh") === "mph"
                    ? "selected"
                    : ""
                }`}
                onClick={() => updateUnits("wind_speed_unit", "mph")}
              >
                <span>mph</span>
                {(unitType === "imperial" ? "mph" : "kmh") === "mph" && (
                  <span className="Checkmark">✓</span>
                )}
              </button>
            </div>
            <div className="Separator"></div>
          </div>

          <div className="DropdownSection">
            <div className="DropdownLabel">Precipitation</div>
            <div className="OptionsContainer">
              <button
                className={`OptionButton ${
                  (unitType === "imperial" ? "inch" : "mm") === "mm"
                    ? "selected"
                    : ""
                }`}
                onClick={() => updateUnits("precipitation_unit", "mm")}
              >
                <span>Millimeters (mm)</span>
                {(unitType === "imperial" ? "inch" : "mm") === "mm" && (
                  <span className="Checkmark">✓</span>
                )}
              </button>
              <button
                className={`OptionButton ${
                  (unitType === "imperial" ? "inch" : "mm") === "inch"
                    ? "selected"
                    : ""
                }`}
                onClick={() => updateUnits("precipitation_unit", "inch")}
              >
                <span>Inches (in)</span>
                {(unitType === "imperial" ? "inch" : "mm") === "inch" && (
                  <span className="Checkmark">✓</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
