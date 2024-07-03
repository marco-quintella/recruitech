import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { companies } from './companies'
import { discards } from './discards'
import { emailTokens } from './email-tokens'
import { favorites } from './favorites'
import { profiles } from './profiles'
import { recommendations } from './recommendations'
import { roleEnum } from './role'
import { files } from './files'

export const users = pgTable('users', {
  // Relations
  companyId: uuid('company_id').references(() => companies.id),
  confirmedEmail: boolean('confirmed_email').notNull().default(false),
  // Metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
  email: text('email').notNull().unique(),
  // Data
  id: uuid('id').defaultRandom().primaryKey(),

  // Flags
  invitePending: boolean('invite_pending').notNull().default(false),
  name: text('name').notNull(),

  password: text('password').notNull(),

  role: roleEnum('role').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const userRelations = relations(users, ({ many, one }) => ({
  company: one(companies, { fields: [users.companyId], references: [companies.id] }),
  discards: many(discards, { relationName: 'user_discards' }),
  emailTokens: many(emailTokens, { relationName: 'user_email_tokens' }),
  favorites: many(favorites, { relationName: 'user_favorites' }),
  profile: one(profiles),
  recomendations: many(recommendations),
}))

export type User = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert
