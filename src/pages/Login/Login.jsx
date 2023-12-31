import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSearchContext } from '@/context/SearchContext'
import swal from 'sweetalert'
import useForm from '@/hooks/useForm'
import { loginUserService } from '@/services/userService'
import { useAuthContext } from '@/context/AuthContext'
import './login.css'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { setSearchTerm } = useSearchContext()
  const { login } = useAuthContext()

  useEffect(() => {
    setSearchTerm('')
  }, [])

  const sendData = async (data) => {
    try {
      const response = await loginUserService(data)
      if (response.status === 200) {
        console.log('User Logged: ', response.data.token)
        login(response.data.token)
        swal('Welcome back!')
        navigate('/')
      }
    } catch (error) {
      swal('Incorrect Email or Password')
      console.log('An Error Has Ocurred: ' + error.message)
      resetForm()
    }
  }

  const { input, handleInputChange, handleSubmit, resetForm } = useForm(sendData, {
    username: '',
    password: ''
  })

  return (
    <>
      <div className='container mt-4'>
        <div>
          <h2>Log In</h2>
          <h5>Enter your login credentials</h5>
          <hr />
        </div>
        <form
          className='col-12 col-md-8 col-lg-6 col-xl-4'
          onSubmit={handleSubmit}
        >
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
            Log In
          </button>
          <Link className='text-dark' to='/signup'>Not a registered user? Sign Up!</Link>
        </form>
      </div>
      <div className='position-absolute start-50 top-50 translate-middle card p-4 mt-5'>
        <h3>Test User: </h3>
        <p>User: johnd</p>
        <p>Pass: m38rmF$</p>
      </div>
      <div className='white-space-login' />
    </>
  )
}

export default Login
