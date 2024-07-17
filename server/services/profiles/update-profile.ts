interface UpdateProfileData {
  presentation?: string
  userId: string
  tags?: string[]
  cv?: string
}

export async function updateProfile({
  cv,
  presentation,
  tags,
  userId,
}: UpdateProfileData) {
  let validTags: string[] = []
  if (tags?.length) {
    const tagsPromises = tags.map(tagId => getTagById(tagId))
    const tagsData = await Promise.all(tagsPromises)
    validTags = tagsData.filter(isDefined).map(tag => tag.id)
  }

  return await prisma.profiles.update({
    data: {
      cv,
      presentation,
      tags: {
        set: validTags?.map(tagId => ({ id: tagId })),
      },
    },
    include: {
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      userId,
    },
  })
}
