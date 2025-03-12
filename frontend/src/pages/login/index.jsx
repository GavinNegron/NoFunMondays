import { getSession } from 'next-auth/react'
import '../../../public/css/register.css'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '@/data/schemas'
import { useState } from 'react'
import { useRouter } from 'next/router'
import LoadingScreen from '@/components/base/loading'
import { signIn } from 'next-auth/react'

const Login = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    setError(null)
  
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })
  
    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }
  
    document.cookie = `excludeViews=true; path=/; max-age=${60 * 60 * 24 * 365 * 10}; Secure; SameSite=Lax`
  
    router.push('/dashboard')
  }
  

  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      <div className="wrapper">
        <h2>Admin Login | NoFunMondays</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your email"
              {...register('email')}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Enter your password"
              {...register('password')}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          {loading && <LoadingScreen />}
          {error && <p className="error">{error}</p>}
          <div className="input-box button">
            <button type="submit" disabled={loading}>Login</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) return { redirect: { destination: '/dashboard', permanent: false } }

  return { props: {} }
}