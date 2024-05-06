import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { processes } from './processes'
import { users } from './users'

export const recommendations = pgTable('recommendations', {
  processId: uuid('process_id').references(() => processes.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
}, t => ({
  pk: primaryKey({ columns: [t.processId, t.userId] }),
}))

export const recommendationRelations = relations(recommendations, ({ one }) => ({
  user: one(users, { fields: [recommendations.userId], references: [users.id] }),
  process: one(processes, { fields: [recommendations.processId], references: [processes.id] }),
}))
