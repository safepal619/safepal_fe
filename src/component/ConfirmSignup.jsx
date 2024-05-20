import React from 'react'
import { Link } from 'react-router-dom'

const ConfirmSignup = () => {
  return (
    <div className="h-[65vh] w-full flex flex-col items-center justify-center bg-teal-lightest font-sans">
	<div className="h-full w-full absolute flex items-center justify-center bg-modal">
        <div className="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll">
            <div className="mb-4">
                <h1 className='font-bold text-xl'>One More Step.</h1>
            </div>
            <div className="mb-8">
                <p>Check your email and verify your account.</p>
            </div>
            <div className="flex justify-center">
                <Link to={"/"} className="flex-no-shrink  text-white py-2 px-4 rounded bg-[#001529] hover:bg-teal-dark">Home</Link>
            </div>
        </div>
    </div>
</div>
  )
}

export default ConfirmSignup