import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { jobTitles } from './job-titles'
import { profiles } from './profiles'

export const profilesToJobTitles = pgTable('profiles_to_job_titles', {
  profileId: uuid('profile_id').notNull().references(() => profiles.id),
  jobTitleId: uuid('job_title_id').notNull().references(() => jobTitles.id),
}, t => ({
  pk: primaryKey({ columns: [t.profileId, t.jobTitleId] }),
}))

export const profilesToJobTitlesRelations = relations(profilesToJobTitles, ({ one }) => ({
  profile: one(profiles, { fields: [profilesToJobTitles.profileId], references: [profiles.id] }),
  jobTitle: one(jobTitles, { fields: [profilesToJobTitles.jobTitleId], references: [jobTitles.id] }),
}))
