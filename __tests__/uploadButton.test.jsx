/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { UploadButton } from 'components/UploadButton'
import '@testing-library/jest-dom'

const albumIdMock = 123456
// const albumIdMockError = '123456'

describe('Upload button component', () => {
  beforeEach(() => {
    render(<UploadButton albumId={albumIdMock} />)
  })

  it('show form and cancel logic', async () => {
    const showButton = screen.getByRole('button', { name: /showForm/i })
    expect(showButton).toBeInTheDocument()
    await fireEvent.click(showButton)
    const form = screen.getByRole('form', { name: /uploadForm/i })
    await waitFor(() => {
      expect(form).toBeInTheDocument()
    })
    const cancelButton = screen.getByText(/Cancel/i)
    await fireEvent.click(cancelButton)
    await waitFor(() => {
      expect(form).not.toBeInTheDocument()
    })
  })
})
