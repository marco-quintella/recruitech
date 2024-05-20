import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const locations = pgTable('locations', {
  city: text('city'),
  country: text('country'),
  createAt: timestamp('created_at').notNull().defaultNow(),
  id: uuid('id').defaultRandom().primaryKey(),

  state: text('state'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const locationRelations = relations(locations, ({ many }) => ({
  processesToLocations: many(processesToLocations),
  users: many(users),
}))
