import { Form } from 'components/Form'
import { Layout } from 'components/Layout'
import Link from 'next/link'

export default function Create() {
  return (
    <Layout>
      <h1 className='text-2xl'>Create :D</h1>
      <Form />

      <div className='mt-4'>
        <Link href={'/'}>
          <a className='px-4 py-2 bg-zinc-800'>Back :D</a>
        </Link>
      </div>
    </Layout>
  )
}
