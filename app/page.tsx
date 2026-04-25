import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Swatch } from "@/components/ui/Swatch";
import { SUPPLIERS, accentBgClass } from "@/lib/suppliers";
import { FABRIC_TYPES } from "@/lib/fabrics";

export default function HomePage() {
  const featured = SUPPLIERS.slice(0, 3);

  return (
    <>
      <Hero />
      <MarqueeStrip />
      <FeaturedSuppliers featured={featured} />
      <HowItWorks />
      <ValueProps />
      <ForSuppliers />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24 grid gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7">
          <Tag tone="green" className="mb-6">
            Lagos · MVP · v0.1
          </Tag>
          <h1 className="font-display uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.92] text-ink">
            Find fabric.
            <br />
            <span className="inline-block bg-green-primary text-cream px-2 -ml-1 mt-1 border-2 border-ink shadow-brutal">
              Faster than
            </span>
            <br />
            Balogun on a Saturday.
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-ink/80">
            Fabrica is the marketplace pairing Lagos&apos;s indie designers with
            verified textile suppliers — Ankara to Aso-oke, Idumota to Lekki.
            Browse, message on WhatsApp, get quoted in hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/suppliers" size="lg">
              Browse Suppliers →
            </ButtonLink>
            <ButtonLink href="#for-suppliers" size="lg" variant="secondary">
              I&apos;m a supplier
            </ButtonLink>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {FABRIC_TYPES.slice(0, 7).map((f) => (
              <Tag key={f}>{f}</Tag>
            ))}
            <Tag tone="ink">+ more</Tag>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroSwatchStack />
        </div>
      </div>
    </section>
  );
}

function HeroSwatchStack() {
  return (
    <div className="relative aspect-4/5 max-w-md mx-auto">
      {/* Background card */}
      <Card className="absolute inset-x-6 top-6 bottom-0 bg-amber" />
      {/* Mid card */}
      <Card className="absolute inset-x-3 top-3 bottom-3 bg-magenta">
        <div
          className="absolute inset-0 swatch-zigzag text-cream/60"
          aria-hidden="true"
        />
      </Card>
      {/* Front card */}
      <Card className="absolute inset-0 bg-cream p-6 flex flex-col">
        <div className="flex items-center justify-between">
          <Tag tone="ink">Featured</Tag>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            #ANK-014
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Swatch
            swatch={{
              name: "Vlisco Classic",
              bg: "bg-amber",
              fg: "text-ink",
              pattern: "dots",
            }}
            showLabel={false}
          />
          <Swatch
            swatch={{
              name: "Tropical",
              bg: "bg-green-primary",
              fg: "text-cream",
              pattern: "zigzag",
            }}
            showLabel={false}
          />
          <Swatch
            swatch={{
              name: "Floral",
              bg: "bg-clay",
              fg: "text-ink",
              pattern: "stripes",
            }}
            showLabel={false}
          />
        </div>
        <div className="mt-auto pt-6">
          <p className="font-display uppercase text-xl leading-tight">
            Mama Tope Textiles
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-muted mt-1">
            Idumota Market · 14 yrs
          </p>
          <div className="mt-4 flex items-center justify-between border-t-2 border-ink pt-3">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              From{" "}
              <strong className="text-ink">₦2,200</strong>
              <span className="text-muted">/m</span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-green-deep">
              ● Replies in ~2hrs
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function MarqueeStrip() {
  const items = [
    "70+ verified Lagos suppliers",
    "1,000+ fabric SKUs",
    "Avg response time: 4 hrs",
    "WhatsApp-first",
    "MOQs from 3m",
  ];
  return (
    <div className="brutal-strip border-b-2 border-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="text-amber">●</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturedSuppliers({
  featured,
}: {
  featured: typeof SUPPLIERS;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <Tag tone="ink" className="mb-3">
            Featured
          </Tag>
          <h2 className="font-display uppercase text-3xl sm:text-4xl tracking-tight">
            Suppliers shipping this week
          </h2>
        </div>
        <Link
          href="/suppliers"
          className="hidden sm:inline-block font-mono text-xs uppercase tracking-wider underline decoration-2 underline-offset-4 hover:text-green-deep"
        >
          See all →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((s) => (
          <Card key={s.slug} hover className="overflow-hidden">
            <div
              className={`grid grid-cols-3 border-b-2 border-ink h-32 ${accentBgClass[s.accentColor]}`}
            >
              {s.swatches.map((sw, i) => (
                <Swatch key={i} swatch={sw} showLabel={false} className="border-0 border-r-2 last:border-r-0 rounded-none aspect-auto" />
              ))}
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {s.area}
                </span>
                {s.verified && <Tag tone="green">Verified</Tag>}
              </div>
              <h3 className="mt-2 font-display uppercase text-xl leading-tight">
                {s.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{s.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.fabrics.slice(0, 3).map((f) => (
                  <Tag key={f}>{f}</Tag>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t-2 border-ink flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider">
                  MOQ <strong>{s.moqMeters}m</strong>
                </span>
                <Link
                  href={`/suppliers/${s.slug}`}
                  className="font-mono text-[11px] uppercase tracking-wider underline decoration-2 underline-offset-4 hover:text-green-deep"
                >
                  View →
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Browse verified suppliers",
      body: "Filter by fabric, location, and MOQ. Every listing is vetted by the Fabrica team in person.",
      badge: "bg-green-primary text-cream",
    },
    {
      n: "02",
      title: "Send a structured request",
      body: "Pre-filled WhatsApp message with quantity, deadline, and use case — no more vague price-pings.",
      badge: "bg-amber text-ink",
    },
    {
      n: "03",
      title: "Quote, pay, produce",
      body: "Negotiate directly on WhatsApp. Pay your supplier on terms you agree. Build the next thing.",
      badge: "bg-clay text-cream",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="border-y-2 border-ink bg-paper"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <Tag tone="ink" className="mb-3">
          How it works
        </Tag>
        <h2 className="font-display uppercase text-3xl sm:text-4xl tracking-tight max-w-2xl">
          Three steps from idea to fabric in your studio.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.n} className="p-6">
              <div
                className={`inline-flex items-center justify-center w-14 h-14 border-2 border-ink rounded-sm font-display text-2xl shadow-brutal-sm ${step.badge}`}
              >
                {step.n}
              </div>
              <h3 className="mt-5 font-display uppercase text-xl leading-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
  const props = [
    {
      title: "WhatsApp-native",
      body: "How Lagos actually does business. No new accounts, no inboxes to babysit.",
    },
    {
      title: "Designer-friendly MOQs",
      body: "Some suppliers accept 3–8 meters — perfect for samples and small runs.",
    },
    {
      title: "Verified in person",
      body: "We walk Idumota, Balogun, and Mushin. Every supplier is met before listing.",
    },
    {
      title: "Local fabric vocabulary",
      body: "Ankara, Adire, Aso-oke, Brocade, Kampala, Guinea — searchable the way you actually shop.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="grid gap-12 md:grid-cols-2 items-start">
        <div>
          <Tag tone="amber" className="mb-3">
            Why Fabrica
          </Tag>
          <h2 className="font-display uppercase text-3xl sm:text-4xl tracking-tight">
            Built for the way Lagos already works.
          </h2>
          <p className="mt-4 text-muted max-w-md">
            Not a Western marketplace forced onto a West African market. Fabrica
            is built around WhatsApp, walking distance, and the words designers
            and traders actually use.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {props.map((p) => (
            <Card key={p.title} className="p-5">
              <h3 className="font-display uppercase text-base">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForSuppliers() {
  return (
    <section
      id="for-suppliers"
      className="border-y-2 border-ink bg-green-primary text-cream"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <Tag tone="ink" className="mb-3">
            For suppliers
          </Tag>
          <h2 className="font-display uppercase text-3xl sm:text-4xl tracking-tight">
            Get found by designers across Lagos.
          </h2>
          <p className="mt-4 text-cream/85 max-w-lg">
            We&apos;ll come to your shop, photograph your stock, and build your
            listing. No website to maintain — RFQs land directly in your
            WhatsApp.
          </p>
          <div className="mt-6">
            <ButtonLink
              href="https://wa.me/2348012345000?text=Hello%20Fabrica%2C%20I%27d%20like%20to%20list%20my%20fabrics."
              external
              variant="secondary"
              size="lg"
            >
              List your fabrics →
            </ButtonLink>
          </div>
        </div>

        <Card className="p-6 bg-cream text-ink">
          <h3 className="font-display uppercase text-lg">What you get</h3>
          <ul className="mt-4 space-y-3 font-mono text-xs uppercase tracking-wider">
            <li className="flex gap-3">
              <span className="text-green-primary">●</span>
              In-person photoshoot of 10 SKUs
            </li>
            <li className="flex gap-3">
              <span className="text-green-primary">●</span>
              Listing built for you — no tech needed
            </li>
            <li className="flex gap-3">
              <span className="text-green-primary">●</span>
              RFQs sent to your WhatsApp directly
            </li>
            <li className="flex gap-3">
              <span className="text-green-primary">●</span>
              No fee during the MVP period
            </li>
          </ul>
        </Card>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 text-center">
      <h2 className="font-display uppercase text-4xl sm:text-5xl tracking-tight max-w-3xl mx-auto">
        Stop trekking. Start sourcing.
      </h2>
      <p className="mt-4 text-muted max-w-lg mx-auto">
        Browse 70+ verified suppliers across Lagos and message them in seconds.
      </p>
      <div className="mt-8">
        <ButtonLink href="/suppliers" size="lg">
          Browse suppliers →
        </ButtonLink>
      </div>
    </section>
  );
}
