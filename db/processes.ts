import { relations } from 'drizzle-orm'
import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { companies } from './companies'
import { contractTypeEnum } from './contract-type'
import { discards } from './discards'
import { experienceLevelEnum } from './experience-level'
import { favorites } from './favorites'
import { processTypeEnum } from './process-type'
import { processesToJobTitles } from './processes_to_job_titles'
import { processesToLocations } from './processes_to_locations'
import { processesToTags } from './processes_to_tags'
import { recommendations } from './recommendations'
import { users } from './users'
import { RemoteTypeEnum, remoteTypeEnum } from './remote-type'

export const processes = pgTable('processes', {
  cancelledAt: timestamp('cancelled_at'),

  chosenUserId: uuid('chosen_user_id').references(() => users.id),
  companyId: uuid('company_id').references(() => companies.id).notNull(),

  contractType: contractTypeEnum('contract_type').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  description: text('description').notNull(),
  email: text('email'),

  experienceLevel: experienceLevelEnum('experience_level'),
  finishedAt: timestamp('finished_at'),
  id: uuid('id').defaultRandom().primaryKey(),

  link: text('link'),
  processType: processTypeEnum('process_type').notNull(),

  remote: remoteTypeEnum('remote').default(RemoteTypeEnum.on_site).notNull(),

  salary_0: numeric('salary_0'),
  salary_1: numeric('salary_1'),

  title: text('title').notNull(),

  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: uuid('user_id').references(() => users.id).notNull(),
})

export const processRelations = relations(processes, ({ many, one }) => ({
  company: one(companies, { fields: [processes.companyId], references: [companies.id] }),
  discards: many(discards),
  favorites: many(favorites),
  processesToJobTitles: many(processesToJobTitles),
  processesToLocations: many(processesToLocations),
  processesToTags: many(processesToTags),
  recomendations: many(recommendations),
}))

export type Process = typeof processes.$inferSelect
export type ProcessInsert = typeof processes.$inferInsert
export type ProcessUpdate = Partial<ProcessInsert>
