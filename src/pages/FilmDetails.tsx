import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Field } from "../components/Field";
import { SearchResultSection } from "../components/SearchResultsSection";
import { decodeGlobalId } from "../lib/utlis";
import { FilmSectionList } from "../components/FilmSectionList";

type Character = {
  id: string;
  name: string;
};

const GET_FILM = gql`
  query GetFilm($id: ID!) {
    film(filmID: $id) {
      id
      title
      director
      episodeID
      director
      producers
      releaseDate
      openingCrawl
      created
      edited
      characterConnection {
        characters {
          id
          name
        }
      }
      planetConnection {
        planets {
          name
        }
      }
      speciesConnection {
        species {
          name
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

export const FilmDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_FILM, {
    variables: { id: decodeGlobalId(id!).type },
  });

  if (loading) return <p className="text-[#aaa]">Loading...</p>;
  if (error) return <p className="text-red-400">Error: {error.message}</p>;

  const film = data.film;
  if (!film) return <p className="text-[#aaa]">No film data.</p>;

  const characters: Character[] = film.characterConnection.characters;
  const planets = film.planetConnection.planets.map((p: any) => p.name);
  const species = film.speciesConnection.species.map((s: any) => s.name);
  const starships = film.starshipConnection.starships.map((s: any) => s.name);
  const vehicles = film.vehicleConnection.vehicles.map((v: any) => v.name);

  const filmSections = [
    { label: "planets", items: planets },
    { label: "species", items: species },
    { label: "starships", items: starships },
    { label: "vehicles", items: vehicles },
  ];

  return (
    <div className="bg-[#151515] p-6 text-white rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-[#9e4f60]">
        Film Details (ID: {id})
      </h2>
      <h3 className="text-xl font-semibold mb-2 text-[#ddd]">
        Title: <span className="text-[#aaa]">{film.title}</span>
      </h3>
      <Field label="Episode" value={film.episodeID} />
      <Field label="Director" value={film.director} />
      <Field label="Producer" value={film.producer} />
      <Field label="Release Date" value={film.releaseDate} />
      <div className="mb-4">
        <strong className="text-[#9e4f60] uppercase">Opening Crawl:</strong>
        <pre className="whitespace-pre-wrap text-[#aaa] bg-[#111111] p-3 mt-1 rounded">
          {film.openingCrawl}
        </pre>
      </div>
      <FilmSectionList sections={filmSections} />
      <Field
        label="Created"
        value={new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(film.created))}
      />
      <Field
        label="Edited"
        value={new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(film.edited))}
      />
      <SearchResultSection
        title="Characters"
        items={characters}
        basePath="character"
      />
    </div>
  );
};
