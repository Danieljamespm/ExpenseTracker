import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Input = ({value, onChange, placeholder, label, type}) => {
  const [showPassword, setShowPassword] = useState(false)
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
    return (
    <div>
        <label className='text-[13px] text-slate-800 dark:text-white'>{label}</label>

        <div className='input-box'>
            <input  
            // if type == 'password' then check showPassword. If showPassword is true, return 'text(password is visible) else return 'password'(password remains hidden) else if type is not 'password' return type(whatver that may be)
                type={type=='password' ? showPassword ? 'text' : 'password' : type }
                placeholder={placeholder}
                className='w-full bg-transparent outline-none'
                value={value}
                onChange={(e) => onChange(e)}
            />

           {type === 'password' && (
            <>
                {showPassword ? (
                    <FaRegEye 
                    size={22}
                    className='text-primary cursor-pointer'
                    onClick={() => toggleShowPassword()}
                    
                    />
                ) : (<FaRegEyeSlash 
                    size={22}
                    className='text-slate-400 cursor-pointer'
                    onClick={() => toggleShowPassword()}
                />
            )}
            </>
           )}
                
            
        </div>
    </div>
  )
}

export default Input