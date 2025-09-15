import { requireUser } from '@/lib/auth'
import { requireUserWithOrg } from '@/lib/org'
import Layout from '@/components/Layout'
import BookingContent from './BookingContent'

export default async function BookPage() {
  const user = await requireUser()
  const { userId, orgId, organization } = await requireUserWithOrg(user.id)

  return (
    <Layout>
      <BookingContent 
        user={user}
        organization={organization}
        orgId={orgId}
      />
    </Layout>
  )
}