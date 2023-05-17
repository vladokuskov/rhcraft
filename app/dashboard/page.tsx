import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return <>Dashboard</>
}
