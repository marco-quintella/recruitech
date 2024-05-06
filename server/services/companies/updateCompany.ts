import { eq } from 'drizzle-orm'

export async function updateCompany(id: string, data: CompanyInsert) {
  const query = await db.update(companies)
    .set(data)
    .where(eq(companies.id, id))
    .returning()
  return query?.[0]
}
