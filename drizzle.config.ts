import process from 'node:process'
import type { Config } from 'drizzle-kit'

if (!process.env.DATABASE_URL)
  throw new Error('DATABASE_URL environment variable is required')

export default {
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  driver: 'pg',
  out: './drizzle',
  schema: './db/*',
} satisfies Config
