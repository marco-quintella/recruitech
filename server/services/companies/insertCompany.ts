export async function insertCompany(company: CompanyInsert) {
  const query = await db.insert(companies).values(company).returning()
  return query?.[0]
}
