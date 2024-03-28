import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { profile } from './profile'
import { tag } from './tag'

export const profilesToTags = pgTable('profiles_to_tags', {
  profileId: uuid('profile_id').notNull().references(() => profile.id),
  tagId: uuid('tag_id').notNull().references(() => tag.id),
}, t => ({
  pk: primaryKey({ columns: [t.profileId, t.tagId] }),
}))

export const profilesToTagsRelations = relations(profilesToTags, ({ one }) => ({
  profile: one(profile, { fields: [profilesToTags.profileId], references: [profile.id] }),
  tag: one(tag, { fields: [profilesToTags.tagId], references: [tag.id] }),
}))
