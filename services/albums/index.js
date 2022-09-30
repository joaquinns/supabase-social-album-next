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
  const { data, error } = await supabase.from('albums').select(`*`)
  return [data, error]
}

export const updateAlbum = async ({ albumId, photoCoverURL }) => {
  const { data, error } = await supabase
    .from('albums')
    .update({ cover: photoCoverURL })
    .match({ id: Number(albumId) })

  return [data, error]
}

export const deletePhoto = async (photoId) => {
  const { data: searchUrlData, error: searchUrlError } = await supabase
    .from('photo_album')
    .select('*')
    .eq('id', photoId)

  if (searchUrlError) {
    console.log('search error :s')
    return [null, searchUrlError]
  }
  const imgURL = searchUrlData[0].img_url
  const img = imgURL.split('/')[9].split('?')[0]
  console.log(imgURL)
  console.log('🚀 ~ file: index.js ~ line 45 ~ deletePhoto ~ imgURL', img)

  const { data: deleteData, error: deleteError } = await supabase
    .from('photo_album')
    .delete()
    .match({ id: photoId })

  const { data: photoRemoved, error: photoRemovedError } =
    await supabase.storage.from('album').remove([`photos/${img}`])

  console.log(photoRemoved, photoRemovedError)

  const { data, error } = await supabase
    .from('albums')
    .update({ cover: null })
    .match({ cover: imgURL })

  if (error) {
    return [error]
  }
  console.log(data)

  return [deleteData, deleteError]
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
