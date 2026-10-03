import { useState } from "react";
import type { MovieDetails } from "~/types";
import {
  Star,
  Clock,
  Clapperboard,
  Globe,
  Calendar,
  DollarSign,
  TrendingUp,
  Languages,
  Share2,
  Bookmark,
  ExternalLink,
  Check,
  Building2,
  Film,
  Sparkles,
  Quote,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Link } from "react-router";
import { cn } from "~/lib/utils";

export default function MovieSection({ movie }: { movie: MovieDetails }) {
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const formatCurrency = (amount?: number) => {
    if (!amount || amount === 0) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes?: number) => {
    if (!minutes || minutes === 0) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${mins}m`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const profit = movie.revenue && movie.budget ? movie.revenue - movie.budget : 0;

  return (
    <section className="relative min-h-screen">
      {/* Hero Header with Backdrop */}
      <div className="relative min-h-145 w-full flex items-end">
        <div className="-z-1 size-full absolute inset-0 overflow-hidden">
          {movie.backdrop_path ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="size-full object-cover object-center filter brightness-70 transform scale-105"
              />
              <div className="size-full absolute inset-0 bg-linear-to-t from-black via-black/30 to-black/20" />
            </>
          ) : (
            <div className="size-full absolute inset-0 bg-linear-to-t from-black to-black/60" />
          )}
        </div>

        <div className="p-6 md:p-10 mx-auto w-full max-w-7xl z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 py-6">
            {/* Poster Card */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-linear-to- r from-primary/50 to-amber-500/50 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="relative h-80 sm:h-96 w-56 sm:w-64 object-cover rounded-2xl shadow-2xl ring-1 ring-white/10"
                />
              ) : (
                <div className="relative h-80 sm:h-96 w-56 sm:w-64 bg-card/80 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center ring-1 ring-white/10 shadow-2xl">
                  <Clapperboard className="text-muted-foreground size-16 mb-2" />
                  <span className="text-xs text-muted-foreground font-medium">No Poster</span>
                </div>
              )}
            </div>

            {/* Hero Main Info */}
            <div className="flex flex-col justify-end gap-4 w-full">
              <div className="flex flex-wrap items-center gap-2">
                {movie.status && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary border border-primary/30">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />
                    {movie.status}
                  </Badge>
                )}
                {movie.runtime > 0 && (
                  <Badge variant="outline" className="border-white/20 text-white/90 bg-black/40 backdrop-blur-sm">
                    <Clock className="size-3 mr-1" />
                    {formatRuntime(movie.runtime)}
                  </Badge>
                )}
                {movie.release_date && (
                  <Badge variant="outline" className="border-white/20 text-white/90 bg-black/40 backdrop-blur-sm">
                    <Calendar className="size-3 mr-1" />
                    {new Date(movie.release_date).getFullYear()}
                  </Badge>
                )}
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="mt-2 text-base sm:text-lg italic text-amber-200/90 font-light flex items-center gap-2">
                    <Quote className="size-4 shrink-0 rotate-180 text-amber-400/80" />
                    <span>{movie.tagline}</span>
                  </p>
                )}
              </div>

              {/* Genres */}
              {movie?.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {movie.genres.map((genre) => (
                    <Badge
                      key={genre.id}
                      variant="secondary"
                      className="bg-white/10 hover:bg-white/20 text-white border-0 transition-colors"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Dialog open={isTrailerOpen} onOpenChange={setIsTrailerOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="shadow-lg shadow-primary/25 cursor-pointer font-semibold gap-2">
                      <Clapperboard className="size-5" />
                      Watch Trailer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl p-2 bg-black/95 border-zinc-800 text-white overflow-hidden">
                    <DialogHeader className="p-2 pb-0">
                      <DialogTitle className="text-lg font-bold flex items-center gap-2">
                        <Film className="size-5 text-primary" />
                        {movie.title} — Official Trailer
                      </DialogTitle>
                    </DialogHeader>
                    <div className="relative aspect-video w-full mt-2 rounded-lg overflow-hidden bg-zinc-950">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(
                          movie.title + " official trailer"
                        )}`}
                        title={`${movie.title} Trailer`}
                        className="size-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={cn(
                    isBookmarked && "border-amber-500/50 bg-amber-500/20 text-amber-400 hover:text-amber-400 hover:bg-amber-500/40"
                  )}
                >
                  <Bookmark className={cn("size-4", isBookmarked && "fill-current text-amber-400")} />
                  {isBookmarked ? "Bookmarked" : "Add to List"}
                </Button>

                <Button variant="outline" size="lg" onClick={handleShare}>
                  {copied ? <Check className="size-4 text-emerald-400" /> : <Share2 className="size-4" />}
                  {copied ? "Link Copied" : "Share"}
                </Button>

                {movie.homepage && (
                  <Button variant="ghost" size="sm" asChild className="text-white/80 hover:text-white hover:bg-white/10 ml-auto">
                    <Link to={movie.homepage} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                      <Globe className="size-4" />
                      <span>Official Site</span>
                      <ExternalLink className="size-3 opacity-70" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="px-6 md:px-10 py-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Synopsis, Bento Metrics, Studios */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Storyline Card */}
            <Card className="relative overflow-hidden bg-card/60 p-6 sm:p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-foreground">Storyline</h2>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Synopsis & Plot</span>
                  </div>
                </div>
              </div>

              <p className="text-base sm:text-lg/relaxed text-muted-foreground font-normal">
                {movie.overview || "No overview available for this title."}
              </p>
            </Card>

            {/* Bento Grid Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Score Card */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/60 hover:border-amber-500/40 transition duration-300 p-5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-muted-foreground mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">Rating</span>
                  <Star className="size-4 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                      {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">/ 10</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {movie.vote_count ? `${movie.vote_count.toLocaleString()} votes` : "No votes"}
                  </p>
                </div>
              </Card>

              {/* Runtime Card */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/60 hover:border-primary/40 transition duration-300 p-5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-muted-foreground mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">Duration</span>
                  <Clock className="size-4 text-primary" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
                    {formatRuntime(movie.runtime)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {movie.runtime ? `${movie.runtime} minutes total` : "Standard feature"}
                  </p>
                </div>
              </Card>

              {/* Box Office / Budget */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/60 hover:border-emerald-500/40 transition duration-300 p-5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-muted-foreground mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">Revenue</span>
                  <DollarSign className="size-4 text-emerald-500" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-foreground truncate">
                    {formatCurrency(movie.revenue)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {movie.budget ? `Budget: ${formatCurrency(movie.budget)}` : "Budget undisclosed"}
                  </p>
                </div>
              </Card>

              {/* Popularity Card */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/60 hover:border-violet-500/40 transition duration-300 p-5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-muted-foreground mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">Popularity</span>
                  <TrendingUp className="size-4 text-violet-500" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
                    {movie.popularity ? Math.round(movie.popularity).toLocaleString() : "N/A"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">TMDB Trend Score</p>
                </div>
              </Card>
            </div>

            {/* Production Studios Section */}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <Card className="bg-card/60 p-6 sm:p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Building2 className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Production Studios</h3>
                    <p className="text-xs text-muted-foreground">Companies behind this movie</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {movie.production_companies.map((company) => (
                    <div
                      key={company.id}
                      className="group flex flex-col items-center justify-center p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/40 transition-all duration-300 text-center gap-3"
                    >
                      <div className="h-16 w-full flex items-center justify-center p-2.5 rounded-lg bg-white shadow-2xs border border-zinc-200/80 dark:border-white/10">
                        {company.logo_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                            alt={company.name}
                            className="max-h-11 max-w-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <Film className="size-6 text-zinc-400" />
                        )}
                      </div>
                      <div className="w-full">
                        <p className="text-xs font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {company.name}
                        </p>
                        {company.origin_country && (
                          <span className="text-[10px] text-muted-foreground uppercase font-medium">
                            {company.origin_country}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column (4 cols): Detailed Metadata & Facts Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Card className="bg-card/60 p-6 flex flex-col gap-6">
              <h3 className="text-lg font-bold text-foreground border-b border-border/60 pb-3 flex items-center justify-between">
                <span>Movie Information</span>
                <Badge variant="outline" className="text-xs font-normal">
                  ID: #{movie.id}
                </Badge>
              </h3>

              <div className="flex flex-col gap-4 text-sm">
                {/* Original Title */}
                {movie.original_title && movie.original_title !== movie.title && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Original Title
                    </span>
                    <span className="text-foreground font-semibold">{movie.original_title}</span>
                  </div>
                )}

                {/* Release Date */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Release Date
                  </span>
                  <span className="text-foreground font-semibold">{formatDate(movie.release_date)}</span>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Status</span>
                  <div>
                    <Badge variant="secondary" className="font-medium">
                      {movie.status || "Unknown"}
                    </Badge>
                  </div>
                </div>

                {/* Financial Summary */}
                {(movie.budget > 0 || movie.revenue > 0) && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Financials
                    </span>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-semibold text-foreground">{formatCurrency(movie.budget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="font-semibold text-foreground">{formatCurrency(movie.revenue)}</span>
                      </div>
                      {profit !== 0 && (
                        <div className="flex justify-between pt-1 border-t border-dashed border-border">
                          <span className="text-muted-foreground">Net:</span>
                          <span className={cn("font-bold", profit > 0 ? "text-emerald-500" : "text-destructive")}>
                            {profit > 0 ? `+${formatCurrency(profit)}` : formatCurrency(profit)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Spoken Languages */}
                {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      <Languages className="size-3.5" />
                      <span>Audio & Languages</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {movie.spoken_languages.map((lang, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs font-normal">
                          {lang.english_name || lang.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Origin Countries */}
                {movie.production_countries && movie.production_countries.length > 0 && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Country of Origin
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {movie.production_countries.map((country, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs font-normal">
                          {country.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* External Links */}
                {(movie.imdb_id || movie.homepage) && (
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-border/50">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      External Profiles
                    </span>
                    <div className="flex flex-col gap-2">
                      {movie.imdb_id && (
                        <Button variant="outline" size="sm" asChild className="w-full justify-between">
                          <Link
                            to={`https://www.imdb.com/title/${movie.imdb_id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between w-full"
                          >
                            <span className="font-semibold text-amber-500">IMDb Page</span>
                            <ExternalLink className="size-3.5 opacity-70" />
                          </Link>
                        </Button>
                      )}

                      {movie.homepage && (
                        <Button variant="outline" size="sm" asChild className="w-full justify-between">
                          <Link
                            to={movie.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between w-full"
                          >
                            <span>Official Website</span>
                            <ExternalLink className="size-3.5 opacity-70" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
