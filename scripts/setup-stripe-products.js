#!/usr/bin/env node

/**
 * Stripe Product Setup Script
 * Creates the 72-Hour Setup Audit product in Stripe
 */

const Stripe = require('stripe');

// Get Stripe key from environment
const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  console.error('❌ STRIPE_SECRET_KEY environment variable not set');
  console.log('Please set your Stripe secret key:');
  console.log('export STRIPE_SECRET_KEY=sk_test_your_key_here');
  process.exit(1);
}

if (stripeKey.includes('Placeholder')) {
  console.error('❌ Please replace the placeholder Stripe key with a real one');
  process.exit(1);
}

const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' });

async function createProduct() {
  try {
    console.log('🔧 Setting up Stripe products...');
    
    // Check if product already exists
    const existingPrices = await stripe.prices.search({
      query: `lookup_key:'72hour_audit' AND active:'true'`
    });
    
    if (existingPrices.data.length > 0) {
      console.log('✅ 72-Hour Setup Audit product already exists');
      console.log('Price ID:', existingPrices.data[0].id);
      return;
    }
    
    // Create the product
    const product = await stripe.products.create({
      name: '72-Hour Setup Audit',
      description: 'Area fit analysis, property shortlist, viewings itinerary, tenancy agreement review',
      metadata: {
        service_type: 'audit',
        delivery_time: '72_hours'
      }
    });
    
    console.log('✅ Created product:', product.name);
    
    // Create the price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 349700, // £3,497 in pence
      currency: 'gbp',
      lookup_key: '72hour_audit',
      metadata: {
        plan_name: '72-Hour Setup Audit',
        includes: 'Area analysis, property shortlist, viewing itinerary, tenancy agreement review, 60-min strategy call'
      }
    });
    
    console.log('✅ Created price:', `£${price.unit_amount / 100}`);
    console.log('✅ Lookup key:', price.lookup_key);
    console.log('✅ Price ID:', price.id);
    
    console.log('\n🎉 Setup complete! The 72-Hour Setup Audit (£3,497) is now available for checkout.');
    
  } catch (error) {
    console.error('❌ Error setting up Stripe products:', error.message);
    
    if (error.type === 'StripeAuthenticationError') {
      console.log('Please check your Stripe secret key is correct');
    }
    
    process.exit(1);
  }
}

createProduct();