export default function SearchForm({ handleSearch, params }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        handleSearch(formData.get("search"), params);
      }}
    >
      <input type="text" name="search" placeholder="Search for a place..." />
      <button type="submit">Search</button>
    </form>
  );
}
