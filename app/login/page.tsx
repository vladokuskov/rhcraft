import { AuthForm } from '@/components/auth-form'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'rhcraft - Login',
}

export default async function Login() {
  const user = await getCurrentUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="w-full max-w-[80rem] mx-auto my-0 px-4 py-12">
      <h3 className="font-sans pb-4 text-xl text-center">RHCraft Dashboard</h3>
      <AuthForm />
    </div>
  )
}
