import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const jobTitles = pgTable('job_titles', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const jobTitleRelations = relations(jobTitles, ({ many }) => ({
  profilesToJobTitles: many(profilesToJobTitles),
  processesToJobTitles: many(processesToJobTitles),
}))
