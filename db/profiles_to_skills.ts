import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

import { profiles } from './profiles'
import { skills } from './skills'

export const profilesToSkills = pgTable('profiles_to_skills', {
  profileId: uuid('profile_id').notNull().references(() => profiles.id),
  skillId: uuid('skill_id').notNull().references(() => skills.id),
}, t => ({
  pk: primaryKey({ columns: [t.profileId, t.skillId] }),
}))

export const profilesToSkillsRelations = relations(profilesToSkills, ({ one }) => ({
  profile: one(profiles, { fields: [profilesToSkills.profileId], references: [profiles.id] }),
  skill: one(skills, { fields: [profilesToSkills.skillId], references: [skills.id] }),
}))
