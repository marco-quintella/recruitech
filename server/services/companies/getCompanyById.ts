import { eq } from 'drizzle-orm'

export async function getCompanyById(id: string) {
  const query = await db.select()
    .from(companies)
    .where(eq(companies.id, id))
    .limit(1)
  return query?.[0]
}
