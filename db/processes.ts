import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { processTypeEnum } from './process-type'
import { contractTypeEnum } from './contract-type'
import { experienceLevelEnum } from './experience-level'
import { processesToLocations } from './processes_to_locations'
import { processesToTags } from './processes_to_tags'
import { processesToJobTitles } from './processes_to_job_titles'
import { processesToSkills } from './processes_to_skills'
import { recommendations } from './recommendations'
import { favorites } from './favorites'
import { discards } from './discards'
import { companies } from './companies'
import { users } from './users'

export const processes = pgTable('processes', {
  id: uuid('id').defaultRandom().primaryKey(),

  companyId: uuid('company_id').references(() => companies.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),

  processType: processTypeEnum('process_type').notNull(),

  title: text('title').notNull(),
  description: text('description').notNull(),
  contractType: contractTypeEnum('contract_type').notNull(),

  experienceLevel: experienceLevelEnum('experience_level'),
  salary_0: numeric('salary_0'),
  salary_1: numeric('salary_1'),

  email: text('email'),
  link: text('link'),

  finishedAt: timestamp('finished_at'),
  cancelledAt: timestamp('cancelled_at'),

  chosenUserId: uuid('chosen_user_id').references(() => users.id),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const processRelations = relations(processes, ({ many, one }) => ({
  processesToLocations: many(processesToLocations),
  processesToTags: many(processesToTags),
  processesToJobTitles: many(processesToJobTitles),
  processesToSkills: many(processesToSkills),
  recomendations: many(recommendations),
  favorites: many(favorites),
  discards: many(discards),
  company: one(companies, { fields: [processes.companyId], references: [companies.id] }),
}))

export type Process = typeof processes.$inferSelect
export type ProcessInsert = typeof processes.$inferInsert
export type ProcessUpdate = Partial<ProcessInsert>
