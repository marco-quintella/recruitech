import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'

export const files = pgTable('files', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: uuid('id').defaultRandom().primaryKey(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url').notNull(),
  userId: uuid('user_id').notNull().references(() => users.id),
})

export const fileRelations = relations(files, ({ one }) => ({
  user: one(users, { fields: [files.userId], references: [users.id], relationName: 'user_files' }),
}))
