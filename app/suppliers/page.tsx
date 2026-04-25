import type { Metadata } from "next";
import { SUPPLIERS, filterSuppliers } from "@/lib/suppliers";
import { SupplierCard } from "@/components/suppliers/SupplierCard";
import { DirectoryFilters } from "@/components/suppliers/DirectoryFilters";
import { AiMatchBar } from "@/components/suppliers/AiMatchBar";
import { Tag } from "@/components/ui/Tag";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Browse Lagos textile suppliers",
  description:
    "Verified Lagos fabric suppliers — Ankara, Adire, Aso-oke, lace, brocade and more. Filter by fabric type, area, and MOQ.",
};

export default async function SuppliersPage({
  searchParams,
}: {
  searchParams: Promise<{
    fabric?: string;
    area?: string;
    moq?: string;
    verified?: string;
  }>;
}) {
  const sp = await searchParams;
  const filtered = filterSuppliers(SUPPLIERS, sp);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <header className="mb-8">
        <Tag tone="ink" className="mb-3">
          Directory · Lagos
        </Tag>
        <h1 className="font-display uppercase text-4xl sm:text-5xl tracking-tight">
          {filtered.length} {filtered.length === 1 ? "supplier" : "suppliers"}{" "}
          ready to quote
        </h1>
        <p className="mt-3 text-muted max-w-xl">
          Tap into Lagos&apos;s textile network. Filter, browse, and message
          directly on WhatsApp.
        </p>
      </header>

      <div className="mb-10">
        <AiMatchBar />
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <DirectoryFilters />

        <div>
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((s) => (
                <SupplierCard key={s.slug} supplier={s} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="brutal-card p-12 text-center bg-paper">
      <p className="font-display uppercase text-2xl">No matches.</p>
      <p className="mt-2 text-muted max-w-sm mx-auto">
        Try removing a filter, or tell us what you&apos;re looking for and we&apos;ll
        find a supplier for you.
      </p>
      <div className="mt-6">
        <ButtonLink
          href="https://wa.me/2348012345000?text=Hello%20Fabrica%2C%20I%27m%20looking%20for..."
          external
          variant="whatsapp"
        >
          Ask Fabrica on WhatsApp
        </ButtonLink>
      </div>
    </div>
  );
}
