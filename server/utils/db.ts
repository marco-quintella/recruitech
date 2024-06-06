import process from 'node:process'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as companies from '~/db/companies'
import * as processes from '~/db/processes'

if (!process.env.DATABASE_URL)
  throw new Error('DATABASE_URL is not found in env')

const queryClient = postgres(process.env.DATABASE_URL)
export const db = drizzle(queryClient, {
  schema: {
    ...companies,
    ...processes,
  },
})
