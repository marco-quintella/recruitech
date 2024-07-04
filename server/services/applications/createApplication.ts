import { applications } from '~/db/applications'

export async function createApplication({
  processId,
  profileId,
}: {
  processId: string
  profileId: string
}) {
  return (await db.insert(applications).values({
    processId,
    profileId,
  }))?.[0]
}
