import React from 'react'
import classNames from 'clsx'
import { FiArrowUpRight } from 'react-icons/fi'
import LoadingDots from '@/components/LoadingDots'

/**
 * Herdr button system — CLI-native: buttons read like shell commands.
 *
 *  - primary / white : solid white fill, black text (the Herdr CTA)
 *  - accent          : solid purple fill, soft glow on hover
 *  - outline         : hairline zinc border, accent on hover
 *  - ghost           : muted text + sliding arrow (inline / tertiary)
 *
 * Non-ghost variants carry a `$` prompt prefix — quiet, on-theme, and the
 * only decoration beyond the arrow. Mono, normal case, press feel, visible
 * focus ring.
 */
const Button = React.forwardRef((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    className,
    as = 'a',
    children,
    showArrow = true,
    ...rest
  } = props

  const Component = as

  return (
    <Component
      ref={ref}
      className={classNames(
        'group relative inline-flex items-center justify-center gap-2 rounded-md',
        'cursor-pointer select-none whitespace-nowrap font-mono font-medium no-underline',
        'transition-all duration-200 ease-out focus:outline-none',
        'focus-visible:ring-offset-night focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'active:translate-y-px active:scale-[.98]',
        disabled && 'pointer-events-none opacity-55',
        {
          'min-h-[34px] px-3 text-xs': size === 'xs',
          'min-h-[38px] px-4 text-xs': size === 'sm',
          'min-h-[44px] px-5 text-sm': size === 'md',
          'min-h-[50px] px-6 text-sm': size === 'lg',
          'min-h-[56px] px-8 text-base': size === 'xl',

          // primary / white — solid white, black text
          'bg-purple-300 text-black shadow-[0_1px_0_rgba(255,255,255,0.2)_inset] hover:bg-zinc-200':
            variant === 'primary' || variant === 'white',
          // accent — solid purple, glow on hover
          'hover:bg-accent-dim bg-accent !text-gray-800 hover:shadow-[0_0_28px_rgba(192,132,252,0.35)]':
            variant === 'accent',
          // outline — hairline that lights up
          'border-line border bg-transparent text-black hover:border-accent/60 hover:text-accent':
            variant === 'outline',
          // ghost — quiet inline action
          'text-ink-mute bg-transparent hover:text-white': variant === 'ghost',
        },
        className
      )}
      disabled={disabled}
      aria-busy={disabled || undefined}
      {...rest}
    >
      <span className={classNames('inline-flex items-center gap-2', { invisible: disabled })}>
        {children}
        {showArrow && (
          <FiArrowUpRight
            className={classNames(
              'shrink-0 transition-transform duration-200',
              size === 'xs' || size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4',
              variant === 'ghost'
                ? 'text-accent group-hover:translate-x-1'
                : 'opacity-70 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100'
            )}
          />
        )}
      </span>
      {disabled && <LoadingDots className="absolute inset-0" />}
    </Component>
  )
})

Button.displayName = 'Button'

export default Button
