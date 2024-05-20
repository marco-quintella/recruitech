import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { locations } from './locations'
import { processes } from './processes'

export const processesToLocations = pgTable('processes_to_locations', {
  locationId: uuid('location_id').notNull().references(() => locations.id),
  processId: uuid('process_id').notNull().references(() => processes.id),
}, t => ({ pk: primaryKey({ columns: [t.processId, t.locationId] }) }))

export const processesToLocationsRelations = relations(processesToLocations, ({ one }) => ({
  location: one(locations, { fields: [processesToLocations.locationId], references: [locations.id] }),
  process: one(processes, { fields: [processesToLocations.processId], references: [processes.id] }),
}))
