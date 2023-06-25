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
      if (response.status === 201) {
        console.log('Account Created: ', response)
        swal('Your Account Has Been Successfully Created')
        navigate('/login')
      }
    } catch (error) {
      swal('An Error Occurred, Please Try Again Later')
      console.log('An Error Has Ocurred: ' + error.message)
      resetForm()
    }
  }

  const { input, handleInputChange, handleSubmit, resetForm } = useForm(sendData, {
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
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
            <label className='form-label' htmlFor='first_name'>First Name</label>
            <input
              className='form-control'
              type='text'
              name='first_name'
              placeholder='Your First Name'
              id='first_name'
              value={input.first_name}
              onChange={handleInputChange}
              autoComplete='off'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='last_name'>Last Name</label>
            <input
              className='form-control'
              type='text'
              name='last_name'
              placeholder='Your Last Name'
              id='last_name'
              value={input.last_name}
              onChange={handleInputChange}
              autoComplete='off'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='gender'>Gender</label>
            <select
              className='form-select'
              name='gender'
              id='gender'
              value={input.gender}
              onChange={handleInputChange}
              required
            >
              <option value=''>Choose your gender</option>
              <option value='M'>Male</option>
              <option value='F'>Female</option>
            </select>
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
                  ? <i class='bi bi-eye' />
                  : <i class='bi bi-eye-slash' />}
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
