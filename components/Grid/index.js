import PropTypes from 'prop-types'

export const Grid = ({ children }) => {
  return <div className='grid grid-cols-auto-grid gap-4'>{children}</div>
}

Grid.propTypes = {
  children: PropTypes.node
}
