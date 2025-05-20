import { Link } from "react-router";
import { SearchInput } from "./SearchInput";

export function Header() {
  return (
    <div className="flex h-[150px]">
      <div className="absolute w-full justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <Link to={`/`}>
            <img
              src="https://download.logo.wine/logo/Star_Wars/Star_Wars-Logo.wine.png"
              alt=""
              className="h-36 mb-5  filter brightness-0 invert"
            />
          </Link>
        </div>
      </div>
      <div className="ml-auto flex items-center">
        <SearchInput />
      </div>
    </div>
  );
}