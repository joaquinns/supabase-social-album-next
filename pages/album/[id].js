import { Layout } from 'components/Layout'
import Head from 'next/head'
import { getUserAlbum } from 'services/albums'
import { UploadButton } from 'components/UploadButton'
import { ImageGrid } from 'components/ImagesGrid'
import { PhotosProvider } from 'context/photosContext'

export default function AlbumID({ album, albumId }) {
  return (
    <>
      <Head>
        <title>Social Album | {album.name} </title>
        <meta name='description' content={`${album.name} content`} />
      </Head>
      <Layout>
        <PhotosProvider albumId={albumId}>
          <div className='lg:flex lg:flex-1 lg:gap-8 lg:items-center min-h-screen'>
            <div className='flex flex-col md:flex-row justify-center items-center gap-3 mt-4'>
              <UploadButton albumId={album.id} />
            </div>
            <div className='w-full h-full'>
              <h1 className='text-2xl lg:text-3xl font-bold my-4'>
                {album.name}
              </h1>
              <p className='text-lg mb-4 py-3 font-semibold'>
                {album.description}
              </p>
              <ImageGrid albumId={albumId} userAlbum={album.user_album} />
            </div>
          </div>
        </PhotosProvider>
      </Layout>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const albumId = await Number(ctx.query.id)
  const response = await getUserAlbum(albumId)
  const album = response.data[0]

  return {
    props: {
      album,
      albumId
    }
  }
}
