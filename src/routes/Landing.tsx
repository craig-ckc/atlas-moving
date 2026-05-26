import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';

const HERO_PHOTO =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80';

export function Landing() {
  return (
    <div className="relative min-h-dvh">
      <header className="relative z-10 px-6 pt-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-3">
            <Link
              to="/admin"
              className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:inline-flex"
            >
              Admin
            </Link>
            <Link to="/quote">
              <Button size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>
                Get a quote
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 px-6 pt-10 pb-16 sm:pt-12 lg:pt-16">
        <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p
              className="rise text-[11px] font-semibold tracking-[0.18em] text-brand-700 uppercase"
              style={{ animationDelay: '0ms' }}
            >
              Hello, neighbour
            </p>

            <h1
              className="rise font-display mt-5 text-balance text-[42px] leading-[1.02] font-medium tracking-[-0.02em] text-slate-900 sm:text-[58px] lg:text-[66px]"
              style={{ animationDelay: '120ms' }}
            >
              Moving day,
              <br />
              made <span className="text-brand-700">human</span>.
            </h1>

            <p
              className="rise mx-auto mt-6 max-w-md text-pretty text-[17px] leading-relaxed text-slate-700 lg:mx-0"
              style={{ animationDelay: '260ms' }}
            >
              Tell us a little about your move — we'll bring the boxes, the truck,
              and the coffee.
            </p>

            <div
              className="rise mt-8 flex flex-col items-center gap-3 lg:items-start"
              style={{ animationDelay: '380ms' }}
            >
              <Link to="/quote">
                <Button size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
                  Start my quote
                </Button>
              </Link>
              <p className="text-xs text-slate-600">
                Free · You'll hear back within a day · No spam, ever
              </p>
            </div>
          </div>

          <div
            className="rise order-1 lg:order-2"
            style={{ animationDelay: '180ms' }}
          >
            <HeroPhoto />
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-6 pb-8 text-center">
        <p className="text-xs text-slate-500">© Atlas Moving</p>
      </footer>
    </div>
  );
}

function HeroPhoto() {
  return (
    <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-brand-100 to-brand-200 ring-1 ring-white/60 card-shadow lg:aspect-[5/6]">
      <img
        src={HERO_PHOTO}
        alt="Welcome to a new home"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent"
      />
      <figcaption className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
        <span className="text-[13px] font-medium tracking-tight">
          Welcome home
        </span>
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase backdrop-blur">
          New chapter
        </span>
      </figcaption>
    </figure>
  );
}
