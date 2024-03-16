import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { processesToTags } from './processes-to-tags'

export const tag = pgTable('tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const tagRelations = relations(tag, ({ many }) => ({
  processesToTags: many(processesToTags),
}))
