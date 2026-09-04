import React from 'react'
import classNames from 'clsx'

const FormInput = React.forwardRef((props, ref) => {
  const {
    label,
    placeholder,
    id,
    name,
    autoComplete,
    hasError,
    type = 'text',
    inputType,
    ...rest
  } = props

  const tags = {
    text: 'input',
    textarea: 'textarea',
  }

  const Component = tags[type]

  return (
    <>
      <label htmlFor={id || name} className={label ? 'block font-mono text-xs uppercase tracking-widest text-ink-faint' : 'sr-only'}>
        {label || placeholder || name}
      </label>
      <Component
        type={inputType || type}
        ref={ref}
        id={id || name}
        name={name}
        autoComplete={autoComplete}
        className={classNames(
          'block w-full rounded-md border bg-night-inset py-3 px-4 text-sm text-white',
          'font-mono placeholder-ink-faint transition-colors',
          'focus:outline-none focus:ring-2',
          hasError
            ? 'border-term-red focus:border-term-red focus:ring-term-red/40'
            : 'border-line focus:border-accent focus:ring-accent/40'
        )}
        placeholder={placeholder}
        {...rest}
      />
    </>
  )
})

FormInput.displayName = 'FormInput'

export default FormInput
