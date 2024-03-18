import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'
import { profilesToJobTitles } from './profiles-job-titles'
import { profilesToSkills } from './profiles-to-skills'

export const profile = pgTable('profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  presentation: text('presentation'),

  userId: uuid('user_id').references(() => users.id).notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const profileRelations = relations(profile, ({ many, one }) => ({
  user: one(users, { fields: [profile.userId], references: [users.id] }),
  profilesToJobTitles: many(profilesToJobTitles),
  profilesToSkills: many(profilesToSkills),
}))
