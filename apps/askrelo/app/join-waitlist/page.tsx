'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/components/card';

function getCsrf() {
  const m = document.cookie.match(/(?:^|;\s*)relo_csrf=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : '';
}

export default function JoinPage() {
  const [status, setStatus] = useState<{ok?: boolean; msg?: string}>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('/api/audience-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-csrf-token': getCsrf() },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Error');
      setStatus({ ok: true, msg: 'Thanks—check your inbox and expect a personal follow-up.' });
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || 'Something went wrong' });
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

      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="font-serif text-3xl text-center">Join the Waiting List</h1>
        <p className="mt-2 text-center text-[var(--muted)]">Answer a few short questions so we can prioritise access.</p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tell us about you</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" placeholder="Name" required className="w-full rounded-md border p-3" />
              <input type="email" name="email" placeholder="Email" required className="w-full rounded-md border p-3" />
            </div>


            <div className="grid grid-cols-1 gap-4">
              <label className="text-sm">1) Which best describes your current situation?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="Professional" required /> Professional
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="Entrepreneur" /> Entrepreneur
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="Investor" /> Investor
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="Other" /> Other
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm">2) Desired outcome relating to this topic?</label>
              <input name="desired_outcome" placeholder="e.g., Settle in Chelsea within 60 days" className="mt-1 w-full rounded-md border p-3" />
            </div>

            <div>
              <label className="text-sm">3) Biggest frustration you've experienced?</label>
              <input name="frustration" placeholder="e.g., Unreliable timelines from movers" className="mt-1 w-full rounded-md border p-3" />
            </div>

            <div>
              <label className="text-sm">4) What price point could you allocate if the offer was right?</label>
              <select name="price_point" className="mt-1 w-full rounded-md border p-3">
                <option value="">Select a range</option>
                <option>Under £1k</option>
                <option>£1k–£5k</option>
                <option>£5k–£15k</option>
                <option>£15k–£50k</option>
                <option>£50k+</option>
              </select>
            </div>

            <div>
              <label className="text-sm">5) Anything else we should know?</label>
              <textarea name="extra" rows={4} placeholder="Context, routes, timelines, constraints" className="mt-1 w-full rounded-md border p-3" />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button 
                type="submit"
                className="inline-flex items-center justify-center rounded-md px-5 py-3 border border-[var(--primary)] text-[var(--primary)] bg-white hover:bg-[color-mix(in_srgb,var(--primary)_6%,white)] transition shadow-sm focus-ring"
              >
                Join Waiting List
              </button>
              {status.msg && (
                <span className={`text-sm ${status.ok ? 'text-green-600' : 'text-red-600'}`}>{status.msg}</span>
              )}
            </div>
          </form>
        </CardContent>
        </Card>
      </main>
    </div>
  );
}