import React, { useState } from "react";
import { useNavigate } from "react-router";

export const SearchInput = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-[248px] h-10 bg-[#343434] rounded opacity-70 hover:opacity-100 flex items-center px-2 transition-opacity duration-300"
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent outline-none border-none text-white text-sm w-full placeholder-gray-400"
        placeholder="Search Star Wars"
      />
      <button type="submit">
        <img
          src="https://static-mh.content.disney.io/starwars/assets/navigation/icon_search-957a123fdb62.svg"
          alt=""
          className="h-5"
        />
      </button>
    </form>
  );
};
