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
    <div className="w-full max-w-sm">
      <h3 className="font-sans pb-4 text-xl text-center">
        Login to RHCraft Dashboard
      </h3>
      <AuthForm />
    </div>
  )
}
