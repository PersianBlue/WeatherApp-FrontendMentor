import { useCallback, useEffect } from "react";
import "../../styles/SearchForm.css";

export default function SearchForm({
  handleSearch,
  params,
  query,
  setQuery,
  loading,
  setLoading,
  suggestions,
  setSuggestions,
}) {
  // Debounced search function

  const searchCities = useCallback(async (searchQuery) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchQuery
        )}&count=5`
      );
      const data = await response.json();
      console.log("Suggestions data", data.results);
      setSuggestions(data.results || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setSuggestions([]);
    } finally {
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchCities(query);
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [query, searchCities]);

  const handleSelectCity = (city) => {
    console.log("Setting city:", city);
    setQuery(`${city.name}`);
    setSuggestions([]);
    handleSearch(city.name, city.country, city.longitude, city.latitude);
  };

  return (
    <form
      className=""
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log("Form value:", query);
        handleSearch(query, params);
      }}
    >
      <div className="searchContainer">
        <input
          type="text"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="searchField"
        />
        <button className="searchButton" type="submit">
          Search{" "}
        </button>
        {suggestions.length > 0 && (
          <div className="SuggestionsDropdown">
            {suggestions.map((city) => (
              <button
                key={`${city.id}-${city.latitude}-${city.longitude}`}
                className="SuggestionItem"
                onClick={() => handleSelectCity(city)}
              >
                <div className="CityName">{city.name}</div>
                <div className="CityDetails">
                  {city.admin1 && <span>{city.admin1}, </span>}
                  {city.country}
                </div>
              </button>
            ))}
          </div>
        )}
        {loading && <div className="LoadingText">Searching...</div>}
      </div>
    </form>
  );
}
