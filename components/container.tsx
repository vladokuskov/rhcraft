import { ReactNode } from 'react'

type Container = {
  variant: 'page' | 'page-content' | 'dashboard-page'
  children?: ReactNode
}

const Container = ({ variant, children }: Container) => {
  return variant === 'page' ? (
    <div className="w-full h-full min-h-screen mx-auto my-0 flex flex-col justify-start items-center">
      {children}
    </div>
  ) : variant === 'page-content' ? (
    <main className="w-full h-full min-h-screen max-w-[80rem] mx-auto my-0 p-4 pt-16 flex flex-col items-center justify-start ">
      {children}
    </main>
  ) : variant === 'dashboard-page' ? (
    <div className="w-full h-full min-h-screen mx-auto my-0 grid grid-cols-withSidebar max-sm:flex max-sm:gap-8 flex-col items-start justify-center gap-16">
      {children}
    </div>
  ) : (
    <></>
  )
}

export { Container }
