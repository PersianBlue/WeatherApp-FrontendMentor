import { fetchWeatherApi } from "openmeteo";

export async function geocodeLocation(cityName) {
  const location = encodeURIComponent(cityName);
  console.log(location);
  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`;

  const response = await fetch(geocodeUrl);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
      name: data.results[0].name,
      country: data.results[0].country,
    };
  }
  throw new Error("Location not found");
}

export async function handleFetchAPI(url, params) {
  try {
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current();
    const hourly = response.hourly();
    const daily = response.daily();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherDataObj = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature_2m: Math.round(current.variables(0).value()),
        apparent_temperature: Math.round(current.variables(1).value()),
        relative_humidity_2m: Math.round(current.variables(2).value()),
        precipitation: Math.round(current.variables(3).value()),
        weather_code: Math.round(current.variables(4).value()),
        wind_speed_10m: Math.round(current.variables(5).value()),
      },
      hourly: {
        time: [
          ...Array(
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
              hourly.interval()
          ),
        ].map(
          (_, i) =>
            new Date(
              (Number(hourly.time()) +
                i * hourly.interval() +
                utcOffsetSeconds) *
                1000
            )
        ),
        temperature_2m: hourly
          .variables(0)
          .valuesArray()
          .map((n) => Math.round(n)),
        weather_code: hourly
          .variables(1)
          .valuesArray()
          .map((n) => Math.round(n)),
      },
      daily: {
        time: [
          ...Array(
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
          ),
        ].map(
          (_, i) =>
            new Date(
              (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
                1000
            )
        ),
        weather_code: daily
          .variables(0)
          .valuesArray()
          .map((n) => Math.round(n)),
        temperature_2m_max: daily
          .variables(1)
          .valuesArray()
          .map((n) => Math.round(n)),
        temperature_2m_min: daily
          .variables(2)
          .valuesArray()
          .map((n) => Math.round(n)),
      },
    };
    console.log("Processed weather data:", weatherDataObj);

    return weatherDataObj;
    // 'weatherData' now contains a simple structure with arrays with datetime and weather data
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
