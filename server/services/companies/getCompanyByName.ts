import { eq } from 'drizzle-orm'

export async function getCompanyByName(name: string) {
  const query = await db.select({
    id: companies.id,
  })
    .from(companies)
    .where(eq(companies.name, name))
    .limit(1)
  return query?.[0]
}
