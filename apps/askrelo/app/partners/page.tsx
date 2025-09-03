"use client";
import { useState } from "react";

type PlanKey = "starter" | "featured" | "sponsored";

const PLANS: Record<PlanKey, { name: string; monthly: number; annual: number; features: string[] }> = {
  starter:  { name: "Starter",  monthly: 395,  annual: 3950,  features: ["Directory profile", "Concierge referrals"] },
  featured: { name: "Featured", monthly: 795,  annual: 7950,  features: ["Corridor features", "Editorial inclusion", "Lead alerts"] },
  sponsored:{ name: "Sponsored",monthly: 1495, annual: 14950, features: ["Homepage modules", "Concierge priority", "Quarterly review"] },
};

export default function PartnersPage() {
  const [cadence, setCadence] = useState<"monthly" | "annual">("monthly");
  const [loading, setLoading] = useState<string>("");

  async function go(plan: PlanKey) {
    try {
      setLoading(plan);
      const email = ""; // optional prefill from session if logged in
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, cadence, email }),
      });
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
      else alert(data?.error || "Could not create checkout session");
    } finally {
      setLoading("");
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex justify-between items-center py-4">
          <a href="/" className="font-display text-2xl font-bold text-ink hover:text-[var(--primary)] transition">
            Relo Network
          </a>
          <div className="flex items-center space-x-4">
            <a href="/directory" className="text-sm text-[var(--muted)] hover:text-ink transition">Directory</a>
            <a href="/concierge" className="text-sm text-[var(--muted)] hover:text-ink transition">Concierge</a>
            <a href="/" className="text-sm text-[var(--muted)] hover:text-ink transition">Home</a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 pt-16 pb-16">
        <h1 className="font-serif text-4xl text-center">Get Listed on The Relo Network</h1>
        <p className="mt-3 text-center text-[var(--muted)]">Join a vetted directory used by high-intent clients.</p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => setCadence("monthly")}
          className={`px-4 py-2 rounded-md border ${cadence === "monthly" ? "bg-[var(--primary)] text-white" : "bg-white text-[var(--ink)]"}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setCadence("annual")}
          className={`px-4 py-2 rounded-md border ${cadence === "annual" ? "bg-[var(--primary)] text-white" : "bg-white text-[var(--ink)]"}`}
        >
          Annual
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.keys(PLANS) as PlanKey[]).map((k) => {
          const p = PLANS[k];
          const price = cadence === "monthly" ? p.monthly : p.annual;
          const suffix = cadence === "monthly" ? "/mo" : "/yr";
          return (
            <div key={k} className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-medium">{p.name}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{p.features[0]}</p>
                <div className="mt-4 text-3xl font-semibold">£{price.toLocaleString()}<span className="text-base font-normal text-[var(--muted)]">{suffix}</span></div>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map((f) => <li key={f}>• {f}</li>)}
                </ul>
              </div>
              <button
                onClick={() => go(k)}
                disabled={loading === k}
                className="mt-6 inline-flex items-center justify-center rounded-md px-4 py-2 border border-[var(--primary)] text-[var(--primary)] bg-white hover:bg-[color-mix(in_srgb,var(--primary)_6%,white)] transition focus-ring"
              >
                {loading === k ? "Preparing…" : "Get listed"}
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-center text-[var(--muted)]">
        You'll be taken to Stripe Checkout. Sponsored plans may require manual approval and KYC.
        </p>
      </main>
    </div>
  );
}