import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { locations } from './locations'
import { processes } from './processes'

export const processesToLocations = pgTable('processes_to_locations', {
  processId: uuid('process_id').notNull().references(() => processes.id),
  locationId: uuid('location_id').notNull().references(() => locations.id),
}, t => ({ pk: primaryKey({ columns: [t.processId, t.locationId] }) }))

export const processesToLocationsRelations = relations(processesToLocations, ({ one }) => ({
  process: one(processes, { fields: [processesToLocations.processId], references: [processes.id] }),
  location: one(locations, { fields: [processesToLocations.locationId], references: [locations.id] }),
}))
