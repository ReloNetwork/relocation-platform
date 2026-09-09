import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

interface PlanConfig {
  name: string;
  monthlyPrice: number; // in pence
  annualPrice: number; // in pence
  lookupKey: string;
}

const plans: PlanConfig[] = [
  {
    name: 'Starter',
    monthlyPrice: 39500, // £395.00
    annualPrice: 395000, // £3,950.00 (10x monthly)
    lookupKey: 'starter',
  },
  {
    name: 'Featured',
    monthlyPrice: 79500, // £795.00
    annualPrice: 795000, // £7,950.00
    lookupKey: 'featured',
  },
  {
    name: 'Sponsored',
    monthlyPrice: 149500, // £1,495.00
    annualPrice: 1495000, // £14,950.00
    lookupKey: 'sponsored',
  },
];

async function createStripeProducts() {
  console.log('🏗️  Creating Stripe products and prices...');

  for (const plan of plans) {
    try {
      // Create or retrieve product
      let product: Stripe.Product;
      
      const existingProducts = await stripe.products.search({
        query: `name:"${plan.name} Partner Plan"`,
      });

      if (existingProducts.data.length > 0) {
        product = existingProducts.data[0];
        console.log(`✅ Found existing product: ${product.name}`);
      } else {
        product = await stripe.products.create({
          name: `${plan.name} Partner Plan`,
          description: `${plan.name} tier partnership with Relo Network`,
          metadata: {
            plan_tier: plan.name.toLowerCase(),
          },
        });
        console.log(`✅ Created product: ${product.name}`);
      }

      // Create monthly price
      const monthlyPrice = await stripe.prices.create({
        unit_amount: plan.monthlyPrice,
        currency: 'gbp',
        recurring: {
          interval: 'month',
        },
        product: product.id,
        lookup_key: `${plan.lookupKey}_monthly`,
        metadata: {
          plan_tier: plan.name.toLowerCase(),
          billing_cycle: 'monthly',
        },
      });

      // Create annual price
      const annualPrice = await stripe.prices.create({
        unit_amount: plan.annualPrice,
        currency: 'gbp',
        recurring: {
          interval: 'year',
        },
        product: product.id,
        lookup_key: `${plan.lookupKey}_annual`,
        metadata: {
          plan_tier: plan.name.toLowerCase(),
          billing_cycle: 'annual',
        },
      });

      console.log(`✅ Created prices for ${plan.name}:`);
      console.log(`   Monthly: ${monthlyPrice.id} (£${plan.monthlyPrice / 100})`);
      console.log(`   Annual: ${annualPrice.id} (£${plan.annualPrice / 100})`);

    } catch (error) {
      console.error(`❌ Error creating ${plan.name} plan:`, error);
    }
  }

  console.log('🎉 Stripe setup completed!');
  
  // List all products and prices for verification
  console.log('\n📋 Summary of created products and prices:');
  const products = await stripe.products.list({ limit: 10 });
  
  for (const product of products.data) {
    if (product.name.includes('Partner Plan')) {
      console.log(`\n🏷️  ${product.name} (${product.id})`);
      
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
      });
      
      for (const price of prices.data) {
        const interval = price.recurring?.interval || 'one-time';
        const amount = price.unit_amount ? `£${price.unit_amount / 100}` : 'Free';
        console.log(`   ${interval}: ${price.id} - ${amount} (${price.lookup_key})`);
      }
    }
  }
}

// Run the setup if called directly
if (require.main === module) {
  createStripeProducts().catch(console.error);
}

export { createStripeProducts };