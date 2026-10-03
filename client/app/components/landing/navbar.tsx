"use client";

import { useState, useEffect } from "react";
import Logo from "~/components/logo";
import { navigation } from "~/content/landing/navbar";
import { Link } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { Search as SearchIcon, Film, Star, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchMoviesQueryOptions } from "~/lib/query";
import type { SearchResponse } from "~/types";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/85 backdrop-blur-md shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3 gap-4">
        {/* Left: Brand Logo & Navigation Links */}
        <div className="flex items-center gap-8">
          <Logo className="gap-2 text-primary [&>span]:text-white" />

          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Center: Search Command Palette Trigger */}
        <Search />

        {/* Right: Auth Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 hidden sm:inline-flex"
          >
            <Link to="/register">Register</Link>
          </Button>

          <Button asChild size="sm" className="font-semibold shadow-xs">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Search() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState(q);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQ(q), 300);
    return () => window.clearTimeout(timer);
  }, [q]);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K opens the search dialog
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !open)) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const { data, isFetching } = useQuery({
    ...searchMoviesQueryOptions(debouncedQ),
    enabled: !!debouncedQ.trim(),
  });
  const movies = (data as SearchResponse | undefined)?.results;
  const total_pages = (data as SearchResponse | undefined)?.total_pages;
  const hasResults = Boolean((movies && movies.length > 0) || isFetching);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setQ("");
          setDebouncedQ("");
        }
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative h-9 w-44 sm:w-60 md:w-72 justify-between rounded-xl border-white/15 bg-white/10 hover:bg-white/15 text-xs sm:text-sm text-white/70 hover:text-white shadow-2xs px-3 cursor-pointer transition-colors backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 truncate">
            <SearchIcon className="size-4 shrink-0 text-white/60" />
            <span className="truncate">Search movies...</span>
          </div>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] font-medium text-white/70 sm:inline-flex">
            <span>⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className={cn(
          "w-full p-0 gap-0 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl transition-all duration-300",
          hasResults ? "max-w-6xl xl:max-w-7xl" : "max-w-2xl"
        )}
      >
        <DialogHeader className="p-3 sm:p-4 border-b border-border">
          <DialogTitle className="sr-only">Search Movies</DialogTitle>
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3 size-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search movies by title, keyword..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-11 pl-10 pr-36 text-base text-foreground placeholder:text-muted-foreground bg-transparent border-0 focus-visible:ring-0 shadow-none"
              autoFocus
            />

            {/* Clear and Close Action Buttons */}
            <div className="absolute right-2 flex items-center gap-1.5">
              {q && (
                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                    setDebouncedQ("");
                  }}
                  className="px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/80 hover:bg-muted rounded-md transition-colors cursor-pointer flex items-center gap-1"
                  aria-label="Clear Search Input"
                >
                  <X className="size-3" />
                  <span>Clear</span>
                </button>
              )}

              <DialogClose asChild>
                <button
                  type="button"
                  className="px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/40 hover:bg-muted border border-border/60 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                  aria-label="Close Dialog"
                >
                  <span>Close</span>
                  <kbd className="hidden sm:inline font-mono text-[10px] text-muted-foreground/80">ESC</kbd>
                </button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto p-4 sm:p-6">
          {/* Loading Skeleton */}
          {isFetching && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3.5">
              {Array.from({ length: 14 }).map((_, index) => (
                <div key={index} className="aspect-2/3 rounded-xl overflow-hidden bg-muted">
                  <Skeleton className="size-full" />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isFetching && debouncedQ.trim() && (!movies || movies.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Film className="size-12 text-muted-foreground/30 mb-3" />
              <p className="text-base font-semibold text-foreground">No movies found</p>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                We couldn't find any results matching "{debouncedQ}". Try another keyword.
              </p>
            </div>
          )}

          {/* Results Grid */}
          {!isFetching && movies && movies.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3.5">
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="group block size-full focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl border border-border bg-muted/40 transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-md">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-3 size-full text-center text-muted-foreground gap-2">
                        <Film className="size-8 opacity-40" />
                        <span className="text-xs font-medium line-clamp-2">{movie.title}</span>
                      </div>
                    )}

                    {movie.vote_average > 0 && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300 backdrop-blur-md border border-white/10">
                        <Star className="size-2.5 fill-amber-400 text-amber-400" />
                        <span>{movie.vote_average.toFixed(1)}</span>
                      </div>
                    )}

                    {/* Gradient info overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                      <p className="text-xs font-bold text-white line-clamp-2 leading-tight">
                        {movie.title}
                      </p>
                      {movie.release_date && (
                        <p className="text-[10px] text-white/70 mt-0.5">
                          {new Date(movie.release_date).getFullYear()}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {movie.title}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {/* Initial Prompt State */}
          {!debouncedQ.trim() && (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <SearchIcon className="size-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-foreground">Search Movies on Mora</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                Explore thousands of movies, ratings, release dates, and reviews.
              </p>
            </div>
          )}
        </div>

        {total_pages && total_pages > 1 && (
          <div className="p-3 border-t border-border bg-muted/30 flex justify-center">
            <Button variant="ghost" size="sm" asChild>
              <Link
                to={`/search?q=${debouncedQ}`}
                className="font-medium text-xs text-primary hover:underline"
                onClick={() => setOpen(false)}
              >
                View all results &rarr;
              </Link>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
