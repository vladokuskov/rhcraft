import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-start justify-start">
      {children}
    </div>
  )
}
