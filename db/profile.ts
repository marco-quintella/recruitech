import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { user } from './user'
import { profilesToJobTitles } from './profiles-job-titles'
import { profilesToSkills } from './profiles-to-skills'

export const profile = pgTable('profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  presentation: text('presentation'),

  userId: uuid('user_id').references(() => user.id).notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const profileRelations = relations(profile, ({ many, one }) => ({
  user: one(user),
  profilesToJobTitles: many(profilesToJobTitles),
  profilesToSkills: many(profilesToSkills),
}))
