import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { files } from './files'
import { profiles } from './profiles'

export const filesToProfiles = pgTable('files_to_tags', {
  fileId: uuid('file_id').notNull().references(() => files.id),
  profileId: uuid('profile_id').notNull().references(() => files.id),
}, t => ({ pk: primaryKey({ columns: [t.fileId, t.profileId] }) }))

export const filesToProfilesRelations = relations(filesToProfiles, ({ one }) => ({
  file: one(files, { fields: [filesToProfiles.fileId], references: [files.id] }),
  profile: one(profiles, { fields: [filesToProfiles.profileId], references: [profiles.id] }),
}))
