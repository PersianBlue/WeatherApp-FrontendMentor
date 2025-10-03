import "../../styles/SearchForm.css";

export default function SearchForm({ handleSearch, params }) {
  return (
    <form
      className=""
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        handleSearch(formData.get("search"), params);
      }}
    >
      <div className="searchContainer">
        <input
          className="searchField"
          type="text"
          name="search"
          placeholder="Search for a place..."
        />

        <button
          style={{
            backgroundColor: "hsl(233, 67%, 56%)",
            borderRadius: "20px",
          }}
          className="searchButton"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
}
