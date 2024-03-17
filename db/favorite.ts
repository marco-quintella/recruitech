import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { process } from './process'
import { user } from './user'

export const favorite = pgTable('favorites', {
  id: uuid('id').defaultRandom().primaryKey(),

  processId: uuid('process_id').references(() => process.id),
  candidateId: uuid('candidate_id').references(() => user.id),

  userId: uuid('user_id').references(() => user.id).notNull(),
})

export const favoriteRelations = relations(favorite, ({ one }) => ({
  user: one(user, { fields: [favorite.userId], references: [user.id] }),
  cadidate: one(user, { fields: [favorite.candidateId], references: [user.id] }),
  process: one(process, { fields: [favorite.processId], references: [process.id] }),
}))
