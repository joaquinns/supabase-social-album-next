import { supabase } from 'supabase'
import { nanoid } from 'nanoid'

const storagePrefix = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL

export const createAlbum = async ({ albumName, albumDescription, userId }) => {
  const { data, error } = await supabase.from('albums').insert([
    {
      name: albumName,
      description: albumDescription,
      user_album: userId
    }
  ])

  return [data, error]
}

export const getAlbums = async () => {
  const { data: albums, error } = await supabase.from('albums').select(`*`)
  return [albums, error]
}

export const getPhotosAlbum = async (albumId) => {
  return await supabase
    .from('photo_album')
    .select(`*`)
    .eq('photo_album', `${Number(albumId)}`)
}

export const getUserAlbum = async (albumId) => {
  return await supabase
    .from('albums')
    .select(`*`)
    .eq('id', `${Number(albumId)}`)
}

export const uploadPhoto = async ({ imageFile }) => {
  console.log(
    '🚀 ~ file: index.js ~ line 24 ~ uploadPhoto ~ imageFile',
    imageFile
  )
  const filetype = imageFile?.type
  const filename = nanoid()
  if (!filetype.startsWith('image')) {
    return [null, { error: 'This not an image file' }]
  }
  if (imageFile.syze > 3000000) {
    return [null, { error: 'The file is too big' }]
  }
  const { data, error } = await supabase.storage
    .from('album')
    .upload(`photos/${filename}.jpg`, imageFile)

  console.log(data, 'DAAAAAAAATA OF THE FUNC')

  const imageURL = data?.Key ? `${storagePrefix}${data.Key}` : ''

  return [imageURL, error]
}

export const publishImage = async ({ photoURL, photoDescription, albumId }) => {
  const { data, error } = await supabase.from('photo_album').insert([
    {
      img_url: photoURL,
      photo_album: albumId,
      description: photoDescription
    }
  ])

  return [data, error]
}
