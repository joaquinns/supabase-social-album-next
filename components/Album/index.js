import Link from 'next/link'
import Image from 'next/image'
import { BiPhotoAlbum } from 'react-icons/bi'
import { FcLike } from 'react-icons/fc'
import { dislikeAlbum, getLike, likeAlbum } from 'services/albums'
import { useAuth } from 'context/authContext'
import { useEffect, useState } from 'react'

export const Album = ({ album }) => {
  const { user } = useAuth()
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [isLoading, setIsloading] = useState(true)

  const handleLike = async (userId, albumId, evt) => {
    evt.preventDefault()
    console.log(evt)
    const [data, error, count] = await likeAlbum({ userId, albumId })
    setLiked(true)
    setLikesCount(count)
    console.log(error)
    console.log('YOU LIKE THE POST', data)
  }

  const handleDisLike = async (userId, albumId, evt) => {
    evt.preventDefault()
    console.log(evt)
    const [data, error, count] = await dislikeAlbum({ userId, albumId })
    setLiked(false)
    setLikesCount(count)
    console.log(error)
    console.log('YOU DISLIKE THE POST', data)
  }

  useEffect(() => {
    const checkLike = async () => {
      const [data, error, count] = await getLike({
        userId: user?.id,
        albumId: album.id
      })
      error && console.log(error)
      user && (data.length > 0 ? setLiked(true) : setLiked(false))
      console.log(count, 'count')
      count && setLikesCount(count)
      setIsloading(false)
    }

    checkLike()
  }, [album.id, likesCount, user, user?.id])

  return (
    <Link href={`/album/${album.id}`}>
      <a className='py-2 px-4 flex justify-center items-center bg-zinc-700 shadow-md shadow-zinc-700/50 rounded relative hover:bg-zinc-800 hover:shadow-zinc-700/90 hover:shadow-xl ease-in-out duration-150 min-h-[150px] w-full z-10'>
        {album.cover ? (
          <Image
            src={album.cover}
            layout='fill'
            alt='image'
            className='relative rounded'
          />
        ) : (
          <BiPhotoAlbum size='2.5rem' />
        )}
        <div className='bg-[#00000070] absolute top-0 bottom-0 left-0 right-0 z-20 rounded'></div>
        {!isLoading && liked ? (
          <button
            className='absolute font-semibold top-2 right-2 z-40 p-2 rounded-full hover:grayscale ease duration-75'
            onClick={(evt) => user && handleDisLike(user.id, album.id, evt)}
          >
            <FcLike size='1.2rem' />
            {!isLoading && likesCount}
          </button>
        ) : (
          <button
            onClick={(evt) => user && handleLike(user.id, album.id, evt)}
            className='absolute font-semibold top-2 right-2 z-40 p-2 grayscale rounded-full hover:text-red-700 hover:grayscale-0 ease duration-75'
          >
            <FcLike size='1.2rem' />
            {!isLoading && likesCount}
          </button>
        )}
        <h2 className='text-left left-1 z-40 font-bold absolute bottom-2 overflow-hidden text-ellipsis w-full px-1'>
          {album.name}
        </h2>
      </a>
    </Link>
  )
}
