"use client";
import { useState } from "react";

function getCsrf() {
  const m = document.cookie.match(/(?:^|;\s*)relo_csrf=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "";
}

export default function AskPage() {
  const [state, setState] = useState<{ ok?: boolean; msg?: string }>({});
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    setLoading(true);
    try {
      const res = await fetch("/api/ask-relo", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-csrf-token": getCsrf() },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error");
      setState({ ok: true, msg: "Thanks. We'll respond shortly." });
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setState({ ok: false, msg: err?.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 pt-16 pb-20">
      <h1 className="font-serif text-3xl text-center">Ask Relo</h1>
      <p className="mt-2 text-center text-[var(--muted)]">Tell us your route, timing, and preferences. We'll take it from there.</p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" placeholder="Full name" required className="w-full rounded-md border p-3" />
          <input type="email" name="email" placeholder="Email" required className="w-full rounded-md border p-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="from" placeholder="From (city, country)" required className="w-full rounded-md border p-3" />
          <input name="to" placeholder="To (London area optional)" required className="w-full rounded-md border p-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="date" name="move_date" placeholder="Target move date" className="w-full rounded-md border p-3" />
          <select name="budget" className="w-full rounded-md border p-3">
            <option value="">Budget range (optional)</option>
            <option>Under £10k</option><option>£10k–£25k</option><option>£25k–£50k</option><option>£50k+</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="household" className="w-full rounded-md border p-3">
            <option value="">Household size</option>
            <option>1</option><option>2</option><option>3–4</option><option>5+</option>
          </select>
          <select name="urgency" className="w-full rounded-md border p-3">
            <option value="">Urgency</option>
            <option>Exploring</option><option>Soon</option><option>ASAP</option>
          </select>
        </div>

        <textarea name="notes" placeholder="Any priorities or notes" rows={4} className="w-full rounded-md border p-3" />
        <button disabled={loading} className="inline-flex items-center justify-center rounded-md px-5 py-3 border border-[var(--primary)] text-[var(--primary)] bg-white hover:bg-[color-mix(in_srgb,var(--primary)_6%,white)] transition focus-ring">
          {loading ? "Sending…" : "Submit"}
        </button>

        {state.msg && (
          <p className={`text-sm ${state.ok ? "text-green-600" : "text-red-600"}`}>{state.msg}</p>
        )}
      </form>
    </main>
  );
}