import Calculator from './components/Calculator'
import ThemeProvider from './context/ThemeContext'

import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Calculator />
    </ThemeProvider>
  )
}

export default App
