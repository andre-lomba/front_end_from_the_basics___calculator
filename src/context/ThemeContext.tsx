import { PropsWithChildren, createContext, useEffect, useState } from 'react'

type ThemeProviderProps = PropsWithChildren

type ThemeContextProps = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  className: (name: string) => string
}

export const ThemeContext = createContext({} as ThemeContextProps)

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

  const className = (name: string) =>
    name + (theme === 'dark' ? ' ' + name + '-dark' : '')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, className }}>
      {children}
    </ThemeContext.Provider>
  )
}
