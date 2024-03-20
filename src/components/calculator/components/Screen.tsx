import './Screen.css'
import { useTheme } from '../../../hooks/useTheme'
import { isSymbol } from '../../../utils/functions/symbolsFn'

export default function Screen() {
  const { className } = useTheme()
  return (
    <div className={className('screen')}>
      <span className="operation">
        {[].map((op, index) => (
          <p
            key={index}
            style={op === '%' ? { fontSize: 13, fontWeight: 600 } : undefined}
            className={className(
              `number-symbol ${isSymbol(op) ? ' especial' : ''}`,
            )}
          >
            {op}
          </p>
        ))}
      </span>
      <span className={className('field')}>testa</span>
    </div>
  )
}
