import { useParams } from "react-router";
import { Field } from "../components/Field";
import { SearchResultSection } from "../components/SearchResultsSection";
import { gql, useQuery } from "@apollo/client";
import { decodeGlobalId } from "../lib/utlis";

interface CharacterDetailsProps {
  name: string;
  gender: string;
  birthYear: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  homeworld: {
    name: string;
  };
  species: {
    name: string;
  } | null;
  created: string;
  edited: string;
  filmConnection: {
    films: {
      id: string;
      title: string;
    }[];
  };
  starshipConnection: {
    starships: {
      name: string;
    }[];
  };
  vehicleConnection: {
    vehicles: {
      name: string;
    }[];
  };
}


const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    person(personID: $id) {
      name
      gender
      birthYear
      height
      mass
      hairColor
      skinColor
      eyeColor
      homeworld {
        name
      }
      species {
        name
      }
      created
      edited
      filmConnection {
        films {
          id
          title
        }
      }
      starshipConnection {
        starships {
          name
        }
      }
      vehicleConnection {
        vehicles {
          name
        }
      }
    }
  }
`;

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<{ person: CharacterDetailsProps }>(
    GET_CHARACTER,
    {
      variables: { id: decodeGlobalId(id!).type },
    }
  );

  if (loading)
    return <div className="text-gray-300 p-4">Loading character...</div>;
  if (error)
    return <div className="text-red-500 p-4">Error: {error.message}</div>;
  if (!data?.person)
    return <div className="text-red-400 p-4">Character not found.</div>;

  const character = data.person;

  return (
    <div className="bg-[#151515] p-6 text-white rounded-md max-w-2xl mx-auto mt-6 shadow-lg bg-[url('https://static-mh.content.disney.io/starwars/assets/shared/bg_hash@2x-bd5b31294ea9.png')] bg-[length:7px] bg-repeat-x bg-left-top">
      <h2 className="text-3xl font-semibold text-[#ddd] uppercase mb-4">
        {character.name}
      </h2>
      <div className="space-y-2 text-sm py-5">
        <Field label="Gender" value={character.gender} />
        <Field label="Birth Year" value={character.birthYear} />
        <Field label="Height" value={`${character.height} cm`} />
        <Field label="Mass" value={`${character.mass} kg`} />
        <Field label="Hair Color" value={character.hairColor} />
        <Field label="Skin Color" value={character.skinColor} />
        <Field label="Eye Color" value={character.eyeColor} />
        <Field
          label="Homeworld"
          value={character.homeworld?.name || "Unknown"}
        />
        <Field label="Species" value={character.species?.name || "Unknown"} />
        <Field
          label="Created"
          value={new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(character.created))}
        />
        <Field
          label="Edited"
          value={new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(character.edited))}
        />
      </div>
      <SearchResultSection
        title="Films"
        items={character.filmConnection.films.map((film) => ({
          id: film.id,
          title: film.title,
        }))}
        basePath="film"
      />
    </div>
  );
};
