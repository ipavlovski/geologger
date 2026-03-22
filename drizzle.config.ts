import { drizzleD1Config } from './src/db/drizzle-d1-util'

// import { defineConfig } from 'drizzle-kit'
// DEFAULT:
// export default defineConfig({
//   schema: './src/db/schema.ts',
//   out: './drizzle/migrations',
//   dialect: 'sqlite',
//   driver: 'd1-http',  
//   dbCredentials: {
//     accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
//     databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
//     token: process.env.CLOUDFLARE_D1_TOKEN!,
//   },
// })

export default drizzleD1Config({
  out: './drizzle/migrations',
  schema: './src/db/schema.ts',
}, {
  accountId: process.env.CLOUDFLARE_D1_ACCOUNT_ID,
  apiToken: process.env.CLOUDFLARE_D1_API_TOKEN,
  binding: process.env.CLOUDFLARE_D1_DATABASE_BINDING,
  remote: process.env.REMOTE === 'true' || process.env.REMOTE === '1',
  environment: process.env.ENV,
})