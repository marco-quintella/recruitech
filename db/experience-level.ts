import { pgEnum } from 'drizzle-orm/pg-core'

export const experienceLevelEnum = pgEnum('experience_level', [
  'entry',
  'intermediate',
  'senior',
])
