/* eslint-disable no-undef */
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { Form } from 'components/Form'

const formMock = {
  name: 'This is an example name',
  description: 'This is an description example!!!!!!'
}

describe('form', () => {
  afterEach(cleanup)
  afterEach(jest.clearAllMocks)
  beforeEach(() => {
    expect(render(<Form />))
  })

  it('should render inputs and type input', async () => {
    const inputName = screen.getByRole('textbox', { name: /name/i })
    const inputDescription = screen.getByRole('textbox', {
      name: /description/i
    })

    expect(inputName).toBeInTheDocument()
    expect(inputDescription).toBeInTheDocument()

    expect(inputName).toHaveValue('')
    expect(inputDescription).toHaveValue('')

    await fireEvent.change(inputName, { target: { value: formMock.name } })
    await fireEvent.change(inputDescription, {
      target: { value: formMock.description }
    })

    await waitFor(() => {
      expect(inputName).toHaveValue(formMock.name)
      expect(inputDescription).toHaveValue(formMock.description)
    })
  })
})
