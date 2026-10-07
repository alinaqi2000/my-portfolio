import React from 'react'
import classNames from 'clsx'

const FormSelect = React.forwardRef((props, ref) => {
  const { label, name, autoComplete, hasError, ...rest } = props

  return (
    <>
      {label && (
        <label htmlFor={name} className="block font-mono text-xs uppercase tracking-widest text-ink-faint">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={name}
        name={name}
        autoComplete={autoComplete}
        className={classNames(
          'block w-full rounded-md glass-border glass-subtle py-3 px-4 text-sm text-white',
          'font-mono placeholder-ink-faint transition-colors',
          'focus:outline-none focus:ring-2',
          hasError
            ? 'border-term-red focus:border-term-red focus:ring-term-red/40'
            : 'border-line focus:border-accent focus:ring-accent/40'
        )}
        {...rest}
      >
        {props.options.map(({ label, ...rest }, i) => (
          <option className="text-black" key={i} {...rest}>
            {label}
          </option>
        ))}
      </select>
    </>
  )
})

FormSelect.displayName = 'FormSelect'

export default FormSelect
