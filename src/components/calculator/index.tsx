import { useTheme } from '../../hooks/useTheme'
import LogoLight from '../../assets/images/logo_light.png'
import LogoDark from '../../assets/images/logo_dark.png'
import { Screen } from './Screen'
import './index.css'
import { useState } from 'react'
import { Keyboard } from './Keyboard'

export type Operations = 'plus' | 'minus' | 'times' | 'divided' | 'mod'

type Calculation = {
  number: string
  staged?: string
  operation?: Operations
}

const INITIAL_STATE: Calculation = {
  number: '0',
}

export default function Calculator() {
  const { theme, className } = useTheme()
  const [calculation, setCalculation] = useState<Calculation>(INITIAL_STATE)

  function handleNumberChange(value: string) {
    setCalculation((prev) => ({ ...prev, number: value }))
  }

  function onOperationChange(operation: Operations) {
    if (operation == 'minus' && calculation.number === '0') {
      setCalculation((prev) => ({ ...prev, number: '-' }))
      return
    }

    if (calculation.staged && calculation.number) {
      handleSubmit()
    }

    setCalculation((prev) => ({ ...prev, operation }))
  }

  function handleSubmit() {
    if (calculation.staged && calculation.number) {
      const num = parseFloat(calculation.number)
      const stg = parseFloat(calculation.staged)
      let result = ''

      switch (calculation.operation) {
        case 'plus':
          result = (num + stg).toString()
          break

        case 'minus':
          result = (num - stg).toString()
          break

        case 'times':
          result = (num * stg).toString()
          break

        case 'divided':
          result = (num / stg).toString()
          break

        case 'mod':
          result = (num % stg).toString()
          break
      }

      setCalculation({
        operation: undefined,
        staged: undefined,
        number: result,
      })
    }
  }

  return (
    <main className={className('container')}>
      <div className={className('content')}>
        <img src={theme === 'light' ? LogoDark : LogoLight} alt="kasio logo" />
        <Screen value={calculation.number} />
        <Keyboard onChange={handleNumberChange} />
      </div>
    </main>
  )
}
