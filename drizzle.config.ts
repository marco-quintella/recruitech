import process from 'node:process'
import type { Config } from 'drizzle-kit'

if (!process.env.DATABASE_URL)
  throw new Error('DATABASE_URL environment variable is required')

export default {
  schema: './db/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config
