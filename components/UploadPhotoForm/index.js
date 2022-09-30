import { useState } from 'react'
import Image from 'next/image'
import { uploadPhoto, publishImage } from 'services/albums'
import { usePhotosAlbum } from 'context/photosContext'

export const UploadPhotoForm = ({ albumId }) => {
  const { setPhotos, setIsLoading: setIsLoadingPhotos } = usePhotosAlbum()
  const [imageURL, setImageURL] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [description, setDescription] = useState('')

  const handleChangePhoto = async (e) => {
    e.preventDefault()
    // the code below is only with drag events...
    // const file = e.dataTransfer.files[0]
    console.log(e.target.files[0])
    const imageFile = e.target.files[0]
    setUploadLoading(true)
    const [url, error] = await uploadPhoto({ imageFile })
    console.log(url, '-----  URL')
    console.log(
      '🚀 ~ file: index.js ~ line 33 ~ handleChangePhoto ~ error',
      error
    )
    setImageURL(url)
    setUploadLoading(false)
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value)
    console.log(description)
  }

  const handleUploadPhoto = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const [data, error] = await publishImage({
      photoURL: imageURL,
      photoDescription: e.target.description.value,
      albumId
    })
    console.log(data, 'NEW PHOTOOO CREATED')
    if (error) {
      setIsLoading(false)
      console.error(error)
    }
    console.log(data[0], 'ANTES DE GUARDAR')
    setIsLoadingPhotos(true)
    setPhotos((prevPhotos) => prevPhotos.concat(data[0]))
    setIsLoading(false)
    setIsLoadingPhotos(false)
    /*     console.log(photos, 'DESPUES DE CREADO') */
    console.log(
      '🚀 ~ file: index.js ~ line 53 ~ handleUploadPhoto ~ data',
      data
    )
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleUploadPhoto}>
      {imageURL && (
        <Image
          src={imageURL}
          alt='image of the album :D'
          className='rounded'
          width={400}
          height={300}
        />
      )}
      {uploadLoading && (
        <div className='w-[400px] h-[300px] bg-zinc-700 animate-pulse rounded'></div>
      )}
      {imageURL && (
        <textarea
          name='description'
          className='p-2 rounded bg-zinc-800 resize-none focus:outline-zinc-700 focus:border-none min-h-[5rem] font-semibold'
          onChange={handleChangeDescription}
          placeholder='Add a description'
        ></textarea>
      )}

      <input
        type='file'
        className='
          p-2 rounded bg-none
          file:mr-5 file:py-2 file:px-6
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-600 file:text-white
          hover:file:cursor-pointer hover:file:bg-blue-800
          hover:file:text-white
        '
        onChange={handleChangePhoto}
      />

      {imageURL && description?.length > 10 ? (
        <button className='px-4 py-2 bg-zinc-700 rounded font-bold'>
          {isLoading ? (
            <div className='border-2 border-gray-500 border-t-teal-500 border-t-4 animate-spin rounded-full h-6 w-6 flex mx-auto justify-center'></div>
          ) : (
            'upload!'
          )}
        </button>
      ) : (
        <button
          disabled
          className='px-4 py-2 bg-zinc-700 rounded-full font-bold disabled:opacity-30'
        >
          Upload
        </button>
      )}
    </form>
  )
}
