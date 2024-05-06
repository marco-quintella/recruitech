import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const tags = pgTable('tags', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: uuid('id').defaultRandom().primaryKey(),

  name: text('name').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const tagRelations = relations(tags, ({ many }) => ({
  processesToTags: many(processesToTags),
}))

export type Tag = typeof tags.$inferSelect
export type TagInsert = typeof tags.$inferInsert
export type TagUpdate = Partial<typeof tags.$inferSelect>
