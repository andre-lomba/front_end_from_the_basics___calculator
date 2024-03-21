import { PropsWithChildren, createContext, useEffect, useState } from 'react'

type ClaculatorProviderProps = PropsWithChildren

export type TNumber = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

export type Operator = '+' | '-' | '*' | '/' | '%' | '='

export type TSymbol = '.' | '+/-'

type Operation = {
  mainNumber: string
  stagedOperation: string[]
}

type CalculatorContextProps = {
  operation: Operation
  addNumber: (number: TNumber) => void
  addOperator: (operator: Operator) => void
  addSymbol: (symbol: TSymbol) => void
  reset: () => void
}

export const CalculatorContext = createContext({} as CalculatorContextProps)

export default function ClaculatorProvider({
  children,
}: ClaculatorProviderProps) {
  const [operation, setOperation] = useState<Operation>({
    mainNumber: '0',
    stagedOperation: [],
  })
  // after an operation or an addition of an operator, the previous number remains in the main screen, but it is replaceble
  const [isReplaceable, setIsReplaceable] = useState(false)
  // after an equals operation, the result remains in the main screen, but as soon as a value is added, the calculator resets
  const [isResetable, setIsResetable] = useState(false)

  useEffect(() => {
    function handlePressKey(event: KeyboardEvent) {
      const number = operation.mainNumber
      if (event.key === 'Backspace') {
        if (isResetable)
          setOperation((prev) => ({ ...prev, stagedOperation: [] }))
        if (number === '0') return
        if (
          number.length === 1 ||
          (number.length === 2 && number.includes('-'))
        )
          setOperation((prev) => ({ ...prev, mainNumber: '0' }))
        else
          setOperation((prev) => ({
            ...prev,
            mainNumber: prev.mainNumber.slice(0, -1),
          }))
      }
    }

    document.addEventListener('keydown', handlePressKey)

    return () => {
      document.removeEventListener('keydown', handlePressKey)
    }
  }, [operation.mainNumber])

  function addNumber(number: TNumber) {
    if (isResetable) {
      setOperation({ mainNumber: number, stagedOperation: [] })
      setIsResetable(false)
      return
    }

    const mainNumber = isReplaceable
      ? // main number is waiting to be replaced
        number
      : // if there's "." let it be a string, otherwise "5.0" would be converted to "5", making it impossible to write something like "5.01" etc
      operation.mainNumber.includes('.')
      ? operation.mainNumber + number
      : // prevent number from being "05"
        parseFloat(operation.mainNumber + number).toString()

    setOperation((prev) => ({
      ...prev,
      mainNumber,
    }))
    setIsReplaceable(false)
  }

  function addOperator(operator: Operator) {
    if (isResetable) {
      if (operator !== '=') {
        setOperation((prev) => ({
          ...prev,
          stagedOperation: [prev.mainNumber, operator],
        }))
        setIsReplaceable(true)
        setIsResetable(false)
      }
      return
    }

    const staged = operation.stagedOperation.length > 1

    if (staged) {
      equals(operator)
      return
    }

    if (operator === '=') return

    const trimmedNumber = parseFloat(operation.mainNumber).toString()

    setOperation((prev) => ({
      ...prev,
      mainNumber: trimmedNumber,
      stagedOperation: [trimmedNumber, operator],
    }))
    setIsReplaceable(true)
  }

  function addSymbol(symbol: TSymbol) {
    if (symbol === '+/-') {
      const minusIndex = operation.mainNumber.indexOf('-')
      if (
        minusIndex < 0 &&
        operation.mainNumber !== '0' &&
        operation.mainNumber !== '0.'
      ) {
        const newNumber = '-' + operation.mainNumber
        const stagedOperation = isResetable ? [] : operation.stagedOperation
        setOperation({ stagedOperation, mainNumber: newNumber })
        setIsResetable(false)
      } else if (minusIndex === 0) {
        const newNumber = operation.mainNumber.slice(1)
        const stagedOperation = isResetable ? [] : operation.stagedOperation
        setOperation({ stagedOperation, mainNumber: newNumber })
        setIsResetable(false)
      }
      return
    }

    if (symbol === '.') {
      if (isResetable) {
        setOperation({ mainNumber: '0.', stagedOperation: [] })
        setIsResetable(false)
        setIsReplaceable(false)
        return
      }
      if (isReplaceable) {
        setOperation((prev) => ({ ...prev, mainNumber: '0.' }))
        setIsReplaceable(false)
        return
      }

      if (operation.mainNumber.includes(symbol)) return
      const newNumber = operation.mainNumber + '.'
      setOperation((prev) => ({ ...prev, mainNumber: newNumber }))
    }
  }

  function reset() {
    setOperation({ mainNumber: '0', stagedOperation: [] })
  }

  function equals(operator: Operator) {
    const staged = operation.stagedOperation[0]
    const op = operation.stagedOperation[1]
    const number = operation.mainNumber

    if (!!staged && !!op) {
      let result: number

      switch (op) {
        case '+':
          result = parseFloat(staged) + parseFloat(number)
          break
        case '-':
          result = parseFloat(staged) - parseFloat(number)
          break
        case '*':
          result = parseFloat(staged) * parseFloat(number)
          break
        case '%':
          result = parseFloat(staged) % parseFloat(number)
          break
        case '/':
          result = parseFloat(staged) / parseFloat(number)
          break
        default:
          result = 0
          break
      }

      result = parseFloat(result.toFixed(8))

      if (operator === '=') {
        const trimmedNumber = parseFloat(number).toString()
        const fomattedNumber = trimmedNumber.includes('-')
          ? `(${trimmedNumber})`
          : trimmedNumber
        setOperation({
          stagedOperation: [staged, op, fomattedNumber, '='],
          mainNumber: result.toString(),
        })
        setIsResetable(true)
      } else {
        setOperation({
          stagedOperation: [result.toString(), operator],
          mainNumber: result.toString(),
        })
        setIsReplaceable(true)
      }
    }
  }

  return (
    <CalculatorContext.Provider
      value={{ operation, addOperator, addSymbol, addNumber, reset }}
    >
      {children}
    </CalculatorContext.Provider>
  )
}
