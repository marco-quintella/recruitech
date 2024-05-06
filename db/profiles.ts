import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { locations } from './locations'
import { profilesToJobTitles } from './profiles_to_job_titles'
import { profilesToSkills } from './profiles_to_skills'
import { users } from './users'

export const profiles = pgTable('profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  presentation: text('presentation'),

  userId: uuid('user_id').references(() => users.id).notNull(),
  locationId: uuid('location_id').references(() => locations.id),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const profileRelations = relations(profiles, ({ many, one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
  location: one(locations, { fields: [profiles.locationId], references: [locations.id] }),
  profilesToJobTitles: many(profilesToJobTitles),
  profilesToSkills: many(profilesToSkills),
}))
