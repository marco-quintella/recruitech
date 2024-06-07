import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'
import { locations } from './locations'

export const companies = pgTable('companies', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  hqLocation: uuid('hq_location').references(() => locations.id),
  id: uuid('id').defaultRandom().primaryKey(),
  logo: text('logo'),
  name: text('name').notNull().unique(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, company => ({
  nameIdx: uniqueIndex().on(company.name),
}))

export const companyRelations = relations(companies, ({ many, one }) => ({
  locations: one(locations, { fields: [companies.hqLocation], references: [locations.id] }),
  processes: many(processes),
  users: many(users),
}))

export type Company = typeof companies.$inferSelect
export type CompanyInsert = typeof companies.$inferInsert
export type CompanyUpdate = Partial<typeof companies.$inferInsert>
