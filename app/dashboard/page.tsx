import DashboardPostsList from '@/components/dashboard/dashboard-posts-list'
import { NewPostButton } from '@/components/dashboard/new-post-button'
import { Suspense } from 'react'
import DashboardLoading from '../../components/dashboard/skeletons/dashboard-home-loading'
import { DashboardFilter } from '@/components/dashboard/dashboard-filter'

export const metadata = {
  title: 'rhcraft - Dashboard',
}

export default async function Dashboard() {
  return (
    <main className="flex flex-col w-full items-start justify-start gap-8 ">
      <div className="w-full flex justify-between items-center gap-4 max-sm:flex-col max-sm:items-start">
        <div>
          <h2 className=" text-white text-3xl font-tabloid tracking-wider">
            POSTS
          </h2>
          <p className="font-sans text-neutral-500 font-semibold tracking-wide">
            Create and manage posts
          </p>
        </div>
        <NewPostButton />
      </div>
      <DashboardFilter />
      <DashboardPostsList />
    </main>
  )
}
