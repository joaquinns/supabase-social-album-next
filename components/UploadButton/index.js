import { useState } from 'react'
import PropTypes from 'prop-types'
import { UploadPhotoForm } from 'components/UploadPhotoForm'

export const UploadButton = ({ albumId }) => {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      {showForm && <UploadPhotoForm albumId={albumId} />}
      <button
        className='bg-zinc-700 p-4 font-bold text-xl rounded'
        onClick={() => setShowForm(!showForm)}
      >
        Add photo
      </button>
    </>
  )
}

UploadButton.propTypes = {
  albumId: PropTypes.number
}
