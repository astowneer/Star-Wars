import { useSearchParams } from "react-router";
import { SearchResults } from "../components/SearchResults";

function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("query") || "";

  return (
    <div className="p-4">
      <h2 className="text-white text-2xl mb-4">Search results for "{query}"</h2>
      <SearchResults query={query} />
    </div>
  );
}

export default SearchPage;
