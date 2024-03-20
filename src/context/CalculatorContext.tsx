import { PropsWithChildren, createContext, useState } from 'react'

type ClaculatorProviderProps = PropsWithChildren

type Operation = { mainNumber: string; stagedOperation: string[] }

type Operator = '+' | '-' | '*' | '/' | '%' | '='

type TSymbol = '.' | '+/-'

type CalculatorContextProps = {
  operation: Operation
  addValue: (value: string) => void
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

  function addValue(value: string) {
    setOperation((prev) => ({ ...prev, mainNumber: value }))
  }

  function addOperator(operator: Operator) {
    setOperation((prev) => ({
      ...prev,
      stagedOperation: [...prev.stagedOperation, prev.mainNumber, operator],
    }))
  }

  function addSymbol(symbol: TSymbol) {
    if (symbol === '+/-') {
      const minusIndex = operation.mainNumber.indexOf('-')
      if (minusIndex < 0) {
        const newNumber = '-' + operation.mainNumber
        setOperation((prev) => ({ ...prev, mainNumber: newNumber }))
      } else if (minusIndex === 0) {
        const newNumber = operation.mainNumber.slice(1)
        setOperation((prev) => ({ ...prev, mainNumber: newNumber }))
      }
      return
    }

    if (symbol === '.') {
      if (operation.mainNumber.includes(symbol)) return
      const newNumber = operation.mainNumber + '.'
      setOperation((prev) => ({ ...prev, mainNumber: newNumber }))
    }
  }

  function reset() {
    setOperation({
      mainNumber: '0',
      stagedOperation: [],
    })
  }

  return (
    <CalculatorContext.Provider
      value={{ operation, addOperator, addSymbol, addValue, reset }}
    >
      {children}
    </CalculatorContext.Provider>
  )
}
