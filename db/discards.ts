import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { users } from './users'
import { processes } from './processes'

export const discards = pgTable('discards', {
  id: uuid('id').defaultRandom().primaryKey(),

  candidateId: uuid('candidate_id').references(() => users.id),
  processId: uuid('process_id').references(() => processes.id),

  userId: uuid('user_id').references(() => users.id).notNull(),

  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
})

export const discardRelations = relations(discards, ({ one }) => ({
  user: one(users, { fields: [discards.userId], references: [users.id], relationName: 'user_discards' }),
  candidate: one(users, { fields: [discards.candidateId], references: [users.id] }),
  process: one(processes, { fields: [discards.processId], references: [processes.id] }),
}))
