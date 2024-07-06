import { eq } from 'drizzle-orm'

export async function getProcessById(processId: string) {
  return await db.query.processes.findFirst({
    where: eq(processes.id, processId),
    with: {
      company: true,
    },
  })
}
