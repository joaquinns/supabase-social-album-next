import { Layout } from 'components/Layout'
import { getUserAlbum } from 'services/albums'
import { UploadButton } from 'components/UploadButton'
// import { usePhotos } from 'hooks/usePhotos'
import { ImageGrid } from 'components/ImagesGrid'
import { PhotosProvider } from 'context/photosContext'

export default function AlbumID({ album, albumId }) {
  return (
    <Layout>
      <PhotosProvider albumId={albumId}>
        <div className='flex flex-col md:flex-row justify-center items-center gap-3 mt-4'>
          <UploadButton albumId={album.id} />
        </div>
        <h1 className='text-2xl font-bold'>{album.name}</h1>
        <p className='text-lg mb-4'>{album.description}</p>
        <ImageGrid albumId={albumId} />
      </PhotosProvider>
    </Layout>
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
