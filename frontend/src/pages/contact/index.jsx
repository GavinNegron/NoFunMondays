import React from 'react' 
import Navbar from '../../components/layout/navbar/'
import Footer from '../../components/layout/footer/'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../validation/schemas'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import '../../../public/css/contact.css'

const Contact = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.user) 
  
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(loginSchema),
    })

      const onSubmit = (data) => {
       
      }

    return (
        <>
            <Head>
                <title>NoFunMondays</title>
                <meta name="description" content="Welcome to the landing page of our blog" />
            </Head>
            <Navbar />
            <main className="main">
                <div className="wrapper">
                    <h2>Contact us</h2>
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
                        placeholder="Enter your message"
                        {...register('password')}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>
                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}
                    <div className="input-box button">
                        <button type="submit" disabled={loading}>Login</button>
                    </div>
                    <div className="text">
                        <h3>Already have an account? <a href="#">Login now</a></h3>
                    </div>
                    </form>
                </div>
            </main>
            <Footer />        
        </>
    )
}

export default Contact;