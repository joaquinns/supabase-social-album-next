import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getPhotosAlbum } from 'services/albums'

export const usePhotos = ({ albumId }) => {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getPhotos = () => {
      getPhotosAlbum(albumId).then((photos) => {
        if (photos.error) {
          console.log(photos.error)
        }
        setPhotos(photos.data)
        setIsLoading(false)
      })
    }

    getPhotos()
  }, [albumId])

  return {
    photos,
    setPhotos,
    isLoading
  }
}

usePhotos.propTypes = {
  albumId: PropTypes.number
}
