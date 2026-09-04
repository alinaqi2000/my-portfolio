import React from 'react'
import { useFormContext } from 'react-hook-form'

const FormCheckbox = React.forwardRef((props, ref) => {
  const { id, label, value, type = 'checkbox', name } = props
  const { setValue } = useFormContext()

  const handleChange = (e) => {
    const { value, checked } = e.target
    setValue(e.target.name, value ? value : checked)
  }

  return (
    <>
      <input
        ref={ref}
        id={id || name}
        name={name}
        type={type}
        value={value}
        className="h-5 w-5 rounded border-line bg-night-inset text-accent focus:ring-accent/40"
        onChange={handleChange}
      />
      <label htmlFor={id || name} className="ml-3 block text-sm text-ink-mute">
        {label}
      </label>
    </>
  )
})

FormCheckbox.displayName = 'FormCheckbox'

export default FormCheckbox
