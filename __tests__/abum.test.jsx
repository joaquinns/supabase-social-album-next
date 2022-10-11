/* eslint-disable no-undef */
const { render, waitFor } = require('@testing-library/react')
const { Album } = require('components/Album')

const albumMock = {
  id: 123456,
  cover: 'http://random.xyz',
  name: 'example name ok'
}

describe('Album', () => {
  it('render correctly', async () => {
    await waitFor(() => {
      render(<Album album={albumMock} />)
    })
  })
})
