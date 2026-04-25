"use server";

import { recommendSuppliers, type RecommendationResult } from "@/lib/recommend";
import { SUPPLIERS } from "@/lib/suppliers";

export type MatchState =
  | { status: "idle" }
  | { status: "error"; message: string; query: string }
  | { status: "ok"; result: RecommendationResult };

export async function matchSuppliersAction(
  _prev: MatchState,
  formData: FormData
): Promise<MatchState> {
  const query = String(formData.get("query") ?? "").trim();

  if (query.length === 0) {
    return {
      status: "error",
      message: "Tell us what you're looking for first.",
      query,
    };
  }
  if (query.length > 600) {
    return {
      status: "error",
      message: "Keep it under 600 characters — short briefs match better.",
      query,
    };
  }

  // Small artificial latency so the UI's loading state is perceivable
  // and feels like the request did meaningful work.
  await new Promise((r) => setTimeout(r, 350));

  const result = recommendSuppliers(query, SUPPLIERS, 3);
  return { status: "ok", result };
}
