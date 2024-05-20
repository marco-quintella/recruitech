import { eq } from 'drizzle-orm'

export async function updateUser(id: string, data: Partial<UserInsert>) {
  const query = await db.update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning({
      email: users.email,
      id: users.id,
      name: users.name,
      role: users.role,
    })
  return query?.[0]
}
