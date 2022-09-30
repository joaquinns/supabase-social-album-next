import { useState } from 'react'
import { useAuth } from 'context/authContext'
import { createAlbum } from 'services/albums'
import { Spinner } from 'components/Spinner'
import { useRouter } from 'next/router'
import { IoCreateSharp } from 'react-icons/io5'

export const Form = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
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
    error && console.log(error)
    console.log('creado perro!', albumCreated)
    router.push('/')
  }

  return (
    <form
      className='w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4'
      onSubmit={handleAlbumCreate}
    >
      <input
        name='name'
        type='text'
        placeholder='Name of the album'
        className='p-2 md:p-3 rounded bg-zinc-800'
      />
      <textarea
        name='description'
        className='p-2 md:p-3 rounded bg-zinc-800 resize-none h-32'
        placeholder='Description'
      ></textarea>

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
