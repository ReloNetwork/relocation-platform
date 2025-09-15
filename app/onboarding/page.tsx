import { requireUser } from '@/lib/auth'
import OnboardingForm from './OnboardingForm'
import Layout from '@/components/Layout'

export default async function OnboardingPage() {
  const user = await requireUser()

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-[#FAFAF9] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Welcome to Relo Network
            </h1>
            <p className="text-lg text-[#6B7280] mb-2">
              Let's get your relocation journey started
            </p>
            <p className="text-[#6B7280]">
              Please provide some basic information to set up your account
            </p>
          </div>

          <OnboardingForm user={user} />
        </div>
      </div>
    </Layout>
  )
}