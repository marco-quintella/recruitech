import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { jobTitle } from './job-title'
import { process } from './process'

export const processesToJobTitles = pgTable('processes_to_job_titles', {
  processId: uuid('process_id').references(() => process.id).notNull(),
  jobTitleId: uuid('job_title_id').references(() => jobTitle.id).notNull(),
}, t => ({ pk: primaryKey({ columns: [t.processId, t.jobTitleId] }) }))

export const processesToJobTitlesRelations = relations(processesToJobTitles, ({ one }) => ({
  process: one(process, { fields: [processesToJobTitles.processId], references: [process.id] }),
  jobTitle: one(jobTitle, { fields: [processesToJobTitles.jobTitleId], references: [jobTitle.id] }),
}))
