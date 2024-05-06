import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

import { profiles } from './profiles'
import { tags } from './tags'

export const profilesToTags = pgTable('profiles_to_tags', {
  profileId: uuid('profile_id').notNull().references(() => profiles.id),
  tagId: uuid('tag_id').notNull().references(() => tags.id),
}, t => ({
  pk: primaryKey({ columns: [t.profileId, t.tagId] }),
}))

export const profilesToTagsRelations = relations(profilesToTags, ({ one }) => ({
  profile: one(profiles, { fields: [profilesToTags.profileId], references: [profiles.id] }),
  tag: one(tags, { fields: [profilesToTags.tagId], references: [tags.id] }),
}))
