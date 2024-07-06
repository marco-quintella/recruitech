import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { processes } from './processes'
import { tags } from './tags'

export const processesToTags = pgTable('processes_to_tags', {
  processId: uuid('process_id').references(() => processes.id).notNull(),
  tagId: uuid('tag_id').references(() => tags.id).notNull(),
}, t => ({ pk: primaryKey({ columns: [t.processId, t.tagId] }) }))

export const processesToTagsRelations = relations(processesToTags, ({ one }) => ({
  process: one(processes, { fields: [processesToTags.processId], references: [processes.id] }),
  tag: one(tags, { fields: [processesToTags.tagId], references: [tags.id] }),
}))
