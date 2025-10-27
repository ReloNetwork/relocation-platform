'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { User, Lock, ArrowRight } from 'lucide-react'
import { Button } from '../../ui/components/button'
import Layout from '../../components/Layout'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface AuthGuardProps {
  children: React.ReactNode
  requiredLevel?: 'executive' | 'corporate' | 'any'
}

export default function AuthGuard({ children, requiredLevel = 'any' }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setIsAuthenticated(false)
    }
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A24A] mx-auto mb-4"></div>
            <p className="text-[#6B7280]">Checking authentication...</p>
          </div>
        </div>
      </Layout>
    )
  }

  // Not authenticated - show login prompt
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#FAFAF9] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-[#C9A24A]" />
              </div>
              
              <h1 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Directory Access Required
              </h1>
              
              <p className="text-[#6B7280] text-lg mb-8 max-w-2xl mx-auto">
                Our exclusive London directory is available to Executive and Corporate members. 
                Please complete your service assessment to gain access to detailed area insights, property data, and professional recommendations.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-[#C9A24A] to-[#B8923D] rounded-lg p-6 text-white">
                  <User className="w-8 h-8 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Executive Services</h3>
                  <p className="text-white/90 mb-4">
                    Individual executives, professionals, and entrepreneurs
                  </p>
                  <Button 
                    onClick={() => router.push('/executive-intake')}
                    className="w-full bg-white text-[#C9A24A] hover:bg-white/90 font-semibold"
                  >
                    Start 72-Hour Audit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="bg-gradient-to-br from-[#0B1B2B] to-[#1a2b3b] rounded-lg p-6 text-white">
                  <User className="w-8 h-8 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Corporate Programs</h3>
                  <p className="text-white/90 mb-4">
                    HR teams managing employee relocations
                  </p>
                  <Button 
                    onClick={() => router.push('/corporate-assessment')}
                    className="w-full bg-white text-[#0B1B2B] hover:bg-white/90 font-semibold"
                  >
                    Corporate Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[#6B7280] text-sm mb-4">
                  Already have access? Contact our team for assistance.
                </p>
                <p className="text-[#C9A24A] font-medium">
                  📞 +44 20 3105 9566 | 📧 hello@therelonetwork.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Authenticated - render children
  return <>{children}</>
}