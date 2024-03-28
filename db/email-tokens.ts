import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'

export const emailTokens = pgTable('email_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const emailTokensRelations = relations(emailTokens, ({ one }) => ({
  user: one(users, { relationName: 'user_email_tokens', fields: [emailTokens.userId], references: [users.id] }),
}))
