import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { process } from './process'
import { users } from './users'

export const discard = pgTable('discards', {
  id: uuid('id').defaultRandom().primaryKey(),

  candidateId: uuid('candidate_id').references(() => users.id),
  processId: uuid('process_id').references(() => process.id),

  userId: uuid('user_id').references(() => users.id).notNull(),
})

export const discardRelations = relations(discard, ({ one }) => ({
  user: one(users, { fields: [discard.userId], references: [users.id], relationName: 'user_discards' }),
  candidate: one(users, { fields: [discard.candidateId], references: [users.id] }),
  process: one(process, { fields: [discard.processId], references: [process.id] }),
}))
