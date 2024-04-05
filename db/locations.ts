import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const locations = pgTable('locations', {
  id: uuid('id').defaultRandom().primaryKey(),
  country: text('country'),
  state: text('state'),
  city: text('city'),

  createAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const locationRelations = relations(locations, ({ many }) => ({
  processesToLocations: many(processesToLocations),
  users: many(users),
}))
