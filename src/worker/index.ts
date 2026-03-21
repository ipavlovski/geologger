import { Hono } from "hono"

const app = new Hono<{ Bindings: Env }>()


app.get("/api/", (c) => c.json({ name: "Cloudflare" }))


// Accessing D1 is via the c.env.YOUR_BINDING property
app.get("/query/beverages/:name", async (c) => {
  const customerName = c.req.param("name")
  try {
    let { results } = await c.env.GEO_DB.prepare(
      "SELECT * FROM Customers WHERE CompanyName = ?",
    )
      .bind(customerName)
      .run()
    return c.json(results)
  } catch (e) {
    return c.json({ err: "Failed to query user" }, 500)
  }
})

export default app