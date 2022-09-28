import { BiPhotoAlbum } from 'react-icons/bi'
import { MdPhotoAlbum } from 'react-icons/md'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 h-16 z-20 bg-zinc-900'>
      <nav className='container h-full mx-auto flex justify-between items-center'>
        <div className='flex gap-2 justify-center items-center'>
          <MdPhotoAlbum size='1.5rem' />
          <Link href={'/'}>
            <a className='text-xl font-bold'>Social-Album</a>
          </Link>
        </div>

        <div className='flex justify-between items-center'>
          <Link href={'/'}>
            <a className='px-4 py-2'>Home</a>
          </Link>
          <Link href={'/album/create'}>
            <a className='bg-zinc-700 px-4 py-1 flex flex-col justify-center items-center font-bold hover:bg-zinc-800 rounded text-sm'>
              <BiPhotoAlbum size='1.4rem' />
              Make an album
            </a>
          </Link>
        </div>
      </nav>
    </header>
  )
}
