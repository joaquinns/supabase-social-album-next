import { useState } from 'react'
import PropTypes from 'prop-types'
import { UploadPhotoForm } from 'components/UploadPhotoForm'
import { IoAdd } from 'react-icons/io5'

export const UploadButton = ({ albumId }) => {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      {showForm && (
        <UploadPhotoForm albumId={albumId} closeForm={setShowForm} />
      )}
      {!showForm && (
        <button
          className='bg-blue-600 p-3 font-bold text-xl rounded-full hover:bg-blue-800 ease duration-200'
          onClick={() => setShowForm(!showForm)}
        >
          <IoAdd size='2rem' color='white' />
        </button>
      )}
    </>
  )
}

UploadButton.propTypes = {
  albumId: PropTypes.number
}
