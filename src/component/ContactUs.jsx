import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../Root";
import axios from "axios";
import { Alert } from 'antd';

const ContactUs = () => {
   const [username, setUserName] = useState("")
   const [email, setEmail] = useState("")
   const [phone_number, setPhone_number] = useState("")
   const [message, setMessage] = useState("")

   const [isSuccess, setIsSuccess] = useState(false)
   const [isError, setIsError] = useState(false)

  const handleMessage = async(e) => {
    e.preventDefault()
    try {
       await axios.post(`${BaseUrl}/user/contact`, {username, email, phone_number, message})
    
      setIsError(false)
      setIsSuccess(true)
      
  } catch (error) {
    setIsSuccess(false)
    setIsError(true)
      
  }
  window.scrollTo(0, 0)
  }

  useEffect(() => {

    if(isSuccess || isError) {

      setTimeout(() => {
        setIsSuccess(false)
        setIsError(false)

      }, 3000)

    }
   }, [isError, isSuccess])

  return (
   <>
   <div className="flex items-center min-h-screen bg-gray-50 ">
       <div className="container mx-auto">
         <div className="max-w-md mx-auto my-10 bg-gray-800 p-5 rounded-md shadow-sm">

         {isSuccess && <Alert
        message="Successful"
        description="Message deliver successful."
        type="success"
        showIcon
        closable
        onClose={() => setIsSuccess(false)}
      />}
      {
        isError &&
        <Alert
          message="Error"
          description={isError ? "Message failed to deliver try again." : isError}
          type="error"
          showIcon
          closable
          onClose={() => setIsError(false)}
        />}

{/* title */}
           <div className="text-center">
             <h1 className="my-3 text-3xl font-semibold text-gray-200">
               Contact Us
             </h1>
             <p className="text-gray-400 dark:text-gray-400">
               Fill up the form below to send us a message.
             </p>
           </div>



           <div className="m-7">
             <form onSubmit={handleMessage} > 

               <div className="mb-6">
                 <label
                   htmlFor="name"
                   className="block mb-2 text-sm text-gray-400"
                 >
                   Full Name
                 </label>
                 <input
                 value={username}
                 onChange={(e) => setUserName(e.target.value)}
                   type="text"
                   name="name"
                   id="name"
                   placeholder="John Doe"
                   required
                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring   bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:ring-gray-900 focus:border-gray-500"
                 />
               </div>
               <div className="mb-6">
                 <label
                   htmlFor="email"
                   className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                 >
                   Email Address
                 </label>
                 <input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                   type="email"
                   name="email"
                   id="email"
                   placeholder="you@safepal.com"
                   required
                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:ring-gray-900 focus:border-gray-500"
                 />
               </div>
               <div className="mb-6">
                 <label
                   htmlFor="phone"
                   className="text-sm text-gray-600 dark:text-gray-400"
                 >
                   Phone Number
                 </label>
                 <input
                 value={phone_number}
                 onChange={(e) => setPhone_number(e.target.value)}
                   type="text"
                   name="phone"
                   id="phone"
                   placeholder="+1 (555) 1234-567"
                   required
                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring  bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:ring-gray-900 focus:border-gray-500"
                 />
               </div>
               <div className="mb-6">
                 <label
                   htmlFor="message"
                   className="block mb-2 text-sm text-gray-400"
                 >
                   Your Message
                 </label>

                 <textarea
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                   rows="5"
                   name="message"
                   id="message"
                   placeholder="Your Message"
                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring  focus:border-indigo-300 bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:ring-gray-900 "
                   required
                 ></textarea>
               </div>
               <div className="mb-6">
                 <button
                   type="submit"
                   className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                 >
                   Send Message
                 </button>
               </div>
               <p
                 className="text-base text-center text-gray-400"
                 id="result"
               ></p>
           
             </form>
           </div> 


         </div>
       </div>


     </div>
   </>
  );
};

export default ContactUs;


