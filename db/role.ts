import { pgEnum } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', [
  'system',
  'company_admin',
  'recruiter',
  'candidate',
])
