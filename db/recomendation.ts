import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { process } from './process'
import { user } from './user'

export const recommendation = pgTable('recommendations', {
  processId: uuid('process_id').references(() => process.id).notNull(),
  userId: uuid('user_id').references(() => user.id).notNull(),
}, t => ({
  pk: primaryKey({ columns: [t.processId, t.userId] }),
}))

export const recommendationRelations = relations(recommendation, ({ one }) => ({
  user: one(user, { fields: [recommendation.userId], references: [user.id] }),
  process: one(process, { fields: [recommendation.processId], references: [process.id] }),
}))
