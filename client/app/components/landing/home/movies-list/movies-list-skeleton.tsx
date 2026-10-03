import { CarouselItem } from "~/components/ui/carousel";
import { Skeleton } from "~/components/ui/skeleton";

export default function MoviesListSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <CarouselItem
          key={index}
          className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
        >
          <div className="size-full">
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/30 p-3.5 flex flex-col justify-end gap-2">
              <Skeleton className="size-full absolute inset-0 rounded-none bg-muted/60" />
              <div className="relative z-10 space-y-1.5">
                <Skeleton className="h-4 w-3/4 rounded-md bg-muted-foreground/20" />
                <Skeleton className="h-3 w-1/2 rounded-md bg-muted-foreground/15" />
              </div>
            </div>
          </div>
        </CarouselItem>
      ))}
    </>
  );
}
