import { getDownloadURL, ref, uploadString } from 'firebase/storage'

export async function uploadImage({
  fileBase64,
  refString,
}: {
  fileBase64: string
  refString: string
}) {
  const fileRef = ref(firebase.storage, refString)
  await uploadString(fileRef, fileBase64, 'base64')
  const url = await getDownloadURL(fileRef)

  if (!url) {
    throw createError({
      message: 'Erro ao fazer upload da imagem',
      status: 500,
    })
  }

  return url
}
