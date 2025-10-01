export default function SearchForm({ handleSearch, params }) {
  return (
    <form
      id="SearchContainer"
      className=""
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        handleSearch(formData.get("search"), params);
      }}
    >
      <div className="bg-neutral-800 placeholder-neutral-200 text-neutral-0 flex flex-col gap-4 md:flex-row md:items-center md:gap-4">
        {/* <img
          className="w-5 h-5"
          src="../../../assets/images/icon-search.svg"
          alt="search icon"
        /> */}
        <input
          style={{
            backgroundImage: "url(../../../assets/images/icon-search.svg)",
            backgroundRepeat: "no-repeat",
            paddingLeft: "30px",
          }}
          //   style={{ border: "4px", borderColor: "white", borderWidth: "10px" }}

          type="text"
          name="search"
          placeholder="Search for a place..."
        />
      </div>
      <button
        style={{ backgroundColor: "hsl(233, 67%, 56%)", borderRadius: "12px" }}
        className="w-full md:w-auto  !text-neutral-0 rounded-xl py-4 px-6 text-center !hover:bg-blue-600 transition-colors flex items-center justify-center gap-4 md:py-3 md:px-6"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
