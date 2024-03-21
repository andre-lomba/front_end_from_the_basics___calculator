import { useTheme } from '../../../hooks/useTheme'
import './ThemeToggler.css'

export default function ThemeToggler() {
  const { className, toggleTheme } = useTheme()
  return (
    <div className="theme-toggler">
      <button className={className('theme-bar')} onClick={toggleTheme}>
        <div className={className('sliding-circle')}></div>
      </button>
    </div>
  )
}
