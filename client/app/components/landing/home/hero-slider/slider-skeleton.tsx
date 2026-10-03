"use client";

import { Skeleton } from "~/components/ui/skeleton";

export default function SliderSkeleton() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div className="relative size-full">
        <div className="size-full absolute inset-0 bg-zinc-950 animate-pulse" />

        <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/70 md:via-black/50 to-transparent z-1" />
        <div className="size-full absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent z-1" />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent z-1 pointer-events-none" />

        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24">
          <div className="flex flex-col gap-5 max-w-3xl">
            <Skeleton className="h-6 w-36 rounded-full bg-zinc-800" />

            <div className="space-y-3">
              <Skeleton className="h-10 sm:h-14 lg:h-16 w-3/4 max-w-2xl rounded-xl bg-zinc-800" />
              <Skeleton className="h-10 sm:h-14 lg:h-16 w-1/2 max-w-lg rounded-xl bg-zinc-800" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-8 w-24 rounded-full bg-zinc-800" />
              <Skeleton className="h-8 w-20 rounded-full bg-zinc-800" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-20 rounded-full bg-zinc-800/80" />
                <Skeleton className="h-8 w-18 rounded-full bg-zinc-800/80" />
              </div>
            </div>

            <div className="space-y-2.5 max-w-2xl">
              <Skeleton className="h-4 w-full rounded bg-zinc-800/70" />
              <Skeleton className="h-4 w-11/12 rounded bg-zinc-800/70" />
              <Skeleton className="h-4 w-4/5 rounded bg-zinc-800/70" />
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Skeleton className="h-11 w-36 rounded-xl bg-zinc-700" />
              <Skeleton className="h-11 w-36 rounded-xl bg-zinc-800" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 sm:left-12 md:left-16 lg:left-24 z-20 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-8 rounded-full bg-zinc-700" />
            <Skeleton className="h-2 w-2.5 rounded-full bg-zinc-800" />
            <Skeleton className="h-2 w-2.5 rounded-full bg-zinc-800" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
