import type { MovieListResponse } from "~/types/movies";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import MoviesListCard from "./movies-list-card";
import MoviesListSkeleton from "./movies-list-skeleton";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

interface MovieListProps {
  title: string;
  to: string;
  data?: MovieListResponse;
  isPending?: boolean;
}

export default function MoviesList({ title, to, data, isPending }: MovieListProps) {
  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-12 bg-background/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 rounded-full bg-primary" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
          </div>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="group text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <Link to={`/movies/${to}`} className="flex items-center gap-1 font-semibold text-sm">
              <span>View All</span>
              <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          className="relative w-full"
        >
          <CarouselContent className="-ml-3">
            {isPending ? <MoviesListSkeleton /> : <MoviesListCard data={data} />}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex -left-4 lg:-left-6 size-10 bg-background/90 backdrop-blur-md border-border/80 shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" />
          <CarouselNext className="hidden md:flex -right-4 lg:-right-6 size-10 bg-background/90 backdrop-blur-md border-border/80 shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" />
        </Carousel>
      </div>
    </section>
  );
}
