/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Navbar } from 'components/Navbar'

describe('Navbar component', () => {
  beforeEach(() => {
    render(<Navbar />)
  })

  it('show mobile menu', () => {
    const menuButton = screen.getByRole('button', { name: /showButton/i })
    const showDiv = screen.getByRole('list')
    expect(showDiv).toBeInTheDocument()

    fireEvent.click(menuButton)
    expect(showDiv.parentNode).not.toHaveClass('hidden')
  })
})
