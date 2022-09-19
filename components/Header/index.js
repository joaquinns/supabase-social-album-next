import Link from 'next/link'

export const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 h-16 z-20 bg-zinc-900'>
      <nav className='container h-full mx-auto flex justify-between items-center'>
        <h1 className='text-xl'>Social-Album</h1>

        <div className='flex justify-between items-center'>
          <Link href={'/'}>
            <a className='px-4 py-2'>Home</a>
          </Link>
          <Link href={'/album/create'}>
            <a className='px-4 py-2'>Make an album</a>
          </Link>
        </div>
      </nav>
    </header>
  )
}
