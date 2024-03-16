import { useTheme } from '../../hooks/useTheme'
import LogoLight from '../../assets/images/logo_light.png'
import LogoDark from '../../assets/images/logo_dark.png'
import Screen from './components/Screen'
import './index.css'
import { useState } from 'react'
import Keyboard from './components/Keyboard'
import {
  FunctionPerLabel,
  getFunctionPerLabel,
  isSymbol,
  removeParentesis,
} from '../../utils/functions/symbolsFn'

type Calculation = {
  number: string
  operation: string[]
}

const INITIAL_STATE: Calculation = {
  number: '0',
  operation: [],
}

export default function Calculator() {
  const { theme, className } = useTheme()
  const [calculation, setCalculation] = useState<Calculation>(INITIAL_STATE)

  const saved_ops = localStorage.getItem('ops')
  const local_ops = saved_ops ? JSON.parse(saved_ops) : []

  function handleNumberChange(value: string) {
    if (value.trim() === '') return

    const lastChar = value[value.length - 1]

    if (value.length === 1) {
      if (isSymbol(value)) {
        const symbol = getFunctionPerLabel(value)
        if (symbol?.label === '−') {
          setCalculation((prev) => ({ ...prev, number: value }))
          return
        }
      }

      if (value === '.') {
        setCalculation((prev) => ({ ...prev, number: '0.' }))
      }
    }

    // typed a arithmetic sign
    if (isSymbol(lastChar)) {
      if (lastChar === '=') handleEquals()
      else addToOperation(calculation.number, lastChar)
      return
    }

    setCalculation((prev) => ({ ...prev, number: value.trim() }))
  }

  function addToOperation(value: string, symbol: string) {
    let newValue = ''
    if (value.length > 1 && value.startsWith('−'))
      newValue = `(${parseFloat(value)})`

    setCalculation((prev) => ({
      ...prev,
      operation: [...prev.operation, newValue, symbol],
    }))
  }

  function handleEquals() {
    const operation = calculation.operation
    let result: number | undefined
    let sign: FunctionPerLabel | undefined

    // whether there is only one element in the array or the last element of
    //the array operation is an arithmetic sign
    if (operation.length === 1 || isSymbol(operation[operation.length - 1]))
      return

    calculation.operation.forEach((numOp) => {
      // element is a symbol
      if (isSymbol(numOp) && getFunctionPerLabel(numOp)) {
        sign = getFunctionPerLabel(numOp)!
        return
      }
      const numberWithNoParentesis = removeParentesis(numOp)
      const number = parseFloat(numberWithNoParentesis)

      if (!isNaN(number)) {
        // no number waiting to be calculated
        if (!result) result = number
        // there is number waiting to be calculated and a arithmetic sign
        else if (sign) {
          result = sign.func(result, number)
          sign = undefined
        }
      }
    })

    if (sign && result) {
      result = sign.func(result, parseFloat(calculation.number))
    }

    if (result) {
      localStorage.setItem(
        'ops',
        JSON.stringify([...local_ops, [...operation, '=', result]]),
      )
      setCalculation({ number: result?.toString(), operation: [] })
    }
  }

  return (
    <main className={className('container')}>
      <div className={className('content')}>
        <img src={theme === 'light' ? LogoDark : LogoLight} alt="kasio logo" />
        <Screen
          value={calculation.number}
          onChange={(e) => handleNumberChange(e.target.value)}
          operation={calculation.operation}
        />
        <Keyboard onChange={handleNumberChange} />
      </div>
    </main>
  )
}
