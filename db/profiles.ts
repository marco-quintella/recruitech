import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { locations } from './locations'
import { profilesToJobTitles } from './profiles_to_job_titles'
import { profilesToTags } from './profiles_to_tags'
import { users } from './users'

export const profiles = pgTable('profiles', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: uuid('id').defaultRandom().primaryKey(),

  locationId: uuid('location_id').references(() => locations.id),
  presentation: text('presentation'),

  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: uuid('user_id').references(() => users.id).notNull(),
})

export const profileRelations = relations(profiles, ({ many, one }) => ({
  location: one(locations, { fields: [profiles.locationId], references: [locations.id] }),
  profilesToJobTitles: many(profilesToJobTitles),
  profilesToTags: many(profilesToTags),
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
}))
