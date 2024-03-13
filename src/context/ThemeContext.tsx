import { PropsWithChildren, createContext, useEffect, useState } from 'react'

type ThemeProviderProps = PropsWithChildren

type ThemeContextProps = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext({} as ThemeContextProps)

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const localTheme = localStorage.getItem('theme')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (localTheme === 'light' || localTheme === 'dark') return localTheme
    return 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
