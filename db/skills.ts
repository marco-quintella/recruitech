import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { profilesToSkills } from './profiles-to-skills'
import { processesToSkills } from './processes_to_skills'

export const skill = pgTable('skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const skillRelations = relations(skill, ({ many }) => ({
  profilesToSkills: many(profilesToSkills),
  processesToSkills: many(processesToSkills),
}))
