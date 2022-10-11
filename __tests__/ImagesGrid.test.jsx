/* eslint-disable no-undef */
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ImageGrid } from 'components/ImagesGrid'

const albumIdMock = 123456

describe('Image grid component', () => {
  it('render', () => {
    render(<ImageGrid albumId={albumIdMock} />)
  })
})
