#!/usr/bin/env node

const Stripe = require('stripe');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  console.error('STRIPE_SECRET_KEY not found in environment');
  process.exit(1);
}

const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

const PLANS = {
  starter: { name: 'Starter', monthly: 39500, annual: 395000 }, // £395/mo, £3950/yr (in pence)
  featured: { name: 'Featured', monthly: 79500, annual: 795000 }, // £795/mo, £7950/yr
  sponsored: { name: 'Sponsored', monthly: 149500, annual: 1495000 }, // £1495/mo, £14950/yr
};

async function seedStripe() {
  try {
    console.log('🌱 Seeding Stripe products and prices...\n');

    for (const [planKey, planData] of Object.entries(PLANS)) {
      console.log(`Creating ${planData.name} plan...`);

      // Create or get product
      const product = await stripe.products.create({
        name: `Relo Network - ${planData.name}`,
        description: `${planData.name} partnership plan for Relo Network directory`,
        metadata: {
          plan: planKey,
        },
      });

      // Create monthly price
      const monthlyPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: planData.monthly,
        currency: 'gbp',
        recurring: {
          interval: 'month',
        },
        lookup_key: `relo_${planKey}_monthly`,
        metadata: {
          plan: planKey,
          cadence: 'monthly',
        },
      });

      // Create annual price
      const annualPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: planData.annual,
        currency: 'gbp',
        recurring: {
          interval: 'year',
        },
        lookup_key: `relo_${planKey}_annual`,
        metadata: {
          plan: planKey,
          cadence: 'annual',
        },
      });

      console.log(`✅ ${planData.name} product created:`);
      console.log(`   Product ID: ${product.id}`);
      console.log(`   Monthly: ${monthlyPrice.id} (lookup: relo_${planKey}_monthly)`);
      console.log(`   Annual: ${annualPrice.id} (lookup: relo_${planKey}_annual)`);
      console.log('');
    }

    console.log('🎉 Stripe seeding completed successfully!');
    console.log('\nYou can now test the checkout flow at http://localhost:3000/partners');

  } catch (error) {
    console.error('❌ Error seeding Stripe:', error.message);
    process.exit(1);
  }
}

seedStripe();