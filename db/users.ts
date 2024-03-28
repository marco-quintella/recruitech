import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { companies } from './companies'
import { roleEnum } from './role'
import { profile } from './profile'
import { recommendation } from './recomendation'
import { favorite } from './favorite'
import { discard } from './discard'
import { emailTokens } from './email-tokens'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: roleEnum('role').notNull(),

  confirmedEmail: boolean('confirmed_email').notNull().default(false),

  companyId: uuid('company_id').references(() => companies.id),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const userRelations = relations(users, ({ one, many }) => ({
  company: one(companies, { fields: [users.companyId], references: [companies.id] }),
  profile: one(profile),
  recomendations: many(recommendation),
  favorites: many(favorite, { relationName: 'user_favorites' }),
  discards: many(discard, { relationName: 'user_discards' }),
  emailTokens: many(emailTokens, { relationName: 'user_email_tokens' }),
}))

export type User = typeof users.$inferSelect
