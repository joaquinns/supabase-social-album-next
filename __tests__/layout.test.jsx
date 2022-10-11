/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Layout } from 'components/Layout'

describe('layout component', () => {
  it('render and get the children component', () => {
    render(
      <Layout>
        <h1>Children component</h1>
      </Layout>
    )
    const children = screen.getByText(/Children component/i)
    expect(children).toBeInTheDocument()
  })
})
