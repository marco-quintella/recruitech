import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { process } from './process'
import { location } from './location'

export const processesToLocations = pgTable('processes_to_locations', {
  processId: uuid('process_id').notNull().references(() => process.id),
  locationId: uuid('location_id').notNull().references(() => location.id),
}, t => ({ pk: primaryKey({ columns: [t.processId, t.locationId] }) }))

export const processesToLocationsRelations = relations(processesToLocations, ({ one }) => ({
  process: one(process, { fields: [processesToLocations.processId], references: [process.id] }),
  location: one(location, { fields: [processesToLocations.locationId], references: [location.id] }),
}))
