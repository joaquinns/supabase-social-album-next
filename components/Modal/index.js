import PropTypes from 'prop-types'
import { IoIosClose } from 'react-icons/io'

export const Modal = ({ children, isOpen, closeModal }) => {
  const classNames = `
  ${isOpen ? 'flex flex-col' : 'hidden'}
  bg-[#00000090] justify-center items-center
  fixed top-0 left-0 h-screen w-full z-40
  `
  const handleModalClick = (e) => e.stopPropagation()

  return (
    <div onClick={closeModal} className={classNames}>
      <div
        onClick={handleModalClick}
        className='bg-zinc-800 container mx-auto p-4 rounded h-[90%] overflow-auto relative'
      >
        <button
          onClick={closeModal}
          className='p-1 text-white font-bold rounded-full absolute top-0 right-0 z-50'
        >
          <IoIosClose size='2rem' />
        </button>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func
}
