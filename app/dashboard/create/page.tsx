import { CreatePostForm } from '@/components/dashboard/create-post-form'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function DashboardCreationPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className=" flex flex-col w-48 gap-3">
      <Link href="/dashboard/">Back to dashboard</Link>
      <CreatePostForm user={user} />
    </div>
  )
}
