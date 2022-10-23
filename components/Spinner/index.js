import PropTypes from 'prop-types'

export const Spinner = () => {
  return (
    <div
      className={`border-4 border-gray-500 border-t-teal-500 border-t-4 animate-spin rounded-full h-8 w-8 flex mx-auto justify-center`}
    ></div>
  )
}

Spinner.propTypes = {
  size: PropTypes.number
}
