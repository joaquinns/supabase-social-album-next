import { useState } from 'react'
import Image from 'next/image'
import { useAuth } from 'context/authContext'
import { createAlbum, publishImage, uploadPhoto } from 'services/albums'
import PropTypes from 'prop-types'

export const Form = ({ uploadImageForm = false, albumId = null }) => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [imageURL, setImageURL] = useState(null)

  const handleAlbumCreate = async (e) => {
    e.preventDefault()
    const albumName = e.target.name.value
    const albumDescription = e.target.description.value
    const userId = user.id

    setIsLoading(true)
    const [albumCreated, error] = await createAlbum({
      albumName,
      albumDescription,
      userId
    })
    setIsLoading(false)
    console.log('creado perro!', albumCreated)
    error && console.log(error)
  }

  const handleChangePhoto = async (e) => {
    e.preventDefault()
    // the code below is only with drag events...
    // const file = e.dataTransfer.files[0]
    console.log(e.target.files[0])
    const imageFile = e.target.files[0]
    const [url, error] = await uploadPhoto({ imageFile })
    console.log(url, '-----  URL')
    console.log(
      '🚀 ~ file: index.js ~ line 33 ~ handleChangePhoto ~ error',
      error
    )
    setImageURL(url)
  }

  const handleUploadPhoto = async (e) => {
    e.preventDefault()
    const [data, error] = await publishImage({
      photoURL: imageURL,
      photoDescription: e.target.description.value,
      albumId
    })
    if (error) {
      console.error(error)
    }
    console.log(
      '🚀 ~ file: index.js ~ line 53 ~ handleUploadPhoto ~ data',
      data
    )
  }

  if (uploadImageForm && albumId) {
    return (
      <form className='flex flex-col gap-4' onSubmit={handleUploadPhoto}>
        <input
          type='file'
          className='p-2 rounded bg-zinc-800'
          onChange={handleChangePhoto}
        />

        {imageURL && (
          <Image
            src={imageURL}
            alt='image of the album :D'
            width={300}
            height={300}
          />
        )}
        <textarea
          name='description'
          className='p-2 rounded bg-zinc-800'
          placeholder='description'
        ></textarea>

        <button className='px-4 py-2 bg-zinc-700'>
          {isLoading ? (
            <div className='border-2 border-gray-500 border-t-teal-500 border-t-4 animate-spin rounded-full h-6 w-6 flex mx-auto justify-center'></div>
          ) : (
            'upload!'
          )}
        </button>
      </form>
    )
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleAlbumCreate}>
      <input
        name='name'
        type='text'
        placeholder='name of the album'
        className='p-2 rounded bg-zinc-800'
      />
      <textarea
        name='description'
        className='p-2 rounded bg-zinc-800'
        placeholder='description'
      ></textarea>

      <button className='px-4 py-2 bg-zinc-700'>
        {isLoading ? (
          <div className='border-2 border-gray-500 border-t-teal-500 border-t-4 animate-spin rounded-full h-6 w-6 flex mx-auto justify-center'></div>
        ) : (
          'Create album :D'
        )}
      </button>
    </form>
  )
}

Form.propTypes = {
  uploadImageForm: PropTypes.bool,
  albumId: PropTypes.number
}
