interface CreateProfileData {
  userId: string
  tags?: string[]
  presentation?: string
}

export async function createProfile({ presentation, tags, userId }: CreateProfileData) {
  let validTags: string[] = []
  if (tags?.length) {
    const tagsPromises = tags.map(tagId => getTagById(tagId))
    const tagsData = await Promise.all(tagsPromises)
    validTags = tagsData.filter(isDefined).map(tag => tag.id)
  }

  return await prisma.profiles.create({
    data: {
      presentation,
      tags: {
        connect: validTags?.map(tagId => ({ id: tagId })),
      },
      userId,
    },
  })
}
