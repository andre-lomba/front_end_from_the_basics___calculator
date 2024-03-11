import { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(1)

  useEffect(() => {
    console.log(count)
  }, [count])

  return <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
}

export default App
