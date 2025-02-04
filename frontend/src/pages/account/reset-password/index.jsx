import '../../../../public/css/register.css'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordSchema } from '../../../data/schemas'

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(resetPasswordSchema), 
  });

  const onSubmit = (data) => {
    console.log(data);
    if(errors) console.log(errors)
  }

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <div className="wrapper">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your email"
              {...register('email')}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="input-box button">
            <button type="submit">Reset Password</button>
          </div>
          <div className="text">
            <h3>Not a user? <a href="#">Create an account</a></h3>
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;