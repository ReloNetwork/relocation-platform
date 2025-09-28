import { redirect } from 'next/navigation';
import { createServiceSupabase } from '../../lib/supabase';
import Layout from '@/components/Layout';

async function createCase(formData: FormData) {
  'use server';
  const sb = createServiceSupabase();

  const payload = {
    full_name: String(formData.get('full_name') || ''),
    email:     String(formData.get('email') || ''),
    phone:     String(formData.get('phone') || ''),
    origin:    String(formData.get('origin_city') || ''),
    dest:      String(formData.get('destination_city') || ''),
    target:    String(formData.get('target_date') || '')
  };

  try {
    // create case using existing table structure
    const { data: mc, error: mErr } = await sb
      .from('move_cases')
      .insert({
        client_name: payload.full_name,
        origin_city: payload.origin,
        destination_city: payload.dest,
        target_date: payload.target,
        status: 'intake'
      })
      .select()
      .single();
    
    if (mErr) throw new Error(`Case creation failed: ${mErr.message}`);

    // seed initial tasks
    const seed = [
      { title: 'Complete KYC & onboarding', status: 'todo', sort: 1 },
      { title: 'Upload tenancy documents',  status: 'todo', sort: 2 },
      { title: 'Book consultation call',    status: 'todo', sort: 3 },
      { title: 'Property search briefing',  status: 'todo', sort: 4 },
      { title: 'Initial property recommendations', status: 'todo', sort: 5 },
    ].map(t => ({ ...t, case_id: mc.id }));
    
    const { error: taskErr } = await sb.from('tasks').insert(seed);
    if (taskErr) console.warn('Failed to create initial tasks:', taskErr.message);

    // Create welcome message
    const { error: msgErr } = await sb.from('messages').insert({
      case_id: mc.id,
      sender: 'concierge',
      body: `Welcome to Relo Network! We've created your relocation case and are excited to help you move to ${payload.dest}. Our team will review your requirements and be in touch within 24 hours. In the meantime, please review the initial tasks in your dashboard.`
    });
    
    if (msgErr) console.warn('Failed to create welcome message:', msgErr.message);

    redirect(`/case/${mc.id}`);
  } catch (error) {
    console.error('Case creation failed:', error);
    // In a production app, you'd want to show this error to the user
    throw error;
  }
}

export default function CreateCasePage() {
  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-2xl p-6 space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Start Your London Relocation
            </h1>
            <p className="text-lg text-[#6B7280]">
              Let's create your personalized relocation case and get you started on your journey to London.
            </p>
          </div>

          <form action={createCase} className="space-y-6 bg-white rounded-2xl p-8 shadow-lg border border-[#0B1B2B]/10">
            <div className="grid sm:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="font-medium text-[#0B1B2B]">Full Name</span>
                <input 
                  name="full_name" 
                  required 
                  placeholder="Enter your full name"
                  className="p-3 rounded-xl border border-[#E5E7EB] focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all" 
                />
              </label>
              
              <label className="flex flex-col gap-2">
                <span className="font-medium text-[#0B1B2B]">Email Address</span>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="your.email@example.com"
                  className="p-3 rounded-xl border border-[#E5E7EB] focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all" 
                />
              </label>
              
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="font-medium text-[#0B1B2B]">Phone Number</span>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="+44 123 456 7890"
                  className="p-3 rounded-xl border border-[#E5E7EB] focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all" 
                />
              </label>
              
              <label className="flex flex-col gap-2">
                <span className="font-medium text-[#0B1B2B]">From (Current City)</span>
                <input 
                  name="origin_city" 
                  required 
                  placeholder="e.g. New York, Singapore"
                  className="p-3 rounded-xl border border-[#E5E7EB] focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all" 
                />
              </label>
              
              <label className="flex flex-col gap-2">
                <span className="font-medium text-[#0B1B2B]">To (Destination in London)</span>
                <input 
                  name="destination_city" 
                  required 
                  placeholder="e.g. Canary Wharf, Kensington"
                  className="p-3 rounded-xl border border-[#E5E7EB] focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all" 
                />
              </label>
              
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="font-medium text-[#0B1B2B]">Target Move Date</span>
                <input 
                  type="date" 
                  name="target_date" 
                  required 
                  min={new Date().toISOString().split('T')[0]}
                  className="p-3 rounded-xl border border-[#E5E7EB] focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all" 
                />
              </label>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full rounded-xl px-6 py-4 font-semibold text-lg shadow-lg bg-[#0B1B2B] text-[#C9A24A] hover:bg-[#0B1B2B]/90 hover:scale-105 transition-all duration-200"
              >
                Create My Relocation Case
              </button>
            </div>

            <div className="text-center text-sm text-[#6B7280] pt-4">
              <p>By creating a case, you agree to our terms of service and privacy policy.</p>
              <p className="mt-2">Our team will review your case and contact you within 24 hours.</p>
            </div>
          </form>

          <div className="bg-[#C9A24A]/5 rounded-xl p-6 border border-[#C9A24A]/20">
            <h3 className="font-semibold text-[#0B1B2B] mb-3">What happens next?</h3>
            <div className="space-y-3 text-[#6B7280]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                <span>We'll create your personalized relocation dashboard with key tasks and milestones</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                <span>Our team will review your requirements and location preferences within 24 hours</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                <span>You'll receive curated property recommendations and vetted service provider matches</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
                <span>Your dedicated concierge will guide you through every step of the relocation process</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[#6B7280] text-sm">
              Need help? Contact our team at <a href="mailto:hello@relo-network.com" className="text-[#C9A24A] font-medium">hello@relo-network.com</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}