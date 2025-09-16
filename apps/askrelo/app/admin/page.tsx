import { requireUser } from '@/lib/auth'
import { requireUserWithOrg } from '@/lib/org'
import { createClient } from '@/lib/supabase/server'
import Layout from '@/components/Layout'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const user = await requireUser()
  const { userId, orgId, organization } = await requireUserWithOrg(user.id)
  
  const supabase = createClient()

  // Check if user has admin role in their organization
  const { data: membership } = await supabase
    .from('org_memberships')
    .select('role')
    .eq('user_id', userId)
    .eq('org_id', orgId)
    .single()

  if (!membership || membership.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Admin Dashboard
            </h1>
            <p className="text-[#6B7280] text-lg">
              Manage your organization and access administrative tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-2">Payment Links</h3>
              <p className="text-[#6B7280] text-sm mb-4">Generate and manage payment links for services</p>
              <a
                href="/admin/payment-links"
                className="inline-flex items-center px-4 py-2 bg-[#C9A24A] text-white rounded-md hover:bg-[#B8923D] transition-colors"
              >
                Manage Links
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-2">Organization Settings</h3>
              <p className="text-[#6B7280] text-sm mb-4">Configure organization details and preferences</p>
              <button className="inline-flex items-center px-4 py-2 bg-[#0B1B2B] text-white rounded-md hover:bg-[#0B1B2B]/90 transition-colors">
                Settings
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-2">User Management</h3>
              <p className="text-[#6B7280] text-sm mb-4">Manage organization members and permissions</p>
              <button className="inline-flex items-center px-4 py-2 bg-[#0B1B2B] text-white rounded-md hover:bg-[#0B1B2B]/90 transition-colors">
                Manage Users
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}