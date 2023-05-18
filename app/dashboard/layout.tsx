import { Container } from '@/components/container'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
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
    <Container variant="dashboard-page">
      <DashboardSidebar />
      <div className="w-full h-1 w-full h-full min-h-screen flex flex-col items-start justify-start">
        {children}
      </div>
    </Container>
  )
}
