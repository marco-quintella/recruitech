import { pgEnum } from 'drizzle-orm/pg-core'

export const contractTypeEnum = pgEnum('contract_type', [
  'full_time',
  'part_time',
  'contractor',
  'internship',
])
