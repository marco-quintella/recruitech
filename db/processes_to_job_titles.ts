import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { jobTitles } from './job-titles'
import { processes } from './processes'

export const processesToJobTitles = pgTable('processes_to_job_titles', {
  processId: uuid('process_id').references(() => processes.id).notNull(),
  jobTitleId: uuid('job_title_id').references(() => jobTitles.id).notNull(),
}, t => ({ pk: primaryKey({ columns: [t.processId, t.jobTitleId] }) }))

export const processesToJobTitlesRelations = relations(processesToJobTitles, ({ one }) => ({
  process: one(processes, { fields: [processesToJobTitles.processId], references: [processes.id] }),
  jobTitle: one(jobTitles, { fields: [processesToJobTitles.jobTitleId], references: [jobTitles.id] }),
}))
