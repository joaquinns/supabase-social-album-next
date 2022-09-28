import Image from 'next/image'
import { Modal } from 'components/Modal'
import { deletePhoto, updateAlbum } from 'services/albums'
import { useModal } from 'hooks/useModal'

export const PhotoModal = ({ photo }) => {
  const { handleCloseModal, handleModal, showModal } = useModal()

  const handleMakeCover = async (albumId, imgURL) => {
    const [data, error] = await updateAlbum({
      albumId: Number(albumId),
      photoCoverURL: imgURL
    })
    if (error) {
      console.log(error)
    }
    console.log(data)
  }

  const handleDeletePhoto = async (photoId) => {
    console.log(photoId, 'este es el que quieres borrar')
    const [data, error] = await deletePhoto(photoId)
    if (error) {
      return console.log({ error })
    }
    return console.log('BORRADO!', data)
  }
  return (
    <div className='relative h-[150px] w-full'>
      <Modal isOpen={showModal} closeModal={handleCloseModal}>
        {console.log(photo.id)}
        <article className='flex items-center h-full flex-col gap-2 lg:flex-row'>
          <div className='relative w-3/4 h-full'>
            <Image
              src={photo.img_url}
              layout='fill'
              className='rounded'
              objectFit='cover'
              alt='photo of the album'
            />
          </div>
          <div className='w-1/3 h-full flex flex-col justify-start'>
            <p>{photo.description}</p>
            <button
              onClick={() => handleMakeCover(photo.photo_album, photo.img_url)}
              className='py-2 px-4 bg-zinc-700'
            >
              Make it cover
            </button>
            <button
              onClick={() => handleDeletePhoto(photo.id)}
              className='py-2 px-4 bg-zinc-700'
            >
              delete
            </button>
          </div>
        </article>
      </Modal>
      <Image
        onClick={handleModal}
        src={photo.img_url}
        layout='fill'
        className='rounded cursor-pointer'
        objectFit='cover'
        alt='photo of the album'
      />
    </div>
  )
}
