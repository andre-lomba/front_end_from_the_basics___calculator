import './Screen.css'
import { useTheme } from '../../../hooks/useTheme'
import { isSymbol } from '../../../utils/functions/symbolsFn'

type ScreenProps = React.InputHTMLAttributes<HTMLInputElement> & {
  operation: string[]
}

export default function Screen({ operation, ...rest }: ScreenProps) {
  const { className } = useTheme()
  return (
    <div className={className('screen')}>
      <span className="operation">
        {operation.map((op, index) => (
          <p
            key={index}
            style={op === '%' ? { fontSize: 13, fontWeight: 600 } : undefined}
            className={className(
              `calculation ${isSymbol(op) ? 'especial' : ''}`,
            )}
          >
            {op}
          </p>
        ))}
      </span>
      <input {...rest} type="text" className={className('input')} />
    </div>
  )
}
