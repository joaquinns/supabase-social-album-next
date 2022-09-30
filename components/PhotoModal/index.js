import Image from 'next/image'
import { Modal } from 'components/Modal'
import { deletePhoto, updateAlbum } from 'services/albums'
import { useModal } from 'hooks/useModal'
import { useRouter } from 'next/router'
import { usePhotosAlbum } from 'context/photosContext'
import { AiFillDelete } from 'react-icons/ai'
import { BsBookmarkStarFill } from 'react-icons/bs'

export const PhotoModal = ({ photo }) => {
  const { setPhotos } = usePhotosAlbum()
  const { handleCloseModal, handleModal, showModal } = useModal()
  const router = useRouter()

  const handleMakeCover = async (albumId, imgURL) => {
    const [data, error] = await updateAlbum({
      albumId: Number(albumId),
      photoCoverURL: imgURL
    })
    if (error) {
      console.log(error)
    }
    console.log(data)
    return router.push(`/`)
  }

  const handleDeletePhoto = async (photoId, albumId) => {
    console.log(photoId, 'este es el que quieres borrar')
    const [data, error] = await deletePhoto(photoId)
    if (error) {
      return console.log({ error })
    }
    setPhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo.id !== photoId)
    )

    await updateAlbum({ albumId, photoCoverURL: null })
    handleCloseModal()
    return console.log('BORRADO!', data)
  }
  return (
    <div className='relative h-[150px] w-full'>
      <Modal isOpen={showModal} closeModal={handleCloseModal}>
        {console.log(photo.id)}
        <article className='flex flex-1 lg:flex-none items-center h-full flex-col gap-2 lg:flex-row'>
          <div className='relative w-full lg:w-3/4 h-full'>
            <Image
              src={photo.img_url}
              layout='fill'
              className='rounded'
              objectFit='cover'
              alt='photo of the album'
            />
          </div>
          <div className='w-full lg:w-1/3 h-1/3 lg:h-full flex flex-col justify-center lg:justify-start gap-2'>
            <p className='h-full p-2 rounded font-semibold'>
              {photo.description}
            </p>

            <div className='flex gap-1 justify-between items-center'>
              <button
                onClick={() =>
                  handleMakeCover(photo.photo_album, photo.img_url)
                }
                className='py-2 px-3 md:px-4 text-sm md:text-base bg-zinc-900 hover:opacity-60 rounded font-bold flex gap-2 items-center justify-center'
              >
                Cover
                <span>
                  <BsBookmarkStarFill size='1.3rem' />
                </span>
              </button>
              <button
                onClick={() => handleDeletePhoto(photo.id, photo.photo_album)}
                className='py-2 px-3 md:px-4 text-sm md:text-base bg-zinc-700 flex gap-2 items-center justify-center hover:bg-red-600 ease duration-200 rounded font-bold'
              >
                Delete
                <span>
                  <AiFillDelete size='1.3rem' />
                </span>
              </button>
            </div>
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
