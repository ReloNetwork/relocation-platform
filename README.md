# Relo Network - AskRelo MVP

**Relocate to London. Effortlessly.**

Vetted experts, elite services, and a 24/7 AI concierge—one accountable partner from landing to "I live here."

## 🏗️ Architecture

This is a monorepo built with:

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Auth, Database, Storage) + Stripe + Cal.com + Resend
- **Deployment**: Vercel (recommended)

### Project Structure

```
├── apps/askrelo/              # Next.js application
│   ├── app/                   # App router pages and API routes
│   ├── components/            # Application components
│   └── lib/                   # Utilities and configurations
├── packages/ui/               # Shared component library
├── database/                  # Database schema and seed data
└── scripts/                   # Setup and deployment scripts
```

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 20+ 
- pnpm (recommended) or npm
- Supabase account
- Stripe account (for payments)
- Resend account (for emails)
- Cal.com account (for booking)

### 2. Environment Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd relo-network
   pnpm install
   ```

2. **Configure environment variables:**
   ```bash
   cp apps/askrelo/.env.example apps/askrelo/.env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Stripe
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Resend
   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=hello@therelonetwork.com

   # Cal.com
   CAL_COM_API_KEY=cal_live_...
   NEXT_PUBLIC_CAL_COM_EMBED_ID=your_cal_embed_id

   # App URLs
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   WEBHOOK_SECRET=your_webhook_secret
   ```

### 3. Database Setup

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Apply the database schema:**
   ```bash
   pnpm db:push
   ```

3. **Seed with demo data:**
   ```bash
   pnpm db:seed
   ```

### 4. Stripe Setup

1. **Create Stripe products and prices:**
   ```bash
   ./scripts/db-setup.sh stripe
   ```

2. **Configure webhook endpoint** in Stripe Dashboard:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `invoice.payment_succeeded`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`

### 5. Development

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Features Implemented

### Core Pages
- **Homepage (`/`)**: Hero section with brand messaging and waitlist signup
- **Concierge (`/concierge`)**: Human-assisted service tiers and pricing
- **Directory (`/directory`)**: Vetted supplier listings with filtering
- **Account (`/account`)**: Client dashboard with case timeline, tasks, messages

### API Routes
- **`/api/waitlist`**: Join waiting list with email validation
- **`/api/messages`**: Send/receive case messages
- **`/api/tasks`**: Create and update relocation tasks
- **`/api/suppliers/list`**: Get filtered supplier listings
- **`/api/suppliers/checkout`**: Create Stripe checkout sessions
- **`/api/webhooks/stripe`**: Handle payment events
- **`/api/webhooks/cal`**: Handle booking events

### Integrations
- **Supabase**: User authentication, database, file storage
- **Stripe**: Subscription billing for supplier partners
- **Cal.com**: Appointment booking and scheduling
- **Resend**: Transactional email templates

## 🎨 Design System

### Brand Colors
- **Primary**: `#0B1B2B` (Deep navy)
- **Accent**: `#C9A24A` (Warm gold)
- **Background**: `#FAFAF9` (Warm white)
- **Card**: `#FFFFFF` (Pure white)

### Typography
- **Display**: Playfair Display (H1, H2)
- **Body**: Inter (paragraphs, UI)

### Component Library
Shared components in `packages/ui/src/`:
- `Button` - Primary, secondary, outline variants
- `Card` - Content containers with header/footer
- `Badge` - Status indicators with color variants
- `Timeline` - Task progress visualization

## 🗄️ Database Schema

### Core Tables
- `users` - User accounts with roles (client, concierge, supplier, admin)
- `client_profiles` - Extended client information and preferences
- `move_cases` - Individual relocation cases with status tracking
- `tasks` - Actionable items with assignments and due dates
- `messages` - Case communication between stakeholders
- `suppliers` - Vetted service providers with categories and ratings
- `supplier_subscriptions` - Stripe billing for supplier partnerships

### Key Features
- **Row Level Security (RLS)**: Ensures users only see their own data
- **Real-time subscriptions**: Live updates for messages and task status
- **Comprehensive audit trail**: All changes tracked with timestamps

## 🔧 Development Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm lint             # Run ESLint
pnpm typecheck        # Type checking

# Database
pnpm db:push          # Apply schema changes
pnpm db:seed          # Populate with demo data
pnpm db:reset         # Drop and recreate database

# Manual operations
./scripts/db-setup.sh push    # Push schema only
./scripts/db-setup.sh seed    # Seed data only
./scripts/db-setup.sh stripe  # Setup Stripe products
```

## 📊 Demo Data

The seed script creates:
- **4 demo users**: Admin, concierge, client, supplier
- **1 active case**: NY → London relocation in progress
- **5 tasks**: Mix of completed, in-progress, and pending
- **6 suppliers**: Across movers, housing, and local experts
- **3 pricing plans**: Starter (£395), Featured (£795), Sponsored (£1,495)
- **Sample messages**: Realistic conversation between client and concierge

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Set build settings:**
   - Build Command: `pnpm build`
   - Output Directory: `apps/askrelo/.next`
   - Install Command: `pnpm install`

### Environment Variables for Production
Ensure all environment variables from `.env.example` are configured in your deployment platform.

### Post-Deployment
1. Update webhook URLs in Stripe and Cal.com dashboards
2. Configure custom domain
3. Test all integration endpoints

## 🤝 Contributing

### Code Standards
- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- Conventional commit messages
- Component-first architecture

### Development Workflow
1. Create feature branch from `main`
2. Implement changes with tests
3. Run linting and type checking
4. Submit PR with clear description

## 📝 Next Steps

### Immediate Priorities
- [ ] Implement authentication flows
- [ ] Add file upload functionality
- [ ] Create supplier onboarding flow
- [ ] Build admin dashboard
- [ ] Add search and filtering

### Future Enhancements
- [ ] Mobile app (React Native)
- [ ] AI chat integration
- [ ] Multi-corridor support (NYC, Paris, etc.)
- [ ] Advanced analytics dashboard
- [ ] Third-party API integrations

## 📞 Support

- **Email**: developers@therelonetwork.com
- **Documentation**: [Internal wiki]
- **Slack**: #relo-engineering

---

Built with ❤️ for those who know London — and those who want to. 
