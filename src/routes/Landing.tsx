import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Box,
  Calendar,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';

export function Landing() {
  return (
    <div className="min-h-dvh">
      <header className="px-6 pt-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-2">
            <Link
              to="/admin"
              className="hidden text-sm font-medium text-slate-700 hover:text-slate-900 sm:inline-flex"
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

      <section className="px-6 pt-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs text-brand-800 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            New: photo uploads &amp; flexible-date pricing
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Moving day, made <span className="text-brand-700">simple</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-[17px] text-slate-700/95">
            Tell us where you’re going and what you’re bringing — we’ll handle the boxes,
            the truck, the stairs, and the heavy lifting.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/quote">
              <Button size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
                Request a quote
              </Button>
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              How it works
            </a>
          </div>
          <p className="mt-3 text-xs text-slate-600">
            Free quote • Replies within 24 hours • No spam
          </p>
        </div>
      </section>

      <section id="how-it-works" className="px-6 pt-20 pb-10 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Four small steps. One easier move.
            </h2>
            <p className="mt-2 text-slate-600">
              The form takes about 5 minutes. We do the rest.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Step icon={ClipboardCheck} title="Tell us the basics" body="Address, date, size of move." />
            <Step icon={Camera} title="Snap a few photos" body="Optional, but makes quotes 10× more accurate." />
            <Step icon={Calendar} title="Pick services" body="Packing, cleaning, setup — only what you need." />
            <Step icon={Truck} title="We do moving day" body="Show up with coffee. We handle the rest." />
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl rounded-[var(--radius-card)] bg-white/95 p-8 ring-1 ring-white/60 card-shadow-sm">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <Box className="h-4.5 w-4.5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">What you’ll get</h3>
              <p className="mt-1 text-sm text-slate-600">
                A written quote covering trucks, crew, packing, and any extras you’ve asked for —
                priced for your specific home and day.
              </p>
            </div>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            <Item>Transparent line-by-line pricing</Item>
            <Item>Fixed-price option for in-town moves</Item>
            <Item>Insured for every kilometer</Item>
            <Item>Same-day photo follow-up if needed</Item>
          </ul>
          <div className="mt-6 flex justify-end">
            <Link to="/quote">
              <Button iconRight={<ArrowRight className="h-4 w-4" />}>Start my quote</Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 pb-10 text-center text-xs text-slate-600">
        © Atlas Moving — a demo by your local hauler
      </footer>
    </div>
  );
}

function Step({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-white/60 bg-white/85 p-5 backdrop-blur ring-1 ring-slate-200/60 card-shadow-sm">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="mt-3 text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{body}</div>
    </div>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-700">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
      <span>{children}</span>
    </li>
  );
}
