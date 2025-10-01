import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  console.log('🚀 NEW AUTH CALLBACK - Simple Version')
  console.log('📍 URL:', request.url)
  console.log('🔑 Code exists:', !!code)
  console.log('🌐 Origin:', origin)

  if (code) {
    console.log('✅ Processing auth code...')
    const supabase = createClient()
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('❌ Code exchange failed:', error.message)
        return NextResponse.redirect(`${origin}/auth-new?error=exchange_failed`)
      }

      if (data?.user && data?.session) {
        console.log('🎉 Authentication successful!')
        console.log('👤 User:', data.user.email)
        console.log('🔄 Redirecting to auth-new page...')
        
        // Redirect back to the auth page, which will detect the session and show success
        return NextResponse.redirect(`${origin}/auth-new?success=true`)
      } else {
        console.error('❌ No user or session in response')
        return NextResponse.redirect(`${origin}/auth-new?error=no_session`)
      }
    } catch (error) {
      console.error('❌ Unexpected error:', error)
      return NextResponse.redirect(`${origin}/auth-new?error=unexpected`)
    }
  }

  console.log('❌ No auth code provided')
  return NextResponse.redirect(`${origin}/auth-new?error=no_code`)
}