import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { profile } from './profile'
import { jobTitle } from './job-title'

export const profilesToJobTitles = pgTable('profiles_to_job_titles', {
  profileId: uuid('profile_id').notNull().references(() => profile.id),
  jobTitleId: uuid('job_title_id').notNull().references(() => jobTitle.id),
}, t => ({
  pk: primaryKey({ columns: [t.profileId, t.jobTitleId] }),
}))

export const profilesToJobTitlesRelations = relations(profilesToJobTitles, ({ one }) => ({
  profile: one(profile, { fields: [profilesToJobTitles.profileId], references: [profile.id] }),
  jobTitle: one(jobTitle, { fields: [profilesToJobTitles.jobTitleId], references: [jobTitle.id] }),
}))
