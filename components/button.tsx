import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

type Button = {
  size?: 'sm1' | 'sm2' | 'sm3' | 'md1' | 'md2' | 'md3' | 'xl1' | 'xl2' | 'xl3'
  title?: string
  icon?: IconDefinition | null
  variant:
    | 'primary'
    | 'secondary'
    | 'service'
    | 'outlined'
    | 'transparent'
    | 'icon'
  status?: 'danger' | 'active'
  onClick?: () => void
  isRequired?: boolean
  isDisabled?: boolean
  full?: boolean
  isLoading?: boolean
  className?: string
}

const Button = ({
  title,
  icon,
  variant = 'primary',
  status,
  onClick,
  isRequired = false,
  isDisabled = false,
  full = false,
  isLoading = false,
  className,
}: Button) => {
  const getButtonClassNames = () => {
    return clsx(
      'py-2 px-4 rounded focus:outline-none font-sans font-bold inline-flex gap-3 justify-center items-center tracking-wide transition-colors',
      {
        'bg-green-500 hover:bg-green-400 focus:bg-green-400 text-white border-2 border-green-400 hover:border-green-300 focus:border-green-300':
          variant === 'primary',
        'bg-yellow-500 hover:bg-yellow-400 focus:bg-yellow-400 text-white border-2 border-yellow-400 hover:border-yellow-300 focus:border-yellow-300':
          variant === 'secondary',
        'bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white border-2 border-blue-400 hover:border-blue-300 focus:border-blue-300':
          variant === 'service',
        'border-2 border-neutral-500 hover:border-neutral-600 text-neutral-500 hover:text-neutral-600 focus:text-neutral-600':
          variant === 'outlined',
        'hover:text-neutral-400 focus:text-neutral-400 bg-transparent':
          variant === 'transparent',
        'bg-transparent hover:text-neutral-400': variant === 'icon',
        'bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white border-2 border-red-400 hover:border-red-500 focus:border-red-500':
          status === 'danger' &&
          (variant === 'primary' ||
            variant === 'secondary' ||
            variant === 'service'),
        'border-2 border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 focus:text-red-600':
          status === 'danger' && variant === 'outlined',
        'hover:text-red-600 focus:text-red-600 text-red-500':
          status === 'danger' &&
          (variant === 'transparent' || variant === 'icon'),
        'bg-neutral-400 hover:bg-neutral-400 focus:bg-neutral-400 text-white border-2 border-neutral-300 hover:border-neutral-300 focus:border-neutral-300':
          isDisabled &&
          (variant === 'primary' ||
            variant === 'secondary' ||
            variant === 'service'),
        'border-2 border-neutral-700 hover:border-neutral-700 text-neutral-700 hover:text-neutral-700 focus:text-neutral-700':
          isDisabled && variant === 'outlined',
        'text-neutral-500 hover:text-neutral-500 focus:text-neutral-500':
          isDisabled && (variant === 'transparent' || variant === 'icon'),
        'w-full': full,
      },
      className,
    )
  }
  return (
    <button
      type={isRequired ? 'submit' : 'button'}
      title={title}
      onClick={onClick}
      disabled={isDisabled}
      className={getButtonClassNames()}
    >
      {variant !== 'icon' && title}
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={isLoading ? 'animate-spin' : ''}
        />
      )}
    </button>
  )
}

export { Button }
