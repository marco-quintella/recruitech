import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { company } from './company'
import { roleEnum } from './role'
import { profile } from './profile'
import { recommendation } from './recomendation'
import { favorite } from './favorite'
import { discard } from './discard'

export const user = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: roleEnum('role').notNull(),

  companyId: uuid('company_id').references(() => company.id),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const userRelations = relations(user, ({ one, many }) => ({
  company: one(company, { fields: [user.companyId], references: [company.id] }),
  profile: one(profile),
  recomendations: many(recommendation),
  favorites: many(favorite),
  discards: many(discard),
}))
