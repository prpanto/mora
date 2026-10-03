import type { MovieDetails } from "~/types";
import MovieSection from "./movie-section";
import MovieSkeleton from "./movie-skeleton"

interface MovieDetailsProps {
  movie: MovieDetails | undefined;
  isPending: boolean;
}

export default function MovieDetail({ movie, isPending }: MovieDetailsProps) {
  if (isPending) return (<MovieSkeleton />);

  return (movie && <MovieSection movie={movie} />);
};
