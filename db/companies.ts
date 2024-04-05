import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const companies = pgTable('companies', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  logo: text('logo'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const companyRelations = relations(companies, ({ many }) => ({
  users: many(users),
  processes: many(processes),
}))

export type Company = typeof companies.$inferSelect
export type CompanyInsert = typeof companies.$inferInsert
export type CompanyUpdate = Partial<typeof companies.$inferInsert>
