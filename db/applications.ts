import { relations } from 'drizzle-orm'
import { index, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { processes } from './processes'
import { profiles } from './profiles'

export const applications = pgTable('applications', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: uuid('id').defaultRandom().primaryKey(),
  processId: uuid('process_id').notNull().references(() => processes.id),
  profileId: uuid('profile_id').notNull().references(() => profiles.id),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, application => ({
  processIdx: index().on(application.processId),
  profileIdx: index().on(application.profileId),
}))

export const applicationRelations = relations(applications, ({ one }) => ({
  process: one(processes, { fields: [applications.processId], references: [processes.id] }),
  profile: one(profiles, { fields: [applications.profileId], references: [profiles.id] }),
}))

export type Application = typeof applications.$inferSelect
export type ApplicationInsert = typeof applications.$inferInsert
export type ApplicationUpdate = Partial<ApplicationInsert>
