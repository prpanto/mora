import { CarouselItem } from "~/components/ui/carousel";
import { Star, Clock } from "lucide-react";
import type { MovieListResponse } from "~/types";
import { Link } from "react-router";
import MovieGenresItem from "~/components/landing/home/movie-genres-item";

interface MovieListProps {
  data?: MovieListResponse;
}

export default function MoviesListCard({ data }: MovieListProps) {
  return (
    data?.results.map((movie) => (
      <CarouselItem
        key={movie.id}
        className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
      >
        <div className="size-full">
          <Link to={`/movie/${movie.id}`} className="group block size-full">
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/30">
              {/* Poster Image */}
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/placeholder.png"
                }
                alt={movie.title}
                loading="lazy"
                className="size-full object-cover"
              />

              {/* Floating Top Rating Badge */}
              <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-amber-300 backdrop-blur-md border border-white/10 shadow-sm">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                <span>{movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "N/A"}</span>
              </div>

              {/* Cinematic Bottom Gradient Overlay */}
              <div className="absolute inset-0 z-1 bg-linear-to-t from-black/95 via-black/60 to-transparent opacity-90" />

              {/* Card Footer Content */}
              <div className="absolute bottom-0 inset-x-0 z-10 p-3 sm:p-3.5 flex flex-col gap-1.5">
                <h3 className="text-white font-bold text-sm sm:text-base line-clamp-1 leading-snug drop-shadow-sm">
                  {movie.title}
                </h3>

                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <div className="flex items-center gap-1 shrink-0">
                    <Clock className="size-3 text-white/60" />
                    <span>
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "Unknown"}
                    </span>
                  </div>

                  <span className="text-white/40">•</span>

                  <div className="truncate">
                    <MovieGenresItem
                      values={movie.genre_ids?.slice(0, 1)}
                      className="flex-nowrap truncate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </CarouselItem>
    ))
  );
}
