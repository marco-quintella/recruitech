import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const jobTitles = pgTable('job_titles', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: uuid('id').defaultRandom().primaryKey(),

  name: text('name').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const jobTitleRelations = relations(jobTitles, ({ many }) => ({
  processesToJobTitles: many(processesToJobTitles),
  profilesToJobTitles: many(profilesToJobTitles),
}))
