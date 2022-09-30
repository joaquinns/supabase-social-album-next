import { usePhotos } from 'hooks/usePhotos'
import PropTypes from 'prop-types'
import { createContext, useContext } from 'react'

const PhotosContext = createContext({
  photos: [],
  setPhotos: () => {},
  isLoading: true,
  setIsLoading: () => {}
})

export function PhotosProvider({ children, albumId }) {
  const { isLoading, setIsLoading, photos, setPhotos } = usePhotos({ albumId })

  const value = {
    photos,
    setPhotos,
    isLoading,
    setIsLoading
  }

  return (
    <PhotosContext.Provider value={value}>{children}</PhotosContext.Provider>
  )
}

export const usePhotosAlbum = () => {
  return useContext(PhotosContext)
}

PhotosProvider.propTypes = {
  children: PropTypes.node,
  albumId: PropTypes.number
}
