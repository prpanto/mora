import { Skeleton } from "~/components/ui/skeleton";
import { Card } from "~/components/ui/card";

export default function MovieSkeleton() {
  return (
    <section className="relative min-h-screen">
      {/* Hero Header Skeleton */}
      <div className="relative min-h-145 w-full flex items-end bg-black">
        {/* Backdrop Skeleton with Dark Linear Overlay */}
        <div className="-z-1 size-full absolute inset-0 overflow-hidden bg-black">
          <div className="size-full absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/50" />
        </div>

        <div className="p-6 md:p-10 mx-auto w-full max-w-7xl z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 py-6">
            {/* Poster Skeleton */}
            <div className="shrink-0">
              <Skeleton className="h-80 sm:h-96 w-56 sm:w-64 rounded-2xl bg-zinc-800 ring-1 ring-white/10" />
            </div>

            {/* Hero Main Info Skeleton */}
            <div className="flex flex-col justify-end gap-4 w-full">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-6 w-24 rounded-full bg-zinc-800" />
                <Skeleton className="h-6 w-20 rounded-full bg-zinc-800" />
                <Skeleton className="h-6 w-16 rounded-full bg-zinc-800" />
              </div>

              {/* Title & Tagline */}
              <div className="space-y-3">
                <Skeleton className="h-10 sm:h-12 w-3/4 max-w-xl rounded-xl bg-zinc-800" />
                <Skeleton className="h-5 w-1/2 max-w-md rounded-lg bg-zinc-800/70" />
              </div>

              {/* Genre Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Skeleton className="h-6 w-20 rounded-full bg-zinc-800/80" />
                <Skeleton className="h-6 w-16 rounded-full bg-zinc-800/80" />
                <Skeleton className="h-6 w-24 rounded-full bg-zinc-800/80" />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Skeleton className="h-11 w-36 rounded-md bg-zinc-700" />
                <Skeleton className="h-11 w-32 rounded-md bg-zinc-800" />
                <Skeleton className="h-11 w-24 rounded-md bg-zinc-800" />
                <Skeleton className="h-9 w-28 rounded-md bg-zinc-800/60 ml-auto hidden sm:block" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body Skeleton */}
      <div className="px-6 md:px-10 py-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Storyline Card */}
            <Card className="bg-card/60 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Skeleton className="size-9 rounded-xl bg-muted" />
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-28 rounded-md bg-muted" />
                  <Skeleton className="h-3 w-20 rounded-md bg-muted/60" />
                </div>
              </div>

              <div className="space-y-3">
                <Skeleton className="h-4 w-full rounded-md bg-muted" />
                <Skeleton className="h-4 w-11/12 rounded-md bg-muted" />
                <Skeleton className="h-4 w-4/5 rounded-md bg-muted" />
                <Skeleton className="h-4 w-2/3 rounded-md bg-muted/70" />
              </div>
            </Card>

            {/* Bento Grid Metrics (4 Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card
                  key={i}
                  className="bg-card/50 backdrop-blur-sm border-border/60 p-5 rounded-2xl flex flex-col justify-between gap-4"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-16 rounded-md bg-muted" />
                    <Skeleton className="size-4 rounded-full bg-muted" />
                  </div>
                  <div className="space-y-1.5">
                    <Skeleton className="h-7 w-20 rounded-md bg-muted" />
                    <Skeleton className="h-3 w-24 rounded-md bg-muted/60" />
                  </div>
                </Card>
              ))}
            </div>

            {/* Production Studios Card */}
            <Card className="bg-card/60 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Skeleton className="size-9 rounded-xl bg-muted" />
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-36 rounded-md bg-muted" />
                  <Skeleton className="h-3 w-28 rounded-md bg-muted/60" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 bg-background/50 text-center gap-3"
                  >
                    <Skeleton className="h-12 w-full rounded-lg bg-muted" />
                    <div className="w-full space-y-1">
                      <Skeleton className="h-3 w-20 mx-auto rounded-md bg-muted" />
                      <Skeleton className="h-2.5 w-10 mx-auto rounded-md bg-muted/60" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column (4 cols) Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Card className="bg-card/60 p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <Skeleton className="h-5 w-36 rounded-md bg-muted" />
                <Skeleton className="h-4 w-16 rounded-full bg-muted" />
              </div>

              <div className="space-y-4">
                {/* Field 1 */}
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-20 rounded-md bg-muted/70" />
                  <Skeleton className="h-4 w-36 rounded-md bg-muted" />
                </div>

                {/* Field 2 */}
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-24 rounded-md bg-muted/70" />
                  <Skeleton className="h-4 w-28 rounded-md bg-muted" />
                </div>

                {/* Field 3 */}
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-16 rounded-md bg-muted/70" />
                  <Skeleton className="h-5 w-20 rounded-full bg-muted" />
                </div>

                {/* Financials */}
                <div className="pt-2 border-t border-border/50 space-y-2">
                  <Skeleton className="h-3 w-20 rounded-md bg-muted/70" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16 rounded-md bg-muted" />
                    <Skeleton className="h-3 w-20 rounded-md bg-muted" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16 rounded-md bg-muted" />
                    <Skeleton className="h-3 w-24 rounded-md bg-muted" />
                  </div>
                </div>

                {/* Badges section */}
                <div className="pt-2 border-t border-border/50 space-y-2">
                  <Skeleton className="h-3 w-28 rounded-md bg-muted/70" />
                  <div className="flex flex-wrap gap-1.5">
                    <Skeleton className="h-5 w-16 rounded-full bg-muted" />
                    <Skeleton className="h-5 w-14 rounded-full bg-muted" />
                    <Skeleton className="h-5 w-20 rounded-full bg-muted" />
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-4 border-t border-border/50 space-y-2">
                  <Skeleton className="h-9 w-full rounded-md bg-muted" />
                  <Skeleton className="h-9 w-full rounded-md bg-muted" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
