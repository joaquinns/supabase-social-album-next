import { useState } from 'react'
import Image from 'next/image'
import { Layout } from 'components/Layout'
import { getPhotosAlbum, getUserAlbum } from 'services/albums'
import { Form } from 'components/Form'

export default function AlbumID({ album, photos }) {
  const [showForm, setShowForm] = useState(false)

  return (
    <Layout>
      <div className='flex 1 1 gap-4'>
        {showForm && <Form uploadImageForm albumId={album.id} />}
        <button
          className='bg-zinc-700 p-4 font-bold text-xl rounded'
          onClick={() => setShowForm(!showForm)}
        >
          Add photo
        </button>
      </div>
      <h1>Este es el id del album: {album.id}</h1>
      <h1>title: {album.name}</h1>
      <p>{album.description}</p>
      <div className='grid grid-cols-auto-grid gap-4'>
        {photos
          ? photos.map((photo) => (
              <Image
                key={photo.id}
                src={photo.img_url}
                width={150}
                height={200}
                className='rounded'
                objectFit='cover'
                alt='photo of the album'
              />
            ))
          : 'Theres not images yet'}
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const albumId = await ctx.query.id
  const response = await getUserAlbum(albumId)
  const photosResponse = await getPhotosAlbum(albumId)
  const photos = photosResponse.data
  const album = response.data[0]

  return {
    props: {
      album,
      photos
    }
  }
}
