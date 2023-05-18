import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import clsx from 'clsx'
import { HTMLInputTypeAttribute } from 'react'

type Input = {
  placeholder?: string
  label?: string
  variant: 'search' | 'outlined'
  type?: HTMLInputTypeAttribute
  isRequired?: boolean
  isDisabled?: boolean
  full?: boolean
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  title?: string
}

const Input = ({
  title,
  variant,
  label,
  placeholder,
  type = 'text',
  isRequired = false,
  isDisabled = false,
  full = false,
  className,
  onChange,
  value,
}: Input) => {
  const getButtonClassNames = () => {
    return clsx(
      'py-2 px-4 rounded focus:outline-none font-roboto font-medium tracking-wide transition-colors',
      {
        ' bg-transparent border-2 border-neutral-500 text-neutral-200 placeholder:text-neutral-500 hover:border-neutral-400 focus:border-neutral-400 active:border-neutral-400':
          variant === 'outlined',
        'bg-neutral-600 border-2 border-neutral-500 placeholder:text-neutral-400 text-neutral-200 hover:bg-neutral-700 focus:border-neutral-600 hover:border-neutral-600 focus:bg-neutral-700 active:bg-neutral-700 active:border-neutral-600':
          variant === 'search',
        'w-full': full === true,
      },
      className,
    )
  }
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={title}
          className=" text-white opacity-40 font-inter text-sm tracking-wide"
        >
          {label}
        </label>
      )}
      <input
        title={title}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        disabled={isDisabled}
        value={value}
        required={isRequired}
        className={getButtonClassNames()}
        autoComplete={type === 'email' ? 'email' : 'off'}
        autoCorrect="off"
        autoCapitalize="none"
      />
    </div>
  )
}

export { Input }
