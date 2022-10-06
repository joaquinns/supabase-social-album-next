import { Avatar } from 'components/Avatar'
import { useAuth } from 'context/authContext'
import Link from 'next/link'
import { useState } from 'react'
import { BiPhotoAlbum } from 'react-icons/bi'
import { AiOutlineCompass } from 'react-icons/ai'

export const Navbar = () => {
  const [show, setShow] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const { user, handleLogout, handleGoogleLogin } = useAuth()

  return (
    <nav className='border-gray-200 px-2 rounded dark:bg-zinc-800 h-full relative'>
      <div className='container flex justify-between items-center mx-auto h-full'>
        <Link href={'/'}>
          <a className='flex items-center justify-center'>
            <span className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-600 to-purple-600'>
              Album-Media
            </span>
          </a>
        </Link>
        <button
          onClick={() => setShow(!show)}
          className='flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        >
          <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <div
          className={`${
            show
              ? 'absolute top-16 left-0 right-0 z-50 md:flex md:relative md:top-0'
              : 'hidden lg:flex'
          } w-full md:block md:w-auto`}
        >
          <ul className='flex flex-col justify-center items-center md:gap-2 px-4 py-2 bg-zinc-700 border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:dark:bg-zinc-800 dark:border-gray-700 z-40'>
            <li className='w-full text-center'>
              <Link href={'/explore'}>
                <a
                  href='#'
                  className='block py-2 px-4 w-full hover:text-white rounded lg:bg-transparent  md:p-0 dark:text-gray-400 hover:bg-zinc-900 md:hover:bg-transparent'
                >
                  <span className='flex flex-col-reverse justify-center items-center'>
                    Explore
                    <AiOutlineCompass size='1.3rem' />
                  </span>
                </a>
              </Link>
            </li>
            <li className='w-full text-center'>
              <Link href={'/album/create'}>
                <a
                  href='#'
                  className='block py-2 px-4 w-full hover:text-white rounded lg:bg-transparent  md:p-0 dark:text-gray-400 hover:bg-zinc-900 md:hover:bg-transparent'
                >
                  <span className='flex flex-col-reverse justify-center items-center'>
                    Create
                    <BiPhotoAlbum size='1.3rem' />
                  </span>
                </a>
              </Link>
            </li>
            {user ? (
              <li className='relative w-full text-center'>
                <button
                  onClick={handleLogout}
                  className='md:hidden flex gap-2 items-center justify-center mx-auto w-full'
                >
                  <Avatar />
                  <span>Logout</span>
                </button>

                <button
                  onClick={() => setShowLogout(!showLogout)}
                  className='hidden md:flex gap-2 items-center justify-center mx-auto w-full'
                >
                  <Avatar />
                  <span className='md:hidden'>Logout</span>
                </button>

                {showLogout && (
                  <div className='md:absolute top-16 bg-zinc-700 right-4 h-28 w-40 rounded'>
                    <button
                      onClick={handleLogout}
                      className='px-4 py-4 hover:bg-zinc-800 w-full font-semibold rounded'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <li className='relative w-full text-center'>
                <button
                  className='px-6 py-3 bg-zinc-900 rounded'
                  onClick={handleGoogleLogin}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
