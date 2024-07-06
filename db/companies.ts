import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'
import { locations } from './locations'
import { companySizeEnum } from './company.size'

export const companies = pgTable('companies', {
  companySize: companySizeEnum('company_size'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  facebook: text('facebook'),
  hqLocation: uuid('hq_location').references(() => locations.id),
  id: uuid('id').defaultRandom().primaryKey(),
  instagram: text('instagram'),
  linkedin: text('linkedin'),
  logo: text('logo'),
  name: text('name').notNull().unique(),
  shortDescription: text('short_description'),
  twitter: text('twitter'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  website: text('website'),
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
