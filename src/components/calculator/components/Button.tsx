import { ReactNode, useEffect } from 'react'
import { useTheme } from '../../../hooks/useTheme'

import './Button.css'

type ButtonProps = {
  data: { value?: string; label: string | ReactNode }
  onClick: (value: string | ReactNode) => void
  colored?: boolean
  size: 'regular' | 'big'
}

export default function Button({ data, onClick, colored, size }: ButtonProps) {
  const { className } = useTheme()

  useEffect(() => {
    function handlePressKey(event: KeyboardEvent) {
      if (event.key === data.value) {
        onClick(data.value)
      }
    }
    document.addEventListener('keydown', handlePressKey)

    return () => {
      document.removeEventListener('keydown', handlePressKey)
    }
  }, [onClick, data.value])

  return (
    <button
      onClick={() => onClick(data.value)}
      className={className('button' + ' ' + size + (colored ? ' colored' : ''))}
    >
      {data.label}
    </button>
  )
}
