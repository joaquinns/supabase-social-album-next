import { Grid } from 'components/Grid'
import { Layout } from 'components/Layout'
import { useAuth } from 'context/authContext'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getAlbums } from 'services/albums'
import { Album } from 'components/Album'

export default function Expore() {
  const [albums, setAlbums] = useState([])
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchAlbums = async () => {
      const [data, error] = await getAlbums()
      setAlbums(data)
      if (error) {
        console.log(error)
      }
    }

    fetchAlbums()
  }, [router, user])

  return (
    <div className='bg-zinc-900 text-white'>
      <Head>
        <title>Social Album | Explore </title>
        <meta name='description' content='explore random albums' />
      </Head>

      <Layout>
        <h1 className='text-2xl lg:text-3xl my-2 py-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-800 to-purple-900'>
          Albums to explore!
        </h1>

        <Grid>
          {albums.map((album) => (
            <Album key={album.id} album={album} />
          ))}
        </Grid>
      </Layout>
    </div>
  )
}
