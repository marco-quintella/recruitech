import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { users } from './users'
import { processes } from './processes'

export const favorites = pgTable('favorites', {
  id: uuid('id').defaultRandom().primaryKey(),

  processId: uuid('process_id').references(() => processes.id),
  candidateId: uuid('candidate_id').references(() => users.id),

  userId: uuid('user_id').references(() => users.id).notNull(),
})

export const favoriteRelations = relations(favorites, ({ one }) => ({
  user: one(users, { fields: [favorites.userId], references: [users.id], relationName: 'user_favorites' }),
  cadidate: one(users, { fields: [favorites.candidateId], references: [users.id] }),
  process: one(processes, { fields: [favorites.processId], references: [processes.id] }),
}))
