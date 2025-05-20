import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router";

type Character = {
  id: string;
  name: string;
};

const GET_ALL_CHARACTERS = gql`
  query GetAllCharacters {
    allPeople {
      people {
        id
        name
      }
    }
  }
`;

export const SearchResults = ({ query }: { query: string }) => {
  const { data, loading, error } = useQuery(GET_ALL_CHARACTERS);

  const filteredResults: Character[] =
    !query.trim() || !data?.allPeople?.people
      ? []
      : data.allPeople.people.filter((char: Character) =>
          char.name.toLowerCase().includes(query.trim().toLowerCase())
        );

  if (!query.trim()) return null;
  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  if (filteredResults.length === 0)
    return <div className="text-white">No results found.</div>;

  return (
    <div className="text-white mt-4 space-y-2 bg-[#151515] p-6 rounded-md">
      {filteredResults.map((char) => (
        <div key={char.id}>
          <Link
            to={`/character/${char.id}`}
            className="text-[#9e4f60] uppercase hover:text-[#884452]"
          >
            {char.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
