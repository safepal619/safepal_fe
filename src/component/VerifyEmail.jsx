import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../Root';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../services/userSlice'

const VerifyEmail = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
  
    const url = new URLSearchParams(location.search);
  
    const userId = url.get("userId")?.toString();
    const token = url.get("token")?.toString();
    const dispatch = useDispatch()


const handleVerify = async() => {
    setIsLoading(true)
    try {
     const res =   await axios.patch(`${BaseUrl}/auth/verify`, {userId, token});
    


    //  if(res.data.status === "Pending") {
    //   navigate("/confirm-signup")
    //  } 

    //  if(res.data.status === "success") {
      dispatch(login(res.data.data))
      navigate("/")
    //  } 

        
    } catch (error) {
        toast.error(error.response.data.message); 

    }
    setIsLoading(false)

}

if(isLoading)  {
    return  <Loader />
  }
  


  return (
<div className="flex h-[65vh] items-center justify-center bg-gray-100">
  <div className="rounded-lg bg-gray-50 px-16 py-14">
    <div className="flex justify-center">
      <div className="rounded-full bg-green-200 p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </div>
    </div>
    <h3 className="my-4 text-center text-3xl font-semibold text-gray-700">Congratuation!!!</h3>
    <p className="w-[230px] text-center font-normal text-gray-600">You are a step away. Click on the button to verify email.</p>
    <button type='button' onClick={handleVerify} className="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-orange-400 px-6 py-3 text-center text-base font-medium text-orange-100 outline-8 hover:outline hover:duration-300">Let's Go</button>
  </div>
</div>
  )
}

export default VerifyEmail