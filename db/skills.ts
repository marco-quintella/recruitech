import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const skills = pgTable('skills', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: uuid('id').defaultRandom().primaryKey(),

  name: text('name').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const skillRelations = relations(skills, ({ many }) => ({
  processesToSkills: many(processesToSkills),
  profilesToSkills: many(profilesToSkills),
}))
