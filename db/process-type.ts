import { pgEnum } from 'drizzle-orm/pg-core'

export const processTypeEnum = pgEnum('process_type', [
  'platform',
  'email',
  'link',
])
