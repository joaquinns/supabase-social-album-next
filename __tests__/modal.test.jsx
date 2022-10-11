/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Modal } from 'components/Modal'

const handleCloseModalMock = jest.fn()

describe('modal component logic', () => {
  beforeEach(() => {
    render(
      <Modal isOpen={true} closeModal={handleCloseModalMock}>
        <h1>Children</h1>
      </Modal>
    )
  })

  it('has a children and close handler', async () => {
    const children = screen.getByText(/Children/i)
    const buttonClose = screen.getByRole('button')

    expect(children).toBeInTheDocument()
    expect(buttonClose).toBeInTheDocument()

    await fireEvent.click(buttonClose)
    expect(handleCloseModalMock.mock.calls).toHaveLength(1)
  })
})
