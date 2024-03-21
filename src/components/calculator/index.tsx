import { useTheme } from '../../hooks/useTheme'
import LogoLight from '../../assets/images/logo_light.png'
import LogoDark from '../../assets/images/logo_dark.png'
import Screen from './components/Screen'
import './index.css'
import Keyboard from './components/Keyboard'
import ThemeToggler from './components/ThemeToggler'

export default function Calculator() {
  const { theme, className } = useTheme()

  return (
    <main className={className('container')}>
      <div className={className('content')}>
        <img src={theme === 'light' ? LogoDark : LogoLight} alt="logo" />
        <ThemeToggler />
        <Screen />
        <Keyboard />
      </div>
    </main>
  )
}
