import { supabase } from 'supabase'
import { v4 as uuidv4 } from 'uuid'

const storagePrefix = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL

export const createAlbum = async ({ albumName, albumDescription, userId }) => {
  const validations = {
    albumName: null,
    albumDescription: null
  }

  if (albumName.length < 9) {
    validations.albumName = 'The name must be at least 9 characters'
  }

  if (albumDescription.length < 9) {
    validations.albumDescription =
      'The description must be at least 15 characters'
  }

  if (
    (albumName.length < 9 && albumDescription.length < 9) ||
    albumName.length < 9 ||
    albumDescription.length < 9
  ) {
    return [null, validations]
  }

  const { data, error } = await supabase.from('albums').insert([
    {
      name: albumName,
      description: albumDescription,
      user_album: userId
    }
  ])

  return [data, error]
}

export const updateAlbum = async ({ albumId, photoCoverURL }) => {
  const { data, error } = await supabase
    .from('albums')
    .update({ cover: photoCoverURL })
    .match({ id: Number(albumId) })

  return [data, error]
}

export const deleteAlbum = async (albumId) => {
  const { data, error } = await supabase
    .from('albums')
    .select('*')
    .eq('id', albumId)

  if (error) {
    return [null, error]
  }

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

export const getAlbums = async () => {
  const { data, error } = await supabase.from('albums').select(`*`)
  const dataRandomSorted = data.sort(() => Math.random() - 0.5)
  return [dataRandomSorted, error]
}

export const getAllUserAlbums = async (userId) => {
  return await supabase.from('albums').select(`*`).eq('user_album', `${userId}`)
}

export const getUserAlbum = async (albumId) => {
  return await supabase
    .from('albums')
    .select(`*`)
    .eq('id', `${Number(albumId)}`)
}

export const getLike = async ({ userId, albumId }) => {
  const {
    data: allLikesDAta,
    error: allDataError,
    count
  } = await supabase
    .from('album_likes')
    .select('*', { count: 'exact' })
    .eq('album_id', albumId)

  if (!userId) {
    return [allLikesDAta, allDataError, count]
  }

  const { data, error } = await supabase
    .from('album_likes')
    .select('*')
    .eq('user_id', userId)
    .eq('album_id', albumId)

  return [data, error, count]
}

export const likeAlbum = async ({ userId, albumId }) => {
  const { data, error } = await supabase.from('album_likes').insert({
    user_id: userId,
    album_id: albumId
  })

  const { count } = await supabase
    .from('album_likes')
    .select('*', { count: 'exact' })
    .eq('album_id', albumId)

  return [data, error, count]
}

export const dislikeAlbum = async ({ userId, albumId }) => {
  const { data, error } = await supabase
    .from('album_likes')
    .delete()
    .eq('user_id', userId)
    .eq('album_id', albumId)

  const { count } = await supabase
    .from('album_likes')
    .select('*', { count: 'exact' })
    .eq('album_id', albumId)

  return [data, error, count]
}

export const uploadPhoto = async ({ imageFile }) => {
  console.log(
    '🚀 ~ file: index.js ~ line 24 ~ uploadPhoto ~ imageFile',
    imageFile
  )
  const file = imageFile
  const filetype = imageFile?.type
  const filename = uuidv4()

  const validations = {
    file: null,
    filetype: null,
    fileSize: null
  }

  if (!file) {
    validations.file = 'Not files loaded'
  }

  if (file && !filetype.startsWith('image')) {
    validations.filetype = 'The file is not an image'
  }
  if (file && imageFile.size > 3000000) {
    validations.fileSize = 'Max file image is 3mb'
  }

  if (!file || !filetype.startsWith('image') || imageFile.size > 3000000) {
    console.log(validations)
    return [null, validations]
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
