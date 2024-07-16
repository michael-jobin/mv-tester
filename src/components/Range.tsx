import React, { useEffect } from 'react'

interface RangeProps {
  onValueChange: (value: number) => void
  value: number
  min?: number
  max?: number
  step?: number
  name?: string
  label?: string
}

const Range: React.FC<RangeProps> = ({
  onValueChange,
  value,
  min = 0,
  max = 1,
  step = 0.01,
  name = 'customRange',
  label = 'Range',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value)
    onValueChange(value)
  }

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label text-light">
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value.toString()}
        onChange={handleChange}
        className="form-range"
        id={name}
      />
    </div>
  )
}

export default Range
