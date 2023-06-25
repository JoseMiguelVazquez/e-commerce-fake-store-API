import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSearchContext } from '@/context/SearchContext'
import swal from 'sweetalert'
import useForm from '@/hooks/useForm'
import { registerUserService } from '@/services/userService'
import './signup.css'

const Signup = () => {
  const { setSearchTerm } = useSearchContext()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setSearchTerm('')
  }, [])

  const sendData = async (data) => {
    try {
      const response = await registerUserService(data)
      if (response.status === 200) {
        console.log('Account Created: ', response.data)
        swal('Your Account Has Been Successfully Created')
        navigate('/login')
      }
    } catch (error) {
      swal('An Error Occurred, Please Try Again Later')
      console.log('An Error Has Ocurred: ' + error.message)
      resetForm()
    }
  }

  const { input, handleInputChange, handleSubmit, resetForm, handleInputChangeName } = useForm(sendData,
    {
      name: {
        firstname: '',
        lastname: ''
      },
      email: '',
      username: '',
      password: ''
    })

  return (
    <>
      <div className='container mt-4'>
        <div>
          <h2>Sign Up</h2>
          <h5>It's free and takes less than 30 seconds</h5>
          <hr />
        </div>
        <form
          className='col-12 col-md-8 col-lg-6 col-xl-4'
          onSubmit={handleSubmit}
        >
          <div className='mb-3'>
            <label className='form-label' htmlFor='firstname'>First Name</label>
            <input
              className='form-control'
              type='text'
              name='firstname'
              placeholder='Your First Name'
              id='firstname'
              value={input.name.firstname}
              onChange={handleInputChangeName}
              autoComplete='off'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='lastname'>Last Name</label>
            <input
              className='form-control'
              type='text'
              name='lastname'
              placeholder='Your Last Name'
              id='lastname'
              value={input.name.lastname}
              onChange={handleInputChangeName}
              autoComplete='off'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='email'>Email</label>
            <input
              className='form-control'
              type='email'
              name='email'
              placeholder='email@mail.com'
              id='email'
              value={input.email}
              onChange={handleInputChange}
              autoComplete='off'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='username'>Username</label>
            <input
              className='form-control'
              type='text'
              name='username'
              placeholder='Your Username'
              id='username'
              value={input.username}
              onChange={handleInputChange}
              autoComplete='off'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='password'>Password</label>
            <span className='input-group'>
              <input
                className='form-control'
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Write Your Password'
                id='password'
                value={input.password}
                onChange={handleInputChange}
                autoComplete='off'
                required
              />
              <button type='button' className='btn btn-secondary' onClick={() => setShowPassword(!showPassword)}>
                {showPassword
                  ? <i className='bi bi-eye' />
                  : <i className='bi bi-eye-slash' />}
              </button>
            </span>
          </div>
          <button className='btn btn-custom me-3' type='submit'>
            Sign Up
          </button>
          <Link className='text-dark' to='/login'>Already registered? Log In!</Link>
        </form>
      </div>
      <div className='white-space-signup' />
    </>
  )
}

export default Signup
