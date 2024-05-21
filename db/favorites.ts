import { relations } from 'drizzle-orm'
import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { processes } from './processes'
import { users } from './users'

export const favorites = pgTable('favorites', {
  candidateId: uuid('candidate_id').references(() => users.id),
  id: uuid('id').defaultRandom().primaryKey(),
  processId: uuid('process_id').references(() => processes.id),
  userId: uuid('user_id').references(() => users.id).notNull(),
})

export const favoriteRelations = relations(favorites, ({ one }) => ({
  cadidate: one(users, { fields: [favorites.candidateId], references: [users.id] }),
  process: one(processes, { fields: [favorites.processId], references: [processes.id] }),
  user: one(users, { fields: [favorites.userId], references: [users.id], relationName: 'user_favorites' }),
}))
