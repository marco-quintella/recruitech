export async function insertProcess(value: ProcessInsert) {
  const query = await db.insert(processes)
    .values(value)
    .returning()
  return query?.[0]
}
