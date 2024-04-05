import { integer, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { profiles } from './profiles'

export const profileSkills = pgTable('profile_skills', {
  profileId: uuid('profile_id').notNull().references(() => profiles.id),
  skillId: uuid('skill_id').notNull().references(() => profiles.id),
  time: integer('time').notNull(),
}, t => ({ pk: primaryKey({ columns: [t.profileId, t.skillId] }) }))

export const profileSkillRelations = relations(profileSkills, ({ one }) => ({
  profile: one(profiles, { fields: [profileSkills.profileId], references: [profiles.id] }),
  skill: one(profiles, { fields: [profileSkills.skillId], references: [profiles.id] }),
}))
