export async function insertUser(user: UserInsert) {
  const query = await db.insert(users).values(user).returning()
  return query?.[0]
}
