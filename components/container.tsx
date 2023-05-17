import { ReactNode } from 'react'

type Container = {
  variant: 'page'
  children?: ReactNode
}

const Container = ({ variant, children }: Container) => {
  return variant === 'page' ? (
    <div className="w-full h-full min-h-screen mx-auto my-0 flex flex-col justify-start items-center">
      {children}
    </div>
  ) : (
    <></>
  )
}

export { Container }
