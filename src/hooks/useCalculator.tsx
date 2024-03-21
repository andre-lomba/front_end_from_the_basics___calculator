import { useContext } from 'react'
import { CalculatorContext } from '../context/CalculatorContext'

export function useCalculator() {
  return useContext(CalculatorContext)
}
