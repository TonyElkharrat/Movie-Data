import { useRef } from "react";
import "../Search/Search.css";

export const Search = ({ query, setQuery }) => {
  const inputElement = useRef(null);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
      autoFocus
    />
  );
};
