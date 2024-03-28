import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { process } from './process'
import { skill } from './skills'

export const processesToSkills = pgTable('processes_to_skills', {
  processId: uuid('process_id').references(() => process.id).notNull(),
  skillId: uuid('skill_id').references(() => skill.id).notNull(),
}, t => ({ pk: primaryKey({ columns: [t.processId, t.skillId] }) }))

export const processesToSkillsRelations = relations(processesToSkills, ({ one }) => ({
  process: one(process, { fields: [processesToSkills.processId], references: [process.id] }),
  skill: one(skill, { fields: [processesToSkills.skillId], references: [skill.id] }),
}))
