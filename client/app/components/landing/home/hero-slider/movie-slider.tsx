"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import {
  Star,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Clapperboard,
  Info,
  Sparkles,
  Film,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import type { Movie } from "~/types";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Link } from "react-router";
import MovieGenresItem from "~/components/landing/home/movie-genres-item";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

interface MovieSliderProps {
  data: Movie[] | undefined;
}

export default function MovieSlider({ data }: MovieSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [activeTrailerMovie, setActiveTrailerMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 6000,
            stopOnInteraction: false,
          }),
        ]}
        className="size-full"
      >
        <CarouselContent className="h-screen ml-0">
          {data.map((movie, index) => (
            <CarouselItem key={movie.id || index} className="h-screen w-full pl-0 select-none">
              <div className="relative size-full">
                <img
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                      : "/placeholder.png"
                  }
                  alt={movie.title}
                  className="size-full object-cover object-center filter brightness-85"
                />

                <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/70 md:via-black/50 to-transparent z-1" />
                <div className="size-full absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent z-1" />
                <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent z-1 pointer-events-none" />

                <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24">
                  <div className="flex flex-col gap-5 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/20 text-primary border border-primary/30 backdrop-blur-md px-3 py-1 font-semibold text-xs tracking-wider uppercase gap-1.5 shadow-sm">
                        <Sparkles className="size-3.5 animate-pulse" />
                        Featured Spotlight
                      </Badge>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight drop-shadow-xl leading-[1.08]">
                      {movie.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-white text-sm font-semibold shadow-sm">
                        <Star className="size-4 text-amber-400 fill-amber-400" />
                        <span>
                          {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "N/A"}
                          <span className="text-white/60 font-normal text-xs ml-0.5">/10</span>
                        </span>
                      </div>

                      {movie.release_date && (
                        <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-white/90 text-sm shadow-sm">
                          <Calendar className="size-3.5 text-white/70" />
                          <span>{new Date(movie.release_date).getFullYear()}</span>
                        </div>
                      )}

                       <MovieGenresItem values={movie.genre_ids} className="flex-wrap gap-2" />
                    </div>

                    {movie.overview && (
                      <p className="text-sm sm:text-base lg:text-lg text-white/80 line-clamp-3 max-w-2xl leading-relaxed drop-shadow-sm font-light">
                        {movie.overview}
                      </p>
                    )}

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <Button
                        size="lg"
                        asChild
                      >
                        <Link to={`/movie/${movie.id}`}>
                          <Info className="size-4" />
                          <span>View Details</span>
                        </Link>
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => setActiveTrailerMovie(movie)}
                      >
                        <Clapperboard />
                        <span>Watch Trailer</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <button
        onClick={() => api?.scrollPrev()}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
      >
        <ChevronLeft className="size-6" />
      </button>

      <button
        onClick={() => api?.scrollNext()}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
      >
        <ChevronRight className="size-6" />
      </button>

      <div className="absolute bottom-8 left-6 sm:left-12 md:left-16 lg:left-24 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-500 cursor-pointer",
                index + 1 === current
                  ? "bg-primary w-8 shadow-sm shadow-primary"
                  : "bg-white/30 hover:bg-white/60 w-2.5"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <span className="text-xs font-mono font-semibold text-white/70 tracking-widest bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          {String(current).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>

      <Dialog
        open={!!activeTrailerMovie}
        onOpenChange={(open) => !open && setActiveTrailerMovie(null)}
      >
        <DialogContent className="sm:max-w-4xl p-2 bg-black/95 border-zinc-800 text-white overflow-hidden">
          <DialogHeader className="p-2 pb-0">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Film className="size-5 text-primary" />
              {activeTrailerMovie?.title} — Official Trailer
            </DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full mt-2 rounded-lg overflow-hidden bg-zinc-950">
            {activeTrailerMovie && (
              <iframe
                src={`https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(
                  activeTrailerMovie.title + " official trailer"
                )}`}
                title={`${activeTrailerMovie.title} Trailer`}
                className="size-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
