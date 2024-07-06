import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { jobTitles } from './job-titles'
import { processes } from './processes'

export const processesToJobTitles = pgTable('processes_to_job_titles', {
  jobTitleId: uuid('job_title_id').references(() => jobTitles.id).notNull(),
  processId: uuid('process_id').references(() => processes.id).notNull(),
}, t => ({ pk: primaryKey({ columns: [t.processId, t.jobTitleId] }) }))

export const processesToJobTitlesRelations = relations(processesToJobTitles, ({ one }) => ({
  jobTitle: one(jobTitles, { fields: [processesToJobTitles.jobTitleId], references: [jobTitles.id] }),
  process: one(processes, { fields: [processesToJobTitles.processId], references: [processes.id] }),
}))
