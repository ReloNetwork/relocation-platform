'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/ui/components/button'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSignOut}
      className="text-[#6B7280] hover:text-[#0B1B2B] hover:bg-[#C9A24A]/10"
    >
      Sign Out
    </Button>
  )
}