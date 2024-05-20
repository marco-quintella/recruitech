import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { processes } from './processes'
import { skills } from './skills'

export const processesToSkills = pgTable('processes_to_skills', {
  processId: uuid('process_id').references(() => processes.id).notNull(),
  skillId: uuid('skill_id').references(() => skills.id).notNull(),
}, t => ({ pk: primaryKey({ columns: [t.processId, t.skillId] }) }))

export const processesToSkillsRelations = relations(processesToSkills, ({ one }) => ({
  process: one(processes, { fields: [processesToSkills.processId], references: [processes.id] }),
  skill: one(skills, { fields: [processesToSkills.skillId], references: [skills.id] }),
}))
