import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { process } from './process'
import { users } from './users'

export const favorite = pgTable('favorites', {
  id: uuid('id').defaultRandom().primaryKey(),

  processId: uuid('process_id').references(() => process.id),
  candidateId: uuid('candidate_id').references(() => users.id),

  userId: uuid('user_id').references(() => users.id).notNull(),
})

export const favoriteRelations = relations(favorite, ({ one }) => ({
  user: one(users, { fields: [favorite.userId], references: [users.id], relationName: 'user_favorites' }),
  cadidate: one(users, { fields: [favorite.candidateId], references: [users.id] }),
  process: one(process, { fields: [favorite.processId], references: [process.id] }),
}))
