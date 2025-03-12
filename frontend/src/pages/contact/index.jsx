// REACT
import React from 'react' 
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

// COMPONENTS
import Navbar from '@/components/layout/navbar/'
import Footer from '@/components/layout/footer/'

// FORMS
import { yupResolver } from '@hookform/resolvers/yup'
import { contactSchema } from '@/data/schemas'

// FEATURES
import { contact } from '@/features/public/publicAction'

// STYLESHEETS
import '../../../public/css/contact.css'

const Contact = () => {
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.user) 
  
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(contactSchema),
      })

      const onSubmit = (data) => {
        dispatch(contact(data))
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
                <div className="contact">
                    <div className="contact__header">
                        <span>Contact Us</span>
                    </div>
                    <div className="contact__form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-box">
                            <input
                            type="text"
                            placeholder="Enter your email"
                            {...register('email')}
                            />
                            {errors.email && <p className="contact--error">{errors.email.message}</p>}
                        </div>
                        <div className="input-box">
                            <input
                            type="text"
                            placeholder="Enter your name"
                            {...register('name')}
                            />
                            {errors.message && <p className="contact--error">{errors.message.message}</p>}
                        </div>
                        <div className="input-box">
                            <input
                            type="text"
                            placeholder="Enter your message"
                            {...register('message')}
                            />
                            {errors.message && <p className="contact--error">{errors.message.message}</p>}
                        </div>
                        {loading && <p>Loading...</p>}
                        {error && <p className="contact--error">{error}</p>}
                        <div className="input-box button">
                            <button type="submit" disabled={loading}>Submit</button>
                        </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />        
        </>
    )
}

export default Contact;