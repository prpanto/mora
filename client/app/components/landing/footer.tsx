import Logo from "~/components/logo";
import { movies, pages, socials } from "~/content/landing/footer";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-border/50 bg-background/95 dark:bg-background overflow-hidden">
      {/* Top glowing ambient accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      {/* Ambient Radial Background Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-border/50">
          {/* Brand info (6 cols) */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <Logo className="gap-2.5 text-foreground hover:opacity-90 transition-opacity" />

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Your ultimate movie exploration companion. Discover trending releases,
              ratings, and in-depth film insights in one sleek experience.
            </p>

            <div className="flex items-center gap-2 pt-2">
              {socials.map((social, index) => (
                <Button
                  asChild
                  key={`social-${index}`}
                  size="icon"
                  variant="outline"
                  className="size-9 rounded-xl border-border/60 bg-card/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-xs"
                >
                  <Link
                    to={social.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Social Link"
                  >
                    <social.icon className="size-4 fill-current" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links: Pages (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              Navigation
            </span>

            <ul className="flex flex-col gap-2.5">
              {pages.map((page, index) => (
                <li key={index}>
                  <Link
                    to={page.href}
                    className="w-fit text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 block"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Movies List (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              Movie Categories
            </span>

            <ul className="flex flex-col gap-2.5">
              {movies.map((movie, index) => (
                <li key={index}>
                  <Link
                    to={movie.href}
                    className="w-fit text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 block"
                  >
                    {movie.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="text-center sm:text-left font-normal">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-foreground">Mora</span>. All rights reserved.
          </p>

          <p className="text-center sm:text-right">
            Crafted for movie lovers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
