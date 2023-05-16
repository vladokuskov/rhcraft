import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      Dashboard page
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Image url: {user.image}</p>
    </>
  )
}
