import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { profilesToJobTitles } from './profiles-job-titles'
import { processesToJobTitles } from './processes_to_job_titles'

export const jobTitle = pgTable('job_titles', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const jobTitleRelations = relations(jobTitle, ({ many }) => ({
  profilesToJobTitles: many(profilesToJobTitles),
  processesToJobTitles: many(processesToJobTitles),
}))
