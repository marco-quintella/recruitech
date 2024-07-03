import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'
import { filesToProfiles } from './files_to_profiles'

export const files = pgTable('files', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: uuid('id').defaultRandom().primaryKey(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: uuid('user_id').notNull().references(() => users.id),
})

export const fileRelations = relations(files, ({ many }) => ({
  filesToProfiles: many(filesToProfiles),
}))
