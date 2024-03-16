import { integer, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { profile } from './profile'

export const profileSkill = pgTable('profile_skills', {
  profileId: uuid('profile_id').notNull().references(() => profile.id),
  skillId: uuid('skill_id').notNull().references(() => profile.id),
  time: integer('time').notNull(),
}, t => ({ pk: primaryKey({ columns: [t.profileId, t.skillId] }) }))

export const profileSkillRelations = relations(profileSkill, ({ one }) => ({
  profile: one(profile, { fields: [profileSkill.profileId], references: [profile.id] }),
  skill: one(profile, { fields: [profileSkill.skillId], references: [profile.id] }),
}))
