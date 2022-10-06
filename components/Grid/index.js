import PropTypes from 'prop-types'

export const Grid = ({ children }) => {
  return (
    <div className='grid grid-cols-auto-grid gap-3 lg:gap-2 justify-center items-center min-h-full'>
      {children}
    </div>
  )
}

Grid.propTypes = {
  children: PropTypes.node
}
