import { useCallback, useEffect } from 'react'
import { useTheme } from '../../../hooks/useTheme'

import './Button.css'
import { TNumber, Operator, TSymbol } from '../../../context/CalculatorContext'
import { useCalculator } from '../../../hooks/useCalculator'
import { getOperator } from '../../../utils/functions/operatorFn'

type ButtonConditionalProps =
  | { type: 'reset'; value: 'C' }
  | { type: 'number'; value: TNumber }
  | { type: 'operator'; value: Operator }
  | { type: 'symbol'; value: TSymbol }

type ButtonProps = { size: 'regular' | 'big' } & ButtonConditionalProps

export default function Button({ value, type, size }: ButtonProps) {
  const { addOperator, addSymbol, addNumber, reset } = useCalculator()
  const { className } = useTheme()

  const onClick = useCallback(() => {
    switch (type) {
      case 'reset':
        reset()
        break
      case 'number':
        addNumber(value)
        break
      case 'operator':
        addOperator(value)
        break
      case 'symbol':
        addSymbol(value)
        break
      default:
        break
    }
  }, [addNumber, addOperator, addSymbol, reset, type, value])

  useEffect(() => {
    function handlePressKey(event: KeyboardEvent) {
      event.preventDefault()
      if (type !== 'reset')
        if (event.key.toLowerCase() === value.toLowerCase()) {
          onClick()
          return
        }
      if (event.key === 'Enter' && value === '=') {
        onClick()
      }
    }

    document.addEventListener('keydown', handlePressKey)

    return () => {
      document.removeEventListener('keydown', handlePressKey)
    }
  }, [onClick, type, value])

  return (
    <button
      onClick={onClick}
      className={className(
        'button' + ' ' + size + (type === 'reset' ? ' colored' : ''),
      )}
      autoFocus={value === '='}
    >
      {type === 'operator' ? getOperator(value) : value}
    </button>
  )
}
