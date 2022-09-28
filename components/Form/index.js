import { useState } from 'react'
import { useAuth } from 'context/authContext'
import { createAlbum } from 'services/albums'

export const Form = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

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
