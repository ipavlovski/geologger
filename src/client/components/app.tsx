import { useState } from 'react'
import styles from './app.module.css'

type Customer = {
  CustomerId: number
  CompanyName: string
  ContactName: string
}

export default function App() {

  const [count, setCount] = useState(0)
  const [name, setName] = useState("unknown")
  const [rows, setRows] = useState<Customer[]>([])


  return (
    <section className={styles.container}>
      <h1>Hello World</h1>

      <div className={styles.card}>
        <button
          onClick={() => setCount((count) => count + 1)}
          aria-label="increment"
        >
          count is {count}
        </button>
      </div>
      <div className={styles.card}>
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

      </div>
      <div className={styles.card}>
        <button
          onClick={() => {
            fetch("/query/beverages/Bs%20Beverages")
              .then((res) => res.json() as Promise<Customer[]>)
              // .then(res => console.log(res))
              .then((data) => setRows(data))
          }}
          aria-label="get name"
        >
          Date from DB: {rows.map(row => row.ContactName).join('\n')}
        </button>
      </div>
    </section>
  )
}
