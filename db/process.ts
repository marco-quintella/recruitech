import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { company } from './company'
import { user } from './user'
import { processTypeEnum } from './process-type'
import { contractTypeEnum } from './contract-type'
import { processesToLocations } from './processes-to-locations'
import { experienceLevelEnum } from './experience-level'
import { processesToTags } from './processes-to-tags'
import { processesToJobTitles } from './processes_to_job_titles'
import { processesToSkills } from './processes_to_skills'

export const process = pgTable('processes', {
  id: uuid('id').defaultRandom().primaryKey(),

  companyId: uuid('company_id').references(() => company.id).notNull(),
  userId: uuid('user_id').references(() => user.id).notNull(),

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

  chosenUserId: uuid('chosen_user_id').references(() => user.id),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const processRelations = relations(process, ({ many }) => ({
  processesToLocations: many(processesToLocations),
  processesToTags: many(processesToTags),
  processesToJobTitles: many(processesToJobTitles),
  processesToSkills: many(processesToSkills),
}))
