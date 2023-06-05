import { ReactNode } from 'react'

type Container = {
  variant: 'page' | 'page-content' | 'dashboard-page'
  children?: ReactNode
  className?: string
}

const Container = ({ variant, children, className }: Container) => {
  return variant === 'page' ? (
    <div className="w-full h-full min-h-screen mx-auto my-0 flex flex-col justify-start items-center">
      {children}
    </div>
  ) : variant === 'page-content' ? (
    <main
      className={`w-full h-full min-h-screen  flex flex-col items-center justify-start ${className} overflow-y-hidden`}
    >
      {children}
    </main>
  ) : variant === 'dashboard-page' ? (
    <div className="w-full h-full min-h-screen grid grid-cols-withSidebar max-sm:flex max-sm:gap-8 flex-col items-start justify-center gap-16 p-4 py-12 max-w-[80rem] mx-auto my-0">
      {children}
    </div>
  ) : (
    <></>
  )
}

export { Container }
