import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type buttonVariant = 'regular' | 'outline' | 'ghost' | 'secondary' | 'service'
type buttonSize = 'regular' | 'large' | 'small'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSize
  variant: buttonVariant
  children: ReactNode
  className?: string
}

const sizesClass = {
  large: 'px-5 py-3 text-base',
  small: 'px-2 py-2',
  regular: 'px-4 py-2 text-sm',
}

const Button = ({
  variant = 'regular',
  size = 'regular',
  className,
  children,
  ...props
}: ButtonProps) => {
  //
  return (
    <button
      className={clsx(
        'rounded focus:outline-none font-sans transition-colors',
        'inline-flex gap-3 justify-center items-center text-center flex-nowrap whitespace-nowrap',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'regular' &&
          'bg-green-500 hover:bg-green-400 focus:bg-green-400 hover:border-green-300 focus:border-green-300 border-2 border-green-400 text-white disabled:hover:bg-green-500 disabled:hover:border-green-400',
        variant === 'secondary' &&
          'bg-yellow-400 hover:bg-yellow-300 focus:bg-yellow-300 hover:border-yellow-100 focus:border-yellow-100 border-2 border-yellow-200 text-white disabled:hover:bg-yellow-400 disabled:hover:border-yellow-200',
        variant === 'service' &&
          'bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 hover:border-blue-300 focus:border-blue-300 border-2 border-blue-300 text-white disabled:hover:bg-blue-500 disabled:hover:border-blue-300',
        variant === 'outline' &&
          ' bg-transparent hover:border-neutral-400 hover:text-neutral-400 focus:text-neutral-400 focus:border-neutral-400 border-2 border-neutral-500 text-neutral-500 disabled:hover:border-neutral-500 disabled:hover:text-neutral-500',
        variant === 'ghost' &&
          'bg-transparent hover:text-neutral-400 focus:text-neutral-400 text-white-100 disabled:hover:text-white-100',
        sizesClass[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }
