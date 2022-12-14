import { Form } from 'components/Form'
import { Layout } from 'components/Layout'
import { IoIosArrowBack } from 'react-icons/io'
import Head from 'next/head'
import Link from 'next/link'

export default function Create() {
  return (
    <>
      <Head>
        <title>Social Album | Create Album </title>
        <meta name='description' content='create page for new albums' />
      </Head>
      <Layout>
        <div className='h-full w-full'>
          <div className='relative w-full md:w-3/4 lg:w-1/2 flex justify-center items-center mx-auto'>
            <div className='absolute left-0 flex justify-start items-center'>
              <Link href={'/'}>
                <a className=' bg-zinc-700 px-2 py-1 md:px-4 md:py-2 rounded hover:bg-zinc-800 ease duration-200'>
                  <IoIosArrowBack size='1.5rem' />
                </a>
              </Link>
            </div>
            <h1 className='text-xl md:text-3xl py-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-800 to-purple-900'>
              Create an album
            </h1>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <Form />
          </div>
        </div>
      </Layout>
    </>
  )
}
