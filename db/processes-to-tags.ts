import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { process } from './process'
import { tag } from './tag'

export const processesToTags = pgTable('processes_to_tags', {
  processId: uuid('process_id').references(() => process.id).notNull(),
  tagId: uuid('tag_id').references(() => tag.id).notNull(),
}, t => ({ pk: primaryKey({ columns: [t.processId, t.tagId] }) }))

export const processesToTagsRelations = relations(processesToTags, ({ one }) => ({
  process: one(process, { fields: [processesToTags.processId], references: [process.id] }),
  tag: one(tag, { fields: [processesToTags.tagId], references: [tag.id] }),
}))
