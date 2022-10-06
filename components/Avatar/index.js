import { useAuth } from 'context/authContext'
import Image from 'next/image'

export const Avatar = () => {
  const { isLoading, user } = useAuth()

  if (isLoading) {
    return (
      <div className='w-11 h-11 animate-pulse bg-zinc-700 rounded-full'></div>
    )
  }

  return (
    <Image
      src={user.user_metadata.avatar_url}
      width={36}
      className='rounded-full'
      height={36}
      alt='profile image'
    />
  )
}
