import '../../../public/css/register.css'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '@/data/schemas'

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema), 
  });

  const onSubmit = () => {
    console.log(errors)
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="wrapper">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your name"
              {...register('name')}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
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
              placeholder="Create password"
              {...register('password')}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm password"
              {...register('password_confirmation')}
            />
            {errors.password_confirmation && <p className="error">{errors.password_confirmation.message}</p>}
          </div>
          <div className="policy">
            <input type="checkbox" required />
            <h3>I accept all terms & conditions</h3>
          </div>
          <div className="input-box button">
            <button type="submit">Register</button>
          </div>
          <div className="text">
            <h3>Already have an account? <a href="#">Login now</a></h3>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;