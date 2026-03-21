import { useState } from 'react'
import styles from './app.module.css'

export default function App() {

  const [count, setCount] = useState(0)
  const [name, setName] = useState("unknown")


  return (
    <section className={styles.container}>
      <h1>Hello World</h1>

      <div className="card">
        <button
          onClick={() => setCount((count) => count + 1)}
          aria-label="increment"
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <button
          onClick={() => {
            fetch("/api/")
              .then((res) => res.json() as Promise<{ name: string }>)
              .then((data) => setName(data.name))
          }}
          aria-label="get name"
        >
          Name from API is: {name}
        </button>
        <p>
          Edit <code>worker/index.ts</code> to change the name
        </p>
      </div>
    </section>
  )
}
