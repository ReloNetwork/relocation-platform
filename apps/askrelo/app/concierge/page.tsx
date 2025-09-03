import { Button } from '@/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card';
import { Badge } from '@/ui/components/badge';

export default function ConciergePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex justify-between items-center py-4">
          <div className="font-display text-2xl font-bold text-ink">Relo Network</div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/">Home</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/directory">Directory</a>
            </Button>
            <Button variant="outline" size="sm">Sign In</Button>
          </div>
        </div>
      </nav>

      <main className="section-padding">
        <div className="container">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-6 bg-accent text-primary">Human-Assisted Tier</Badge>
            <h1 className="mb-6">Your Personal London Concierge</h1>
            <p className="text-xl mb-8">
              Beyond AI assistance · dedicated human experts who know London intimately and manage every detail of your relocation with white-glove service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg">Book Consultation</Button>
              <Button variant="outline" size="lg">View Success Stories</Button>
            </div>
          </div>

          {/* Service Tiers */}
          <section className="mb-16">
            <h2 className="text-center mb-12">Choose Your Level of Service</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Essential Tier */}
              <div className="card-luxury p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-ink">Essential</h3>
                  <Badge variant="outline" className="text-xs">Popular</Badge>
                </div>
                <p className="text-sm text-muted mb-6">Perfect for straightforward relocations</p>
                <div className="text-2xl font-bold text-ink mb-6">£2,500</div>
                <ul className="space-y-2 text-sm text-muted mb-8">
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Dedicated concierge for 4 weeks</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Housing search & viewings</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Moving company coordination</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Essential services setup</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>24/7 support during move</li>
                </ul>
                <Button className="w-full" size="sm">Get Started</Button>
              </div>

              {/* Premium Tier */}
              <div className="card-luxury p-8 border-2 border-accent">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-ink">Premium</h3>
                  <Badge className="bg-accent text-primary text-xs">Recommended</Badge>
                </div>
                <p className="text-sm text-muted mb-6">Comprehensive support for complex moves</p>
                <div className="text-2xl font-bold text-ink mb-6">£5,000</div>
                <ul className="space-y-2 text-sm text-muted mb-8">
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Everything in Essential</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Visa & legal documentation</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>School placement assistance</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Banking & tax setup</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>3-month settling support</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Partner relocation included</li>
                </ul>
                <Button className="w-full" size="sm">Get Started</Button>
              </div>

              {/* Elite Tier */}
              <div className="card-luxury p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-ink">Elite</h3>
                  <Badge variant="outline" className="text-xs">White Glove</Badge>
                </div>
                <p className="text-sm text-muted mb-6">Luxury service for executives</p>
                <div className="text-2xl font-bold text-ink mb-6">£10,000</div>
                <ul className="space-y-2 text-sm text-muted mb-8">
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Everything in Premium</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Personal property manager</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Private school consultancy</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Lifestyle & social integration</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>6-month concierge access</li>
                  <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>Family orientation program</li>
                </ul>
                <Button className="w-full" size="sm">Get Started</Button>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-center mb-12">How Your Concierge Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-medium text-ink">Discovery Call</h3>
                <p className="text-sm leading-relaxed text-muted max-w-xs mx-auto">
                  45-minute consultation to understand your needs, timeline, and preferences.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-medium text-ink">Custom Plan</h3>
                <p className="text-sm leading-relaxed text-muted max-w-xs mx-auto">
                  Detailed relocation timeline with milestones, deadlines, and assigned tasks.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-medium text-ink">Expert Execution</h3>
                <p className="text-sm leading-relaxed text-muted max-w-xs mx-auto">
                  Your concierge coordinates with vetted partners and handles all logistics.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="font-medium text-ink">Seamless Landing</h3>
                <p className="text-sm leading-relaxed text-muted max-w-xs mx-auto">
                  Arrive to your new home fully set up with ongoing support as you settle in.
                </p>
              </div>
            </div>
          </section>

          {/* Meet Your Team */}
          <section className="mb-16">
            <h2 className="text-center mb-12">Meet Your London Experts</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-luxury p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-sm font-medium text-ink">ER</span>
                </div>
                <h3 className="font-medium text-ink mb-1">Emma Richardson</h3>
                <p className="text-xs text-muted mb-4">Senior Concierge</p>
                <p className="text-sm text-muted leading-relaxed">
                  Former Harrods concierge with 8 years helping executives relocate to Prime Central London.
                </p>
              </div>

              <div className="card-luxury p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-sm font-medium text-ink">JM</span>
                </div>
                <h3 className="font-medium text-ink mb-1">James Mitchell</h3>
                <p className="text-xs text-muted mb-4">Property Specialist</p>
                <p className="text-sm text-muted leading-relaxed">
                  20+ years in London property with exclusive access to off-market rentals and sales.
                </p>
              </div>

              <div className="card-luxury p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-sm font-medium text-ink">SC</span>
                </div>
                <h3 className="font-medium text-ink mb-1">Sarah Chen</h3>
                <p className="text-xs text-muted mb-4">Family Specialist</p>
                <p className="text-sm text-muted leading-relaxed">
                  Former international school admissions director, expert in family relocations and education.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center card-luxury p-12">
            <h2 className="mb-6">Ready to Experience London Like a Local?</h2>
            <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
              Book your complimentary discovery call and let us show you how effortless London relocation can be.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Book Free Consultation</Button>
              <Button variant="outline" size="lg">Download Services Guide</Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}