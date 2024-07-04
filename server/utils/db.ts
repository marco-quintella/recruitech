import process from 'node:process'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as applications from '~/db/applications'
import * as companies from '~/db/companies'
import * as locations from '~/db/locations'
import * as processes from '~/db/processes'
import * as processesToJobTitles from '~/db/processes_to_job_titles'
import * as processesToLocations from '~/db/processes_to_locations'
import * as processesToTags from '~/db/processes_to_tags'
import * as profiles from '~/db/profiles'
import * as users from '~/db/users'

if (!process.env.DATABASE_URL)
  throw new Error('DATABASE_URL is not found in env')

const queryClient = postgres(process.env.DATABASE_URL)
export const db = drizzle(queryClient, {
  schema: {
    ...applications,
    ...companies,
    ...locations,
    ...processes,
    ...processesToJobTitles,
    ...processesToLocations,
    ...processesToTags,
    ...profiles,
    ...users,
  },
})
