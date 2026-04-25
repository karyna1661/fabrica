"use client";

import Link from "next/link";
import { useActionState } from "react";
import { matchSuppliersAction, type MatchState } from "@/app/actions/match";
import { Tag } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { Swatch } from "@/components/ui/Swatch";
import { ButtonLink } from "@/components/ui/Button";
import { accentBgClass, type Supplier } from "@/lib/suppliers";
import { buildWhatsAppLink, buildSupplierGreeting } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const SUGGESTIONS = [
  "I'm sourcing 30m of premium Ankara for an aso-ebi set in Idumota",
  "Sample-friendly Adire — need 5m for a capsule",
  "European linen for a resort shirt collection, under ₦8,500/m",
  "Bulk cotton jersey for streetwear hoodies, 200m+",
  "Bridal lace, sequinned, in Lekki — quick reply please",
];

const initialState: MatchState = { status: "idle" };

export function AiMatchBar() {
  const [state, formAction, pending] = useActionState(
    matchSuppliersAction,
    initialState
  );

  return (
    <section
      aria-labelledby="ai-match-heading"
      className="brutal-card bg-paper p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <Tag tone="green" className="mb-2">
            ● AI Match · Beta
          </Tag>
          <h2
            id="ai-match-heading"
            className="font-display uppercase text-2xl sm:text-3xl tracking-tight leading-tight"
          >
            Describe what you need.
            <br />
            We&apos;ll pick your top 3 suppliers.
          </h2>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted max-w-xs">
          Fabric type, quantity, budget, location, occasion — the more you
          give us, the better the match.
        </p>
      </div>

      <form action={formAction} className="space-y-3">
        <label htmlFor="ai-query" className="sr-only">
          What are you sourcing?
        </label>
        <textarea
          id="ai-query"
          name="query"
          rows={3}
          maxLength={600}
          required
          defaultValue={
            state.status === "error"
              ? state.query
              : state.status === "ok"
                ? state.result.query
                : ""
          }
          placeholder="e.g. 50m of Ankara for ready-to-wear, under ₦4,000/m, near Idumota"
          className="w-full bg-cream border-2 border-ink rounded-sm px-3 py-3 text-sm sm:text-base resize-y min-h-25 placeholder:text-muted/70 focus:bg-paper focus:outline-none"
        />
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <SuggestionRow disabled={pending} />
          <button
            type="submit"
            disabled={pending}
            className={cn(
              "inline-flex items-center justify-center gap-2 h-12 px-6 text-sm",
              "font-display uppercase tracking-wide border-2 border-ink rounded-sm brutal-press",
              "bg-green-primary text-cream shadow-brutal hover:bg-green-deep",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {pending ? (
              <>
                <Spinner /> Matching…
              </>
            ) : (
              <>Find my top 3 →</>
            )}
          </button>
        </div>
      </form>

      {state.status === "error" && (
        <p
          role="alert"
          className="mt-4 font-mono text-xs uppercase tracking-wider text-clay"
        >
          ✕ {state.message}
        </p>
      )}

      {state.status === "ok" && (
        <Results
          query={state.result.query}
          matches={state.result.matches}
          detected={state.result.detected}
        />
      )}
    </section>
  );
}

function SuggestionRow({ disabled }: { disabled: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5 max-w-xl">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted self-center mr-1">
        Try:
      </span>
      {SUGGESTIONS.slice(0, 3).map((s) => (
        <button
          key={s}
          type="button"
          disabled={disabled}
          onClick={(e) => {
            const ta = e.currentTarget
              .closest("form")
              ?.querySelector<HTMLTextAreaElement>("textarea[name='query']");
            if (ta) {
              ta.value = s;
              ta.focus();
            }
          }}
          className={cn(
            "border-2 border-ink bg-bone hover:bg-amber",
            "px-2 py-1 font-mono text-[10px] uppercase tracking-wider rounded-xs",
            "max-w-[200px] truncate cursor-pointer",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          title={s}
        >
          {s.length > 30 ? s.slice(0, 28) + "…" : s}
        </button>
      ))}
    </div>
  );
}

function Results({
  query,
  matches,
  detected,
}: {
  query: string;
  matches: { supplier: Supplier; score: number; reasons: string[] }[];
  detected: {
    fabrics: string[];
    areas: string[];
    quantityMeters: number | null;
    maxBudgetNgn: number | null;
    intents: string[];
  };
}) {
  return (
    <div className="mt-7 pt-6 border-t-2 border-ink">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <h3 className="font-display uppercase text-lg">
          Top {matches.length} for: <span className="text-green-deep">&ldquo;{truncate(query, 80)}&rdquo;</span>
        </h3>
        <DetectedSummary detected={detected} />
      </div>

      <ol className="grid gap-4 sm:grid-cols-3">
        {matches.map((m, i) => (
          <li key={m.supplier.slug}>
            <MatchCard rank={i + 1} match={m} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function DetectedSummary({
  detected,
}: {
  detected: {
    fabrics: string[];
    areas: string[];
    quantityMeters: number | null;
    maxBudgetNgn: number | null;
    intents: string[];
  };
}) {
  const chips: string[] = [];
  for (const f of detected.fabrics) chips.push(f);
  for (const a of detected.areas) chips.push(a);
  if (detected.quantityMeters !== null) chips.push(`~${detected.quantityMeters}m`);
  if (detected.maxBudgetNgn !== null)
    chips.push(`≤ ₦${detected.maxBudgetNgn.toLocaleString()}`);
  for (const i of detected.intents) chips.push(i);

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted self-center">
        Picked up:
      </span>
      {chips.map((c) => (
        <Tag key={c} tone="ink">
          {c}
        </Tag>
      ))}
    </div>
  );
}

function MatchCard({
  rank,
  match,
}: {
  rank: number;
  match: { supplier: Supplier; score: number; reasons: string[] };
}) {
  const { supplier: s, reasons } = match;
  const directLink = buildWhatsAppLink(
    s.whatsapp,
    buildSupplierGreeting(s.name)
  );

  return (
    <Card hover className="overflow-hidden h-full flex flex-col">
      <div
        className={cn(
          "relative grid grid-cols-3 border-b-2 border-ink h-24",
          accentBgClass[s.accentColor]
        )}
      >
        {s.swatches.map((sw, i) => (
          <Swatch
            key={i}
            swatch={sw}
            showLabel={false}
            className="border-0 border-r-2 last:border-r-0 rounded-none aspect-auto"
          />
        ))}
        <span className="absolute top-2 left-2 inline-flex items-center justify-center w-7 h-7 border-2 border-ink bg-cream font-display text-sm shadow-brutal-sm">
          #{rank}
        </span>
        {s.verified && (
          <span className="absolute top-2 right-2">
            <Tag tone="green">✓</Tag>
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {s.area}
          {s.market ? ` · ${s.market.split(",")[0]}` : ""}
        </span>
        <h4 className="mt-1.5 font-display uppercase text-base leading-tight">
          {s.name}
        </h4>

        {reasons.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {reasons.map((r) => (
              <li
                key={r}
                className="flex gap-2 text-xs leading-snug text-ink/85"
              >
                <span className="text-green-primary mt-[3px]">●</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 pt-3 border-t-2 border-ink flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-wider">
          <span>
            MOQ <strong>{s.moqMeters}m</strong>
          </span>
          <span>
            From <strong>₦{s.priceFromNgn.toLocaleString()}</strong>/m
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href={`/suppliers/${s.slug}`}
            className="inline-flex items-center justify-center h-9 px-3 text-[11px] font-display uppercase tracking-wide border-2 border-ink rounded-sm bg-cream hover:bg-paper brutal-press"
          >
            View
          </Link>
          <ButtonLink
            href={directLink}
            external
            variant="whatsapp"
            size="sm"
            className="!h-9 !px-3 !text-[11px]"
          >
            Chat
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-3.5 h-3.5 border-2 border-cream border-t-transparent rounded-full animate-spin"
    />
  );
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
