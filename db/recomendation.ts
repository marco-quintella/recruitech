import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { process } from './process'
import { users } from './users'

export const recommendation = pgTable('recommendations', {
  processId: uuid('process_id').references(() => process.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
}, t => ({
  pk: primaryKey({ columns: [t.processId, t.userId] }),
}))

export const recommendationRelations = relations(recommendation, ({ one }) => ({
  user: one(users, { fields: [recommendation.userId], references: [users.id] }),
  process: one(process, { fields: [recommendation.processId], references: [process.id] }),
}))
