import React, {useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPath'
import { UserContext } from '../../context/userContext'
import  uploadImage  from '../../utils/uploadImage'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate()

  //Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = ''

    if(!fullName) {
      setError("Please enter your name")
      return
    }

    if(!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if(!password) {
      setError('Please create a password')
      return
    }

    setError('')

    //SignUp API call
    try {

      //upload image if present
      if(profilePic) {
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || ''
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      })

      const {token, user} = response.data
      if(token) {
        localStorage.setItem('token', token)
        updateUser(user)
        navigate('/dashboard')
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message)
      }else {
        setError('Something went wrong. Please try again.')
      }
    }
  }



  return (
    <AuthLayout>
        <div className='lg:w-[100%]  mt-10 flex flex-col justify-center'>
          <h3 className='text-xl font-semibold text-white'>Create an Account</h3>
          <p className='text-xs text-slate-400 mt-[5px] mb-6'>Enter your details below.</p>

          <form onSubmit={handleSignUp}>

            <ProfilePhotoSelector image = {profilePic} setImage={setProfilePic} />

          
            <div className='flex flex-col gap-4'>
              <div className='md:flex gap-4'>
              <Input 
              classname="w-full"
              value={fullName}
              onChange={({target}) => setFullName(target.value)}
              label='Full Name'
              placeholder='John'
              type='text'
              style={{fontSize: '16px'}}
              />

               <Input 
              classname="w-full" 
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label='Email Address'
          placeholder='john@example.com'
          type='text'
          style={{fontSize: '16px'}}
          />
          </div>
          <div className='w-full mt-2 md:flex-2'>
            <Input 
            
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label='Password'
          placeholder='Min 8 Characters'
          type='password'
          style={{fontSize: '16px'}}
          />
          </div>
            </div>
            

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>SIGN UP</button>

          <p className='text-[13px] text-slate-400 mt-3'>
            Alerady have an account?{' '}
            <Link className='font-medium text-white underline' to='/login'>
              Login
            </Link>
          </p>
          </form>
        </div>
    </AuthLayout>
  )
}

export default SignUp