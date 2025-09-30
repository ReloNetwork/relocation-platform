import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import Layout from '@/components/Layout'

export default async function TestAuthPage() {
  const user = await getUser()
  
  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#FAFAF9] py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-[#0B1B2B] mb-4">Authentication Test</h1>
            <p className="text-red-600 mb-4">❌ User not authenticated</p>
            <a href="/login" className="bg-[#0B1B2B] text-white px-6 py-3 rounded-md">
              Go to Login
            </a>
          </div>
        </div>
      </Layout>
    )
  }

  const supabase = createClient()
  
  // Check organization without requiring it
  const { data: membership, error } = await supabase
    .from('org_memberships')
    .select('org_id, orgs(name)')
    .eq('user_id', user.id)
    .single()

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0B1B2B] mb-6">Authentication Test</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-green-700">✅ User authenticated successfully!</p>
            </div>
            
            <div>
              <h2 className="font-semibold text-[#0B1B2B] mb-2">User Information:</h2>
              <ul className="space-y-1 text-[#6B7280]">
                <li><strong>Email:</strong> {user.email}</li>
                <li><strong>ID:</strong> {user.id}</li>
                <li><strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}</li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-[#0B1B2B] mb-2">Organization Status:</h2>
              {membership ? (
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-700">✅ Organization found: {(membership as any).orgs?.name}</p>
                  <p className="text-green-600 text-sm">Organization ID: {membership.org_id}</p>
                </div>
              ) : (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-700">⚠️ No organization found</p>
                  {error && <p className="text-yellow-600 text-sm">Error: {error.message}</p>}
                </div>
              )}
            </div>

            <div className="pt-4 space-x-4">
              <a href="/dashboard" className="bg-[#0B1B2B] text-white px-6 py-2 rounded-md">
                Try Dashboard
              </a>
              <a href="/onboarding" className="bg-[#C9A24A] text-white px-6 py-2 rounded-md">
                Try Onboarding
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}