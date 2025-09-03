'use client';

import { useState } from 'react';
import { Button } from '@/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card';
import { Badge } from '@/ui/components/badge';

const categories = [
  'All',
  'Movers',
  'Housing', 
  'Local Expert',
  'Visa',
  'Legal',
  'Financial'
];

const suppliers = [
  {
    id: '1',
    name: 'Cadogan Tate',
    category: 'Movers',
    description: 'International fine art and luxury goods moving specialists',
    rating: 4.8,
    coverage: ['London', 'New York', 'Paris', 'Geneva'],
    insurance: '£10M',
    memberships: ['FIDI', 'BAR', 'IAM'],
    status: 'sponsored',
    website: 'https://cadogantate.com'
  },
  {
    id: '2',
    name: 'Cheval Collection',
    category: 'Housing',
    description: 'Luxury serviced apartments in prime London locations',
    rating: 4.9,
    coverage: ['Mayfair', 'Knightsbridge', 'South Kensington', 'Chelsea'],
    status: 'sponsored',
    website: 'https://chevalcollection.com'
  },
  {
    id: '3',
    name: 'Black Brick Property Solutions',
    category: 'Local Expert',
    description: 'Prime Central London property search and acquisition specialists',
    rating: 4.9,
    coverage: ['Prime Central London', 'Marylebone', 'Mayfair', 'Belgravia'],
    status: 'featured',
    website: 'https://black-brick.com'
  },
  {
    id: '4',
    name: 'Ward Thomas Removals',
    category: 'Movers',
    description: 'Master Removers Group member specializing in international relocations',
    rating: 4.7,
    coverage: ['London', 'Surrey', 'International'],
    insurance: '£5M',
    memberships: ['Master Removers Group', 'BAR'],
    status: 'approved',
    website: 'https://wardthomas.co.uk'
  },
  {
    id: '5',
    name: 'Blueground',
    category: 'Housing',
    description: 'Move-in ready furnished apartments for flexible living',
    rating: 4.6,
    coverage: ['Central London', 'Canary Wharf', 'King\'s Cross'],
    status: 'approved',
    website: 'https://theblueground.com'
  },
  {
    id: '6',
    name: 'INHOUS Relocation',
    category: 'Local Expert',
    description: 'Comprehensive relocation services and London area expertise',
    rating: 4.7,
    coverage: ['Greater London', 'Home Counties'],
    status: 'approved',
    website: 'https://inhous.co.uk'
  }
];

export default function DirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredSuppliers = selectedCategory === 'All' 
    ? suppliers
    : suppliers.filter(s => s.category === selectedCategory);


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
              <a href="/concierge">Concierge</a>
            </Button>
            <Button variant="outline" size="sm">Sign In</Button>
          </div>
        </div>
      </nav>

      <main className="section-padding">
        <div className="container">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="mb-6">Vetted London Partners</h1>
            <p className="text-xl mb-8">
              Every service provider has been personally vetted and continuously monitored for excellence.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Suppliers Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            {filteredSuppliers.map((supplier) => {
              const initials = supplier.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();
              
              return (
                <div key={supplier.id} className="card-luxury p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-ink">{initials}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-ink">{supplier.name}</h3>
                        {supplier.status === 'sponsored' && (
                          <Badge className="bg-accent text-primary text-xs">Sponsor</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">{supplier.category}</Badge>
                        <div className="flex items-center gap-1 text-xs text-muted">
                          <span className="text-accent">⭐</span>
                          <span>{supplier.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted mb-4 leading-relaxed">
                    {supplier.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="text-xs text-muted mb-2">Areas</div>
                      <div className="flex flex-wrap gap-1">
                        {supplier.coverage.map((area, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-50 text-xs text-ink rounded">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {supplier.memberships && (
                      <div>
                        <div className="text-xs text-muted mb-2">Memberships</div>
                        <div className="flex flex-wrap gap-1">
                          {supplier.memberships.map((membership, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-50 text-xs text-ink rounded">
                              {membership}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="sm" className="flex-1">Shortlist</Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={supplier.website} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Partner Application CTA */}
          <section className="text-center card-luxury p-12">
            <h2 className="mb-6">Become a Relo Network Partner</h2>
            <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
              Join our exclusive network of vetted service providers and connect with high-quality clients relocating to London.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Apply to Join</Button>
              <Button variant="outline" size="lg">Partner Benefits</Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}