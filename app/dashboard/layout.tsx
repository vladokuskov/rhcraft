import { Container } from '@/components/container'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { FilterContextProvider } from '../context/filter.context'

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
      <FilterContextProvider>
        <div className="w-full  h-full min-h-screen flex flex-col items-start justify-start py-4">
          {children}
        </div>
      </FilterContextProvider>
    </Container>
  )
}
