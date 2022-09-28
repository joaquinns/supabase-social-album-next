import { Grid } from 'components/Grid'
import { PhotoModal } from 'components/PhotoModal'
import PropTypes from 'prop-types'

export const ImageGrid = ({ photos, isloading }) => {
  if (isloading) {
    return (
      <Grid>
        {Array(12)
          .fill('filled')
          .map((_e, i) => (
            <div
              key={i}
              className='bg-zinc-700 w-[250px]  lg:w-[200px] h-[200px] animate-pulse rounded'
            ></div>
          ))}
      </Grid>
    )
  }

  return (
    <Grid>
      {photos && photos.length > 0 ? (
        photos.map((photo) => <PhotoModal photo={photo} key={photo.id} />)
      ) : (
        <h1>Theres not images yet</h1>
      )}
    </Grid>
  )
}

ImageGrid.propTypes = {
  photos: PropTypes.array,
  loading: PropTypes.bool
}
