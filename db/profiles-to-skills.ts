import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { profile } from './profile'
import { skill } from './skills'

export const profilesToSkills = pgTable('profiles_to_skills', {
  profileId: uuid('profile_id').notNull().references(() => profile.id),
  skillId: uuid('skill_id').notNull().references(() => skill.id),
}, t => ({
  pk: primaryKey({ columns: [t.profileId, t.skillId] }),
}))

export const profilesToSkillsRelations = relations(profilesToSkills, ({ one }) => ({
  profile: one(profile, { fields: [profilesToSkills.profileId], references: [profile.id] }),
  skill: one(skill, { fields: [profilesToSkills.skillId], references: [skill.id] }),
}))
