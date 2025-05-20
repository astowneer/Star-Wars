import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router";

type Film = {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
};

type FilmEdge = {
  node: Film;
};

const GET_FILMS = gql`
  query GetFilms($first: Int, $after: String) {
    allFilms(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          director
          releaseDate
        }
      }
    }
  }
`;

export const FilmList = () => {
  const [after, setAfter] = useState<string | null>(null);
  const { loading, error, data, fetchMore } = useQuery(GET_FILMS, {
    variables: { first: 3, after }
  });

  if (loading && !data) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const films: Film[] = data?.allFilms?.edges.map((edge: FilmEdge) => edge.node) || [];
  const { hasNextPage, endCursor } = data?.allFilms?.pageInfo || {};

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchMore({
      variables: { first: 3, after: endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          allFilms: {
            ...fetchMoreResult.allFilms,
            edges: [...prev.allFilms.edges, ...fetchMoreResult.allFilms.edges],
          },
        };
      },
    });
  };

  return (
    <div className="p-4">
      <div className="grid gap-4">
        {films.map((film: Film) => (
          <Link
            to={`/film/${film.id}`}
            key={film.id}
            className="p-4 rounded-lg bg-white/10 hover:bg-white/20 text-white shadow transition"
          >
            <h2 className="text-xl font-bold">{film.title}</h2>
            <p className="text-sm">Director: {film.director}</p>
            <p className="text-sm">
              Release Date: {new Date(film.releaseDate).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={loadMore}
          className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded shadow"
        >
          Load More
        </button>
      )}
    </div>
  );
};
