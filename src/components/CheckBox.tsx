import React from 'react'

interface CheckboxProps {
  onToggle: (checked: boolean) => void
  label?: string
  name?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  onToggle,
  label = 'Toggle',
  name = 'customCheckbox',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(event.target.checked)
  }

  return (
    <div className="mb-3">
      <input type="checkbox" id={name} onChange={handleChange} className="form-check-input" />
      <label htmlFor={name} className="form-check-label text-light px-2">
        {label}
      </label>
    </div>
  )
}

export default Checkbox
