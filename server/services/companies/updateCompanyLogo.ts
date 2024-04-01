import { eq } from 'drizzle-orm'

export async function updateCompanyLogo(id: string, url: string) {
  const query = await db.update(companies)
    .set({ logo: url })
    .where(eq(companies.id, id))
    .returning()

  return query?.[0]
}
