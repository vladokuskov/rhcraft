import DraftsList from '@/components/dashboard/drafts-list'
import { NewPostButton } from '@/components/dashboard/new-post-button'

export const metadata = {
  title: 'rhcraft - Dashboard',
}

export default async function Dashboard() {
  return (
    <main className="flex flex-col w-full items-start justify-start gap-8">
      <div className="w-full flex justify-between items-start gap-4 max-sm:flex-col">
        <div>
          <h2 className=" text-white text-3xl font-tabloid tracking-wider">
            DRAFTS
          </h2>
          <p className="font-sans text-neutral-500 font-semibold tracking-wide">
            Create and manage posts
          </p>
        </div>
        <NewPostButton />
      </div>
      <DraftsList />
    </main>
  )
}
