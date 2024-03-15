import './Screen.css'
import { useTheme } from '../../hooks/useTheme'
import { Operations } from '.'

type ScreenProps = React.InputHTMLAttributes<HTMLInputElement> & {
  operation?: Operations
}

export function Screen({ operation, ...rest }: ScreenProps) {
  const { className } = useTheme()
  return (
    <div style={{ position: 'relative' }}>
      <p className={className('operation')}>{operation?.toUpperCase()}</p>
      <input {...rest} type="text" className={className('input')} />
    </div>
  )
}
