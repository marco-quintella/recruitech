import { relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { processes } from './processes'
import { users } from './users'

export const discards = pgTable('discards', {
  candidateId: uuid('candidate_id').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: uuid('id').defaultRandom().primaryKey(),
  processId: uuid('process_id').references(() => processes.id),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: uuid('user_id').references(() => users.id).notNull(),
})

export const discardRelations = relations(discards, ({ one }) => ({
  candidate: one(users, { fields: [discards.candidateId], references: [users.id] }),
  process: one(processes, { fields: [discards.processId], references: [processes.id] }),
  user: one(users, { fields: [discards.userId], references: [users.id], relationName: 'user_discards' }),
}))
