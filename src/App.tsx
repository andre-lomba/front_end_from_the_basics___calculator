import Calculator from './components/Calculator'
import ThemeProvider from './context/ThemeContext'

import './App.css'
import ClaculatorProvider from './context/CalculatorContext'

function App() {
  return (
    <ThemeProvider>
      <ClaculatorProvider>
        <Calculator />
      </ClaculatorProvider>
    </ThemeProvider>
  )
}

export default App
