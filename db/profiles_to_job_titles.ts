import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { jobTitles } from './job-titles'
import { profiles } from './profiles'

export const profilesToJobTitles = pgTable('profiles_to_job_titles', {
  jobTitleId: uuid('job_title_id').notNull().references(() => jobTitles.id),
  profileId: uuid('profile_id').notNull().references(() => profiles.id),
}, t => ({
  pk: primaryKey({ columns: [t.profileId, t.jobTitleId] }),
}))

export const profilesToJobTitlesRelations = relations(profilesToJobTitles, ({ one }) => ({
  jobTitle: one(jobTitles, { fields: [profilesToJobTitles.jobTitleId], references: [jobTitles.id] }),
  profile: one(profiles, { fields: [profilesToJobTitles.profileId], references: [profiles.id] }),
}))
