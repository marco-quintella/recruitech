import { relations } from 'drizzle-orm'
import { index, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'

export const companies = pgTable('companies', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: uuid('id').defaultRandom().primaryKey(),
  logo: text('logo'),
  name: text('name').notNull().unique(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, company => ({
  nameIdx: uniqueIndex().on(company.name),
}))

export const companyRelations = relations(companies, ({ many }) => ({
  processes: many(processes),
  users: many(users),
}))

export type Company = typeof companies.$inferSelect
export type CompanyInsert = typeof companies.$inferInsert
export type CompanyUpdate = Partial<typeof companies.$inferInsert>
