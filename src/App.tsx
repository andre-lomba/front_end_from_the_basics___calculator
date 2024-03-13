import Calculator from './components/calculator/Calculator'
import ThemeProvider from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Calculator />
    </ThemeProvider>
  )
}

export default App
