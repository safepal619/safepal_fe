import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../Root'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loader from './Loader'
import { useDispatch } from 'react-redux'
import { login } from '../services/userSlice'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)


const navigate = useNavigate()

const dispatch = useDispatch()

const handleSubmitForm = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
     const res =   await axios.post(`${BaseUrl}/auth/login`, {email, password});
     console.log(res.data)

     if(res.data.status === "Pending") {
      navigate("/confirm-signup")
     } 

     if(res.data.status === "success") {
      dispatch(login(res.data.data))
      navigate("/")
     } 

        
    } catch (error) {
        toast.error(error.response.data.message); 
        // console.log(error)
    }
    setIsLoading(false)
}


if(isLoading)  {
  return  <Loader />
}

  return (
    
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="data:image/png;base64,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" alt="safe-pal" />
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmitForm} className="space-y-6" method="POST">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" value={email} name="email" type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <Link to="/forget-password" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input value={password} id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)}  autoComplete="current-password" required className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Don't have an account?
      <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Register</Link>
    </p>
  </div>
</div>

  )
}

export default Login