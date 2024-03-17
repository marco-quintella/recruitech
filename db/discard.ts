import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { process } from './process'
import { user } from './user'

export const discard = pgTable('discards', {
  id: uuid('id').defaultRandom().primaryKey(),

  candidateId: uuid('candidate_id').references(() => user.id),
  processId: uuid('process_id').references(() => process.id),

  userId: uuid('user_id').references(() => user.id).notNull(),
})

export const discardRelations = relations(discard, ({ one }) => ({
  user: one(user, { fields: [discard.userId], references: [user.id] }),
  candidate: one(user, { fields: [discard.candidateId], references: [user.id] }),
  process: one(process, { fields: [discard.processId], references: [process.id] }),
}))
