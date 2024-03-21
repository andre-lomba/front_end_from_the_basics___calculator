import './Screen.css'
import { useTheme } from '../../../hooks/useTheme'
import { getOperator, isOperator } from '../../../utils/functions/operatorFn'
import { useCalculator } from '../../../hooks/useCalculator'

export default function Screen() {
  const { operation } = useCalculator()
  const { className } = useTheme()
  return (
    <div className={className('screen')}>
      <span className="operation">
        {operation.stagedOperation.map((op, index) => (
          <p
            key={index}
            style={op === '%' ? { fontSize: 13, fontWeight: 600 } : undefined}
            className={className(
              `number-symbol ${isOperator(op) ? ' especial' : ''}`,
            )}
          >
            {isOperator(op) ? getOperator(op) : op}
          </p>
        ))}
      </span>
      <span className={className('field')}>{operation.mainNumber}</span>
    </div>
  )
}
