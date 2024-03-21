import { Operator } from '../../context/CalculatorContext'

export function isOperator(symbol: string) {
  return !!getOperator(symbol)
}

export function getOperator(operator: Operator | '×' | '−' | '÷' | string) {
  switch (operator) {
    case '%':
      return '%'
    case '*':
      return '×'
    case '×':
      return '*'
    case '/':
      return '÷'
    case '÷':
      return '/'
    case '+':
      return '+'
    case '-':
      return '−'
    case '−':
      return '-'
    case '=':
      return '='
    default:
      return undefined
  }
}
