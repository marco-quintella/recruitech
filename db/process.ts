import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { companies } from './companies'
import { users } from './users'
import { processTypeEnum } from './process-type'
import { contractTypeEnum } from './contract-type'
import { processesToLocations } from './processes-to-locations'
import { experienceLevelEnum } from './experience-level'
import { processesToTags } from './processes-to-tags'
import { processesToJobTitles } from './processes_to_job_titles'
import { processesToSkills } from './processes_to_skills'
import { recommendation } from './recomendation'
import { favorite } from './favorite'
import { discard } from './discard'

export const process = pgTable('processes', {
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

export const processRelations = relations(process, ({ many, one }) => ({
  processesToLocations: many(processesToLocations),
  processesToTags: many(processesToTags),
  processesToJobTitles: many(processesToJobTitles),
  processesToSkills: many(processesToSkills),
  recomendations: many(recommendation),
  favorites: many(favorite),
  discards: many(discard),
  company: one(companies, { fields: [process.companyId], references: [companies.id] }),
}))
