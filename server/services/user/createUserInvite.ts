export async function createUserInvite(email: string, role: Role, companyId: string) {
  const query = await db.insert(users).values({
    companyId,
    email,
    invitePending: true,
    name: email,
    password: await hash(email + Date.now().toString()),
    role,
  }).returning()

  return query?.[0]
}
