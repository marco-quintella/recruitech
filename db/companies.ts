import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const companies = pgTable('companies', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: uuid('id').defaultRandom().primaryKey(),
  logo: text('logo'),

  name: text('name').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const companyRelations = relations(companies, ({ many }) => ({
  processes: many(processes),
  users: many(users),
}))

export type Company = typeof companies.$inferSelect
export type CompanyInsert = typeof companies.$inferInsert
export type CompanyUpdate = Partial<typeof companies.$inferInsert>
