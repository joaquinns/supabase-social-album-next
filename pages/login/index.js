import Link from 'next/link'
import { useAuth } from 'context/authContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const { user, handleGoogleLogin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    !isLoading && user && router.push('/')
  }, [isLoading, router, user])

  return (
    <>
      <main className='bg-zinc-900 text-white grid place-content-center min-h-screen gap-4'>
        <h1 className='text-4xl'>Login :D</h1>
        <button
          onClick={handleGoogleLogin}
          className='px-6 py-4 bg-zinc-800 rounded'
        >
          Login with google :D
        </button>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </main>
    </>
  )
}
