import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

interface ProductConfig {
  name: string;
  description: string;
  price?: number; // in pence (for one-time payments)
  monthlyPrice?: number; // in pence
  annualPrice?: number; // in pence
  lookupKey: string;
  type: 'one_time' | 'recurring' | 'both';
}

const products: ProductConfig[] = [
  // Charter Partnership Products
  {
    name: 'Founding Partner Charter',
    description: 'Founding Partner Charter - £25,000 (12 months exclusivity)',
    price: 2500000, // £25,000.00
    lookupKey: 'founding_partner',
    type: 'one_time',
  },
  {
    name: 'Premium Sponsor',
    description: 'Premium Sponsor - £5,000 (90 days)',
    price: 500000, // £5,000.00
    lookupKey: 'premium_sponsor',
    type: 'one_time',
  },
  
  // Directory Access Products
  {
    name: 'Executive Intake',
    description: 'Executive Intake - 60-min strategy call, bespoke shortlist, 3 warm intros, 30-day execution window',
    price: 150000, // £1,500.00
    lookupKey: 'executive_intake',
    type: 'one_time',
  },
  {
    name: 'Plus Directory Access',
    description: 'Plus - Full filters & contact details, 3 curated intros/month, templates bundle',
    monthlyPrice: 2900, // £29.00
    annualPrice: 29000, // £290.00
    lookupKey: 'plus',
    type: 'both',
  },
  {
    name: 'Pro Directory Access',
    description: 'Pro - Unlimited curated intros, 48-hour area shortlist, WhatsApp line, doc pre-check',
    monthlyPrice: 9900, // £99.00
    annualPrice: 99000, // £990.00
    lookupKey: 'pro',
    type: 'both',
  },
  
  // Accelerator Products
  {
    name: '72-Hour Day Pass',
    description: '72-Hour Day Pass - Full access + 1 curated intro',
    price: 5900, // £59.00
    lookupKey: 'day_pass',
    type: 'one_time',
  },
  {
    name: 'Intro Pack (3)',
    description: '3 curated introductions',
    price: 14900, // £149.00
    lookupKey: 'intro_pack_3',
    type: 'one_time',
  },
  {
    name: 'Premium Intro Pack (10)',
    description: '10 curated introductions',
    price: 39900, // £399.00
    lookupKey: 'intro_pack_10',
    type: 'one_time',
  },
];

async function createStripeProducts() {
  console.log('🏗️  Creating new Relo Network 2025 Stripe products...');

  for (const productConfig of products) {
    try {
      // Create or retrieve product
      let product: Stripe.Product;
      
      const existingProducts = await stripe.products.search({
        query: `name:"${productConfig.name}"`,
      });

      if (existingProducts.data.length > 0) {
        product = existingProducts.data[0];
        console.log(`✅ Found existing product: ${product.name}`);
      } else {
        product = await stripe.products.create({
          name: productConfig.name,
          description: productConfig.description,
          metadata: {
            lookup_key: productConfig.lookupKey,
            type: productConfig.type,
          },
        });
        console.log(`✅ Created product: ${product.name}`);
      }

      // Create one-time payment price
      if (productConfig.price && (productConfig.type === 'one_time' || productConfig.type === 'both')) {
        try {
          const oneTimePrice = await stripe.prices.create({
            unit_amount: productConfig.price,
            currency: 'gbp',
            product: product.id,
            lookup_key: productConfig.lookupKey,
            metadata: {
              type: 'one_time',
              product_name: productConfig.name,
            },
          });
          console.log(`   ✅ One-time: ${oneTimePrice.id} (£${productConfig.price / 100})`);
        } catch (error: any) {
          if (error.code !== 'resource_already_exists') {
            console.error(`   ❌ Error creating one-time price: ${error.message}`);
          } else {
            console.log(`   ⚠️  One-time price already exists for ${productConfig.name}`);
          }
        }
      }

      // Create monthly price
      if (productConfig.monthlyPrice && (productConfig.type === 'recurring' || productConfig.type === 'both')) {
        try {
          const monthlyPrice = await stripe.prices.create({
            unit_amount: productConfig.monthlyPrice,
            currency: 'gbp',
            recurring: {
              interval: 'month',
            },
            product: product.id,
            lookup_key: `${productConfig.lookupKey}_monthly`,
            metadata: {
              type: 'monthly',
              product_name: productConfig.name,
            },
          });
          console.log(`   ✅ Monthly: ${monthlyPrice.id} (£${productConfig.monthlyPrice / 100})`);
        } catch (error: any) {
          if (error.code !== 'resource_already_exists') {
            console.error(`   ❌ Error creating monthly price: ${error.message}`);
          } else {
            console.log(`   ⚠️  Monthly price already exists for ${productConfig.name}`);
          }
        }
      }

      // Create annual price
      if (productConfig.annualPrice && (productConfig.type === 'recurring' || productConfig.type === 'both')) {
        try {
          const annualPrice = await stripe.prices.create({
            unit_amount: productConfig.annualPrice,
            currency: 'gbp',
            recurring: {
              interval: 'year',
            },
            product: product.id,
            lookup_key: `${productConfig.lookupKey}_annual`,
            metadata: {
              type: 'annual',
              product_name: productConfig.name,
            },
          });
          console.log(`   ✅ Annual: ${annualPrice.id} (£${productConfig.annualPrice / 100})`);
        } catch (error: any) {
          if (error.code !== 'resource_already_exists') {
            console.error(`   ❌ Error creating annual price: ${error.message}`);
          } else {
            console.log(`   ⚠️  Annual price already exists for ${productConfig.name}`);
          }
        }
      }

    } catch (error) {
      console.error(`❌ Error creating ${productConfig.name}:`, error);
    }
  }

  console.log('\n🎉 Stripe product setup completed!');
  
  // List all relevant products for verification
  console.log('\n📋 Summary of Relo Network products:');
  const allProducts = await stripe.products.list({ limit: 20 });
  
  const reloProducts = allProducts.data.filter(p => 
    p.name.includes('Partner') || 
    p.name.includes('Directory') || 
    p.name.includes('Executive') || 
    p.name.includes('Day Pass') || 
    p.name.includes('Intro Pack') ||
    p.name.includes('Sponsor')
  );

  for (const product of reloProducts) {
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

// Run the setup if called directly
if (require.main === module) {
  createStripeProducts().catch(console.error);
}

export { createStripeProducts };