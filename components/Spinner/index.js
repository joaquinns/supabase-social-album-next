import PropTypes from 'prop-types'

export const Spinner = ({ size = 1.5 }) => {
  return (
    <div
      className={`border-4 border-gray-500 border-t-teal-500 border-t-4 animate-spin rounded-full h-[${size}rem] w-[${size}rem] flex mx-auto justify-center`}
    ></div>
  )
}

Spinner.propTypes = {
  size: PropTypes.number
}
