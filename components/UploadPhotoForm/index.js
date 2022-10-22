import { useState } from 'react'
import Image from 'next/image'
import { uploadPhoto, publishImage } from 'services/albums'
import { usePhotosAlbum } from 'context/photosContext'
import { Spinner } from 'components/Spinner'

export const UploadPhotoForm = ({ albumId, closeForm }) => {
  const { setPhotos, setIsLoading: setIsLoadingPhotos } = usePhotosAlbum()
  const [imageURL, setImageURL] = useState(null)
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const initialValidations = {
    file: null,
    filetype: null,
    fileSize: null
  }
  const [validationsErrors, setValidationsErrors] = useState(initialValidations)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [description, setDescription] = useState('')

  const handleChangePhoto = async (e) => {
    e.preventDefault()
    setValidationsErrors(initialValidations)
    setIsLoading(true)
    const reader = new FileReader()
    // the code below is only with drag events...
    // const file = e.dataTransfer.files[0]
    const imageFile = e.target.files[0]
    if (!imageFile?.type?.startsWith('image')) {
      return setValidationsErrors({
        ...validationsErrors,
        filetype: 'The file is not an image'
      })
    }
    setFile(imageFile)
    reader.addEventListener(
      'load',
      (e) => {
        // convert image file to base64 string
        setImageURL(e.target.result)
      },
      false
    )

    if (imageFile) {
      reader.readAsDataURL(imageFile)
      setIsLoading(false)
    }
    console.log(imageURL)
    if (!imageFile) {
      setIsLoading(false)
    }
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleUploadPhoto = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setUploadLoading(true)
    const [url, uploadPhotoError] = await uploadPhoto({ imageFile: file })
    setImageURL(url)
    if (uploadPhotoError) {
      setIsLoading(false)
      setUploadLoading(false)
      setImageURL(null)
      return setValidationsErrors({ ...validationsErrors, uploadPhotoError })
    }
    const [data, error] = await publishImage({
      photoURL: imageURL,
      photoDescription: e.target.description.value,
      albumId
    })
    if (error) {
      setIsLoading(false)
      setUploadLoading(false)
      setValidationsErrors({ ...validationsErrors, file: 'not file' })
      return console.error(error)
    }
    setIsLoadingPhotos(true)
    setPhotos((prevPhotos) => prevPhotos.concat(data[0]))
    e.target.description.value = ''
    e.target.file = null
    setImageURL(null)
    setIsLoading(false)
    setUploadLoading(false)
    setIsLoadingPhotos(false)
    closeForm(false)
  }

  return (
    <form
      aria-label='uploadForm'
      className='flex flex-col justify-center gap-4 '
      onSubmit={handleUploadPhoto}
    >
      {imageURL && (
        <div className='relative flex justify-center'>
          <Image
            src={imageURL}
            alt='image of the album :D'
            className='relative rounded'
            width={400}
            height={300}
          />
          {uploadLoading && (
            <div className='absolute bg-[#00000090] top-0 right-0 bottom-0 left-0 flex justify-center items-center rounded'>
              <Spinner size={2} />
            </div>
          )}
        </div>
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
          w-full
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

      <div className='flex flex-col items-center justify-center gap-2 w-full'>
        <ul className='text-red-600 text-center font-bold w-full rounded-full p-2 flex flex-col justify-center gap-1'>
          {validationsErrors.file && <li>{validationsErrors.file}</li>}
          {validationsErrors.fileSize && <li>{validationsErrors.fileSize}</li>}
          {validationsErrors.filetype && <li>{validationsErrors.filetype}</li>}
        </ul>
        <div className='flex gap-2'>
          <span
            onClick={() => closeForm(false)}
            className='px-4 py-2 cursor-pointer bg-red-600 rounded-full font-semibold hover:bg-red-800 ease duration-75'
          >
            Cancel
          </span>
          {!isLoading && imageURL && description?.length > 10 ? (
            <button className='px-4 py-2 bg-zinc-700 rounded-full font-bold'>
              upload!
            </button>
          ) : (
            <button
              disabled
              className='px-4 py-2 bg-zinc-700 rounded-full font-bold disabled:opacity-30'
            >
              Upload
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
