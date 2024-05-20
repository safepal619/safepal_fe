
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../Root";
import axios from "axios";
import { Alert, Button } from 'antd';
import { useSelector } from "react-redux";

const Payment = () => {
   const [username, setUserName] = useState("")
   const [bankname, setbankname] = useState("")
   const [accountnumber, setaccountnumber] = useState("")
   const [bankbranch, setbankbranch] = useState("")
   const [paymentType, setpaymentType] = useState("Bank Transfer")

   const {user} = useSelector((state) => state.user)

   const [isSuccess, setIsSuccess] = useState(false)
   const [isError, setIsError] = useState(false)
   const [isLoading, setIsLoading] = useState(true)


   const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  };


  const handleMessage = async(e) => {
    e.preventDefault()
    setIsLoading(true)
  
      
    try {
       await axios.patch(`${BaseUrl}/user/bankdetail/update/${user._id}`, {
        username,
        bankname,
        bankbranch,
        paymentType
       }, config)
    
      setIsError(false)
      setIsSuccess(true)
      
  } catch (error) {
    setIsSuccess(false)
    setIsError(true)
      
  }
  setIsLoading(false)
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



   useEffect(() => {
    (async()=> {
      

    try {
       const res = await axios.get(`${BaseUrl}/user/accountInformation/${user._id}`, config)

        const {bankbranch,bankname, paymentType, username} = res?.data?.data?.accountdetail

        setUserName(username)
        setpaymentType(paymentType)
        setbankname(bankname)
        setbankbranch(bankbranch)
    setIsLoading(false)
        
    } catch (error) {
        
    }
    })()
  },[])




  return (
   <>
   <div className="flex items-center min-h-screen bg-gray-50 dark:bg-gray-900">
       <div className="container mx-auto">
         <div className="max-w-md mx-auto my-10 bg-white dark:bg-gray-800 p-5 rounded-md shadow-sm">

         {isSuccess && <Alert
        message="Successful"
        description="Account detail saved successful."
        type="success"
        showIcon
        closable
        onClose={() => setIsSuccess(false)}
      />}
      {
        isError &&
        <Alert
          message="Error"
          description={isError ? "Account info failed to save try again." : isError}
          type="error"
          showIcon
          closable
          onClose={() => setIsError(false)}
        />}

{/* title */}
           <div className="text-center">
             <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
               All Payment method
             </h1>
             <p className="text-gray-400 dark:text-gray-400">
               Save your payment method below for easy withdrawal.
             </p>
           </div>

{/* payment method */}








{/* payment form */}

           <div className="m-7">
             <form onSubmit={handleMessage} > 
             <div class="flex flex-wrap gap-2 my-5">
             <div onClick={() => setbankname("")} class="center relative inline-block select-none whitespace-nowrap rounded-lg bg-teal-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div class="mt-px flex items-center gap-1">All {bankname === "" && <div className="w-2 h-2 rounded-full bg-red-500"></div>}</div>
  </div>

  <div onClick={() => setbankname("Tinkoff")} class="center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div class="mt-px flex items-center gap-1">Tinkoff{bankname === "Tinkoff" && <div className="w-2 h-2 rounded-full bg-red-500"></div>}</div>
  </div>
  <div onClick={() => setbankname("Sberbank")} class="center relative inline-block select-none whitespace-nowrap rounded-lg bg-red-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div class="mt-px flex items-center gap-1">Sberbank {bankname === "Sberbank" &&<div className="w-2 h-2 rounded-full bg-green-500"></div>}</div>
  </div>
  <div onClick={() => setbankname("Raiffeisenbank")} class="center relative inline-block select-none whitespace-nowrap rounded-lg bg-green-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div class="mt-px flex items-center gap-1">Raiffeisenbank{bankname === "Raiffeisenbank" && <div className="w-2 h-2 rounded-full bg-red-500"></div>}</div>
  </div>
  <div onClick={() => setbankname("Perfect money")} class="center relative inline-block select-none whitespace-nowrap rounded-lg bg-amber-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-black">
    <div class="mt-px flex items-center gap-1">Perfect money{bankname === "Perfect money" && <div className="w-2 h-2 rounded-full bg-red-500"></div>}</div>
  </div>
  <div onClick={() => setbankname("Citi bank")} class="center relative inline-block select-none whitespace-nowrap rounded-lg bg-pink-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div class="mt-px flex items-center gap-1">Citi bank ( Russia){bankname === "Citi bank" && <div className="w-2 h-2 rounded-full bg-green-500"></div>}</div>
  </div>
  <div onClick={() => setbankname("Alfa Bank")} class="center relative inline-block select-none whitespace-nowrap rounded-lg bg-indigo-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div class="mt-px flex items-center gap-1">Alfa Bank{bankname === "Alfa Bank" && <div className="w-2 h-2 rounded-full bg-red-500"></div>}</div>
  </div>
  <div onClick={() => setbankname("Rosbank")} class="center relative inline-block select-none whitespace-nowrap rounded-lg bg-purple-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div class="mt-px flex items-center gap-1">Rosbank{bankname === "Rosbank" && <div className="w-2 h-2 rounded-full bg-red-500"></div>}</div>
  </div>
  {/* 
  <div class="center relative inline-block select-none whitespace-nowrap rounded-lg bg-cyan-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div class="mt-px">cyan</div>
  </div> */}
</div>



              <div className="mb-6">
                 <label
                   htmlFor="name"
                   className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                 >
                   Bank Name
                 </label>
                 <input
                 value={bankname}
                 onChange={(e) => setbankname(e.target.value)}
                   type="text"
                   name="name"
                   id="name"
                   placeholder="Please Enter Bank Name"
                   required
                   className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                 />
               </div>




             <div className="mb-6">
                 <label
                   htmlFor="name"
                   className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                 >
                   Payment Type
                 </label>

                 <select value={paymentType}
                 onChange={(e) => setpaymentType(e.target.value)} name="" id="" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
>
                    <option value="Bank Transfer">Bank Transfer</option>
                 </select>

               </div>

             <div className="mb-6">
                 <label
                   htmlFor="name"
                   className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                 >
                   Name
                 </label>
                 <input
                 value={username}
                 onChange={(e) => setUserName(e.target.value)}
                   type="text"
                   name="name"
                   id="name"
                   placeholder="Please Enter Name"
                   required
                   className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                 />
               </div>






               <div className="mb-6">
                 <label
                   htmlFor="account_name"
                   className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                 >
                   Bank Account Number
                 </label>
                 <input
                     value={accountnumber}
                     onChange={(e) => setaccountnumber(e.target.value)}
                   type="number"
                   name="account_name"
                   id="account_name"
                   placeholder="Please Enter Account Number"
                   required
                   className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                 />
               </div>



               <div className="mb-6">
                 <label
                   htmlFor="branch"
                   className="text-sm text-gray-600 dark:text-gray-400"
                 >
                   Bank Branch
                 </label>
                 <input
                 value={bankbranch}
                 onChange={(e) => setbankbranch(e.target.value)}
                   type="text"
                   name="branch"
                   id="branch"
                   placeholder="Please Enter Bank Branch"
                   required
                   className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                 />
               </div>


               
               <div className="mb-6">
               {!isLoading && <button
                   type="submit"
                   className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                 >
                   Save
                 </button>}
                 {isLoading &&  <Button type="primary" className="w-full px-3  text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none" loading>Loading</Button>}
               </div>
        
           
             </form>
           </div> 


         </div>
       </div>


     </div>
   </>
  );
};

export default Payment;







