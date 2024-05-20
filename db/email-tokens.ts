import { relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from './users'

export const emailTokens = pgTable('email_tokens', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: uuid('id').defaultRandom().primaryKey(),

  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: uuid('user_id').notNull().references(() => users.id),
})

export const emailTokensRelations = relations(emailTokens, ({ one }) => ({
  user: one(users, { fields: [emailTokens.userId], references: [users.id], relationName: 'user_email_tokens' }),
}))
