// Celsius to Fahrenheit
function celsiusToFahrenheit(c) {
  return Math.round((c * 9) / 5 + 32);
}

// km/h to mph
function kmhToMph(kmh) {
  return Math.round(kmh / 1.60934);
}

// mm to inches
function mmToInches(mm) {
  return Math.round((mm / 25.4) * 100) / 100; // rounded to 2 decimals
}
