type OpSymbol = '+' | '−' | '×' | '÷' | '%' | '='

export type FunctionPerLabel = {
  label: OpSymbol
  func: (value1: number, value2: number) => number
}

export const OP: FunctionPerLabel[] = [
  { label: '+', func: (value1, value2) => value1 + value2 },
  { label: '−', func: (value1, value2) => value1 - value2 },
  { label: '×', func: (value1, value2) => value1 * value2 },
  { label: '÷', func: (value1, value2) => value1 / value2 },
  { label: '%', func: (value1, value2) => value1 % value2 },
  { label: '=', func: (value1, value2) => value1 % value2 },
]

export function isSymbol(symbol: string): symbol is OpSymbol {
  if (symbol.length > 1) return false
  return OP.some((s) => s.label === symbol)
}

export function getFunctionPerLabel(symbol: string) {
  if (!isSymbol(symbol)) return
  return OP.find((s) => s.label === symbol)
}

export function removeParentesis(value: string) {
  const valueArray = value.split('')
  const cleanArray = valueArray.filter(
    (letter) => letter != '(' && letter != ')',
  )
  return cleanArray.join('')
}
