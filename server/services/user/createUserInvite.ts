export async function createUserInvite(email: string, role: Role, companyId: string) {
  const query = await db.insert(users).values({
    name: email,
    password: await hash(email + Date.now().toString()),
    email,
    companyId,
    role,
    invitePending: true,
  }).returning()

  return query?.[0]
}
