import { Form } from 'components/Form'
import { Layout } from 'components/Layout'
import { IoIosArrowBack } from 'react-icons/io'
import Link from 'next/link'

export default function Create() {
  return (
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
          <h1 className='text-xl md:text-3xl text-center font-bold my-2 w-full'>
            Create an album
          </h1>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <Form />
        </div>
      </div>
    </Layout>
  )
}
