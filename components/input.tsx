import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

type inputVariant = 'regular' | 'outline'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: inputVariant
  className?: string
  label?: string | null
  id?: string
}

const Input = ({
  variant = 'regular',
  className,
  children,
  label = null,
  id,
  ...props
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className=" text-white opacity-40 font-inter text-sm tracking-wide"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          'px-4 py-2 text-sm rounded focus:outline-none font-roboto tracking-wide transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variant === 'regular' &&
            'bg-neutral-600 border-2 border-neutral-500 placeholder:text-neutral-400 text-neutral-200 hover:bg-neutral-700 focus:border-neutral-600 hover:border-neutral-600 focus:bg-neutral-700 active:bg-neutral-700 active:border-neutral-600',
          variant === 'outline' &&
            'bg-transparent border-2 border-neutral-500 text-neutral-200 placeholder:text-neutral-500 hover:border-neutral-400 focus:border-neutral-400 active:border-neutral-400 disabled:border-neutral-500 disabled:text-neutral-200',

          className,
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
