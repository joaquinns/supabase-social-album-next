import { Header } from 'components/Header'
import PropTypes from 'prop-types'

export const Layout = ({ children }) => {
  return (
    <div className='bg-zinc-900 text-white'>
      <Header />
      <main className='container mx-auto min-h-screen pt-16'>{children}</main>
      <footer>soy un footer</footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}
