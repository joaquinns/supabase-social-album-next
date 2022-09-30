import { Header } from 'components/Header'
import { AiFillGithub } from 'react-icons/ai'
import PropTypes from 'prop-types'

export const Layout = ({ children }) => {
  return (
    <div className='bg-zinc-900 text-white'>
      <Header />
      <main className='container mx-auto px-4 min-h-screen pt-16 pb-4'>
        {children}
      </main>
      <footer
        className='bg-black py-6
      font-bold flex justify-center items-center gap-2
      '
      >
        <a
          href='https://github.com/joaquinns/'
          target='_blank'
          className='flex gap-2 items-center justify-center'
          rel='noreferrer'
        >
          <AiFillGithub size='2rem' />
          <span className='hover:underline'>check the source code</span>
        </a>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}
