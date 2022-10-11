/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Home from 'pages/index'
import Create from 'pages/album/create'
import Explore from 'pages/explore'
import AlbumId from 'pages/album/[id]'

const albumMock = {
  id: 123456,
  cover: 'http://random.xyz',
  name: 'example name ok'
}

describe('Home page', () => {
  it('render correctly', () => {
    render(<Home />)
  })
})

describe('Create page', () => {
  it('render correctly', () => {
    render(<Create />)
  })
})

describe('Explore page', () => {
  it('render correctly', () => {
    render(<Explore />)
  })
})

describe('AlbumId page', () => {
  it('render correctly', () => {
    render(<AlbumId album={albumMock} albumId={albumMock.id} />)
  })
})
