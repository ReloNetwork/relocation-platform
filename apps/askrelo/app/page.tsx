'use client';

import { useState } from 'react';
import { Button } from '@/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card';
import { Badge } from '@/ui/components/badge';
import { Testimonial } from '@/ui/components/testimonial';
import { TrustBadge } from '@/ui/components/trust-badge';
import { StepCard } from '@/ui/components/step-card';
import HeroCentered from './components/HeroCentered';

export default function HomePage() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex justify-between items-center py-4">
          <div className="font-display text-2xl font-bold text-ink">Relo Network</div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/directory">Directory</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/concierge">Concierge</a>
            </Button>
            <Button variant="outline" size="sm">Sign In</Button>
          </div>
        </div>
      </nav>

      <HeroCentered />

      {/* Trust strip */}
      <div className="mt-10 border-t border-gray-200 pt-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
          <li aria-label="British Association of Removers">BAR</li>
          <li aria-label="FIDI Global Alliance">FIDI</li>
          <li aria-label="Association of Relocation Professionals">ARP</li>
          <li>GDPR compliant</li>
        </ul>
      </div>

      <section className="pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-serif text-3xl">How It Works</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <StepCard number={1} title="Ask Relo" description="Tell us your route, timing, and preferences." />
            <StepCard number={2} title="Compare and book" description="Get vetted movers and housing options. Confirm in one place." />
            <StepCard number={3} title="Arrive and settle" description="Track milestones, upload documents, and message your concierge." />
          </div>
        </div>
      </section>

      {/* Example case (proof) */}
      <section className="pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Example</p>
            <h3 className="mt-2 font-serif text-2xl">NYC to Belgravia · 28 days door to door</h3>
            <p className="mt-4 text-sm text-[var(--muted)]">On time 98% · Claims resolved in 48h · Housing secured in 72h</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <blockquote className="p-6 bg-[var(--surface)] rounded-2xl shadow-sm">
              <p>Seamless from JFK to Kensington. Worth it.</p>
              <footer className="mt-3 text-sm text-[var(--muted)]">A. Patel · SW7</footer>
            </blockquote>
            <blockquote className="p-6 bg-[var(--surface)] rounded-2xl shadow-sm">
              <p>Clear updates and zero surprises.</p>
              <footer className="mt-3 text-sm text-[var(--muted)]">L. Kim · W1</footer>
            </blockquote>
          </div>
        </div>
      </section>


      {/* 4. Example Case */}
      <section className="pt-16 md:pt-20 pb-12 md:pb-16 bg-gray-50/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Example Results</Badge>
            <h3 className="mb-4">NYC to Belgravia · 28 days door to door</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-ink mb-2">On Time</div>
                <p className="text-sm text-muted">Delivered as promised</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-ink mb-2">48h</div>
                <p className="text-sm text-muted">Claims resolved</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-ink mb-2">72h</div>
                <p className="text-sm text-muted">Housing secured</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Features Row */}
      <section className="pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center mb-16">For Those Who Know London · And Those Who Want To.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-luxury p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="mb-4">Prime Housing</h3>
              <p className="text-muted">Exclusive access to London's finest properties through our vetted network.</p>
            </div>
            <div className="card-luxury p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="mb-4">Vetted Partners</h3>
              <p className="text-muted">Every service provider is personally vetted and continuously monitored.</p>
            </div>
            <div className="card-luxury p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="mb-4">AI Concierge</h3>
              <p className="text-muted">24/7 intelligent support that learns your preferences and anticipates needs.</p>
            </div>
          </div>
        </div>
      </section>


      {/* 7. Compliance Microcopy */}
      <section className="py-8 border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center text-xs text-muted">
            GDPR compliant · Insured suppliers · Written SLAs
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-display text-xl font-bold text-ink mb-4">Relo Network</div>
              <p className="text-sm text-muted">
                Relocate to London, Effortlessly.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-ink mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="/directory" className="hover:text-ink">Directory</a></li>
                <li><a href="/concierge" className="hover:text-ink">Concierge</a></li>
                <li><a href="#" className="hover:text-ink">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-ink mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-ink">Privacy</a></li>
                <li><a href="#" className="hover:text-ink">Terms</a></li>
                <li><a href="#" className="hover:text-ink">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-ink mb-4">Company</h4>
              <p className="text-sm text-muted">
                Relo Network Ltd.<br />
                London, United Kingdom
              </p>
            </div>
          </div>
          <div className="divider-subtle mb-8"></div>
          <div className="text-center text-sm text-muted">
            © 2024 Relo Network. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Sticky Ask Relo Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="/ask"
          className="inline-flex items-center justify-center rounded-full px-6 py-4 bg-blue-600 text-white hover:bg-blue-700 transition shadow-xl border-2 border-white font-medium text-sm"
          style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
        >
          Ask Relo
        </a>
      </div>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card-luxury max-w-md w-full p-6">
            <h3 className="mb-2">Join the Waiting List</h3>
            <p className="text-muted mb-6">
              Be the first to experience effortless London relocation.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus-ring"
              />
              <input
                type="text"
                placeholder="Full name (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus-ring"
              />
              <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus-ring">
                <option value="">When are you looking to move?</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="12+ months">12+ months</option>
              </select>
              <div className="flex space-x-3 pt-2">
                <Button className="flex-1">Join Waiting List</Button>
                <Button variant="outline" onClick={() => setShowWaitlist(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}