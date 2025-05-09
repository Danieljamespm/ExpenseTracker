import React, {useContext,useState} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPath'
import { UserContext } from '../../context/userContext'

const Login = () => {
  // State that handles email and password inputs as well as errors
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)

const { updateUser } = useContext(UserContext)

const navigate = useNavigate()

//Handle Login from Submit
 const handleLogin = async (e) => {
  e.preventDefault()

  if(!validateEmail(email)) {
    setError('Please enter a valid email.')
    return
  }
  if(!password) {
    setError('Please enter your password')
    return
  }
  setError('')

  //Login API call
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password
    })
    const {token, user} = response.data
    if(token) {
      localStorage.setItem('token', token)
      updateUser(user)
      navigate('/dashboard')
    }
  } catch (error) {
    console.log('Login error', error)
    if(error.response && error.response.data.message) {
      setError(error.response.data.message)
    }else {
      setError('Something went wrong. Please try again.')
    }
  }
 }
  
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-white'>Welcome Back</h3>
        <p className='text-xs text-white mt-[5px] mb-6'>Please enter your details to log in</p>

        <form onSubmit={handleLogin}>
          {/* input handling email */}
          <Input 
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label='Email Address'
          placeholder='john@example.com'
          type='text'
          />
          {/* input handling password */}
            <Input 
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label='Password'
          placeholder='Min 8 Characters'
          type='password'
          />

          {/* If and when there is an error it will appear here */}

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>} 

          <button type='submit' className='btn-primary'>LOGIN</button>

          <p className='text-[13px] text-slate-400 mt-3'>
            Don't have an account?{' '}
            {/* Link taking you to signup route */}
            <Link className='font-medium text-white underline' to='/signup'>
            SignUp
            </Link>
          </p>
        </form>

      </div>
    </AuthLayout>
  )
}

export default Login