import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { process } from './process'
import { user } from './user'

export const favorite = pgTable('favorites', {
  processId: uuid('process_id').references(() => process.id).notNull(),
  userId: uuid('user_id').references(() => user.id).notNull(),
}, t => ({ pk: primaryKey({ columns: [t.processId, t.userId] }) }))
