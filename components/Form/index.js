import { useState } from 'react'
import { useAuth } from 'context/authContext'
import { createAlbum } from 'services/albums'
import { Spinner } from 'components/Spinner'
import { useRouter } from 'next/router'
import { IoCreateSharp } from 'react-icons/io5'

export const Form = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const initialValidations = {
    albumName: null,
    albumDescription: null
  }
  const [validationErrors, setValidationErrors] = useState(initialValidations)
  const router = useRouter()

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
    if (error) return setValidationErrors({ ...validationErrors, error })
    console.log(albumCreated)
    !error && router.push('/')
  }

  return (
    <form
      data-testid='formOnSubmit'
      className='w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4'
      onSubmit={handleAlbumCreate}
    >
      <div className='relative w-full'>
        {validationErrors.error?.albumName && (
          <span className='font-semibold text-red-600 text-center'>
            {validationErrors.error.albumName}
          </span>
        )}
        <input
          aria-label='name'
          name='name'
          type='text'
          placeholder='Name of the album'
          className={`p-2 md:p-3 rounded bg-zinc-800 w-full ${
            validationErrors.error?.albumName &&
            'border border-red-600 text-sm md:text-base'
          }`}
        />
      </div>
      <div className='relative w-full'>
        {validationErrors.error?.albumDescription && (
          <span className='font-semibold text-red-600 text-center text-sm md:text-base'>
            {validationErrors.error.albumDescription}
          </span>
        )}
        <textarea
          aria-label='description'
          name='description'
          className={`p-2 md:p-3 rounded bg-zinc-800 resize-none h-32 w-full ${
            validationErrors.error?.albumDescription && 'border border-red-600'
          }`}
          placeholder='Description'
        ></textarea>
      </div>

      <div className='flex w-full justify-center'>
        <button className='px-4 py-3 md:px-4 md:py-3 bg-zinc-700 font-semibold rounded hover:bg-zinc-800 ease-in-out duration-150'>
          {isLoading ? (
            <Spinner />
          ) : (
            <span className='flex gap-2 items-center justify-center'>
              Create
              <IoCreateSharp size='1.5rem' />
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
