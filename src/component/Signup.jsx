import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../Root'
import { toast } from 'react-toastify';
import Loader from './Loader';

const Signup = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [fullName, setFullname] = useState("")
    const [password, setPassword] = useState("")
    const [phone_number, setPhone_number] = useState("")

    
   
const navigate = useNavigate()

const handleSubmit = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
        await axios.post(`${BaseUrl}/auth/signup`, {email, username:fullName, password, phone_number});
    
navigate("/confirm-signup")

        
    } catch (error) {
        toast.error(error.response.data.errors[0]); 
    }

    setIsLoading(false)
    
}

if(isLoading)  {
    return  <Loader />
  }
  


  return (
<div className="bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        
        <div className="flex justify-center mb-6">
            <span className="inline-block bg-gray-200 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
            </span>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">Create a new account</h2>
        <p className="text-gray-600 text-center mb-6">Enter your details to register.</p>

        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 text-sm font-semibold mb-2">Full Name *</label>
                <input value={fullName} onChange={(e) => setFullname(e.target.value)}  type="text" id="fullName" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="James Brown" />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}  type="email" id="email" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="hello@safepal.com" />
            </div>

            <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-semibold mb-2">Mobile *</label>
                <input value={phone_number} onChange={(e) => setPhone_number(e.target.value)}  type="tel" id="phoneNumber" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="+91 00000 0000" />
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="••••••••" />
                {/* <p className="text-gray-600 text-xs mt-1">Must contain 1 uppercase letter, 1 number, min. 8 characters.</p> */}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Register</button>
            <p className="text-gray-600 text-xs text-center mt-4">
                By clicking Register, you agree to accept Safepal Financial's 
                <a href="https://www.termsfeed.com/live/b8d62e2e-ddfe-4a2e-8e1a-e6cff282e3d1" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"> Terms and Conditions</a>.
            </p>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
      Already have an account?
      <Link to="/auth" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</Link>
    </p>
    </div>
</div>
  )
}

export default Signup