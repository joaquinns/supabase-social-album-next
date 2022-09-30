import { Grid } from 'components/Grid'
import { PhotoModal } from 'components/PhotoModal'
import { usePhotosAlbum } from 'context/photosContext'
import PropTypes from 'prop-types'

export const ImageGrid = ({ albumId }) => {
  const { photos, isLoading } = usePhotosAlbum()

  if (isLoading) {
    return (
      <Grid>
        {Array(12)
          .fill('filled')
          .map((_e, i) => (
            <div
              key={i}
              className='bg-zinc-700 w-full h-[150px] animate-pulse rounded'
            ></div>
          ))}
      </Grid>
    )
  }

  return (
    <Grid>
      {photos && photos.length > 0 ? (
        photos.map((photo) => (
          <PhotoModal photo={photo} key={photo.id} albumId={albumId} />
        ))
      ) : (
        <h1>Theres not images yet</h1>
      )}
    </Grid>
  )
}

ImageGrid.propTypes = {
  albumId: PropTypes.number
}
