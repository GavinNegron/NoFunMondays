// REACT
import React from 'react' 
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

// COMPONENTS
import Navbar from '@/components/layout/navbar/'
import Footer from '@/components/layout/footer/'
import UnderConstruction from '@/components/base/construction'

// FORMS
import { yupResolver } from '@hookform/resolvers/yup'
import { contactSchema } from '@/data/schemas'

// STYLESHEETS
import '../../../public/css/contact.css'

const Contact = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.user) 
  
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(contactSchema),
      })

      const onSubmit = (data) => {
       
      }

    return (
        <>
            <Head>
                <title>Contact Us - NoFunMondays</title>
                <meta name="description" content="Need to get in touch? Contact us for any questions, feedback, or assistance." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="robots" content="index, follow"/>
                <link rel="canonical" href="https://nofunmondays.com/contact"/>
                <meta property="og:title" content="Contact Us - NoFunMondays"/>
                <meta property="og:description" content="Need to get in touch? Contact us for any questions, feedback, or assistance."/>
                <meta property="og:url" content="https://nofunmondays.com/contact"/>
            </Head>
            <Navbar />
            <main className="main d-flex justify-content-center align-items-center">
                {/* <div className="wrapper">
                    <h2>Contact Us</h2>
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
                        type="text"
                        placeholder="Enter your message"
                        {...register('message')}
                        />
                        {errors.message && <p className="error">{errors.message.message}</p>}
                    </div>
                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}
                    <div className="input-box button">
                        <button type="submit" disabled={loading}>Submit</button>
                    </div>
                    </form>
                </div> */}
            <UnderConstruction/>
            </main>
            <Footer />        
        </>
    )
}

export default Contact;