
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../Root";
import axios from "axios";
import { Alert, Button } from 'antd';
import { useSelector } from "react-redux";
import Bankdetail from "./Bankdetail";
import { getUser } from "../services/request";

const Payment = () => {
   const [username, setUserName] = useState("")
   const [bankname, setbankname] = useState("")
   const [accountnumber, setaccountnumber] = useState("")
   const [bankbranch, setbankbranch] = useState("")
   const [paymentType, setpaymentType] = useState("Bank Transfer")

   const {user} = useSelector((state) => state.user)

 
  const {data , isLoading: isLoadingData} = getUser({token: user.token , userId: user._id})

   const [isSuccess, setIsSuccess] = useState(false)
   const [isError, setIsError] = useState(false)
   const [isLoading, setIsLoading] = useState(true)

   const [editPayment, setEditPayment] = useState(true)


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
        paymentType,
        accountnumber
       }, config)
    
      setIsError(false)
      setIsSuccess(true)

      setTimeout(() => {
        setEditPayment(false)
        
      }, 1000);
      
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
      // console.log("userdata: ",data?.data?.accountdetail)

        const {bankbranch,bankname, paymentType, username, accountnumber} = data?.data?.accountdetail

        setUserName(username)
        setpaymentType(paymentType)
        setbankname(bankname)
        setbankbranch(bankbranch)
        setaccountnumber(accountnumber)
    setIsLoading(false)

    if(bankname || accountnumber || username) {
      setEditPayment(false)
    }
        
    } catch (error) {
        
    }
    })()
  },[data?.data?.accountdetail])




  if(isLoadingData) {
  return <div className="flex min-h-screen items-center justify-center flex-1">
  <div className="w-1/3">
      <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="px-6 py-4">
          <div className="h-6 bg-gray-300 mb-2"></div>
          <div className="h-4 bg-gray-300 w-2/3"></div>
      </div>
      <div className="px-6 pt-4 pb-2">
          <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-300 w-1/2"></div>
      </div>
      </div>
  </div>
</div>

  }






  return (
   <>


   {!editPayment && <Bankdetail  bankname={bankname} username={username} accountnumber={accountnumber} onClick={() => setEditPayment(true)} />}


   {editPayment && <div className="flex items-center min-h-screen bg-gray-50 ">
       <div className="container mx-auto">
         <div className="max-w-md mx-auto my-10 bg-gray-800 p-5 rounded-md shadow-sm">

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
             <h1 className="my-3 text-3xl font-semibold text-gray-200">
               All Payment method
             </h1>
             <p className="text-gray-400">
               Save your payment method below for easy withdrawal.
             </p>
           </div>

{/* payment method */}








{/* payment form */}

           <div className="m-7">
             <form onSubmit={handleMessage} > 
             <div className="flex flex-wrap gap-2 my-5">
             <div onClick={() => setbankname("")} className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-teal-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div className="mt-px flex items-center gap-1">All {bankname === "" && <div className="w-2 h-2 rounded-full bg-red-500"></div>}</div>
  </div>

  <div onClick={() => setbankname("Tinkoff")} className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div className="mt-px flex items-center gap-1">Tinkoff{bankname === "Tinkoff" && <div className="w-2 h-2 rounded-full bg-red-500"></div>}</div>
  </div>
  <div onClick={() => setbankname("Sberbank")} className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-red-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div className="mt-px flex items-center gap-1">Sberbank {bankname === "Sberbank" &&<div className="w-2 h-2 rounded-full bg-green-500"></div>}</div>
  </div>
  <div onClick={() => setbankname("Raiffeisenbank")} className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-green-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div className="mt-px flex items-center gap-1">Raiffeisenbank{bankname === "Raiffeisenbank" && <div className="w-2 h-2 rounded-full bg-red-500"></div>}</div>
  </div>
  <div onClick={() => setbankname("Perfect money")} className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-amber-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-black">
    <div className="mt-px flex items-center gap-1">Perfect money{bankname === "Perfect money" && <div className="w-2 h-2 rounded-full bg-red-500"></div>}</div>
  </div>
  <div onClick={() => setbankname("Citi bank")} className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-pink-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div className="mt-px flex items-center gap-1">Citi bank ( Russia){bankname === "Citi bank" && <div className="w-2 h-2 rounded-full bg-green-500"></div>}</div>
  </div>
  <div onClick={() => setbankname("Alfa Bank")} className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-indigo-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div className="mt-px flex items-center gap-1">Alfa Bank{bankname === "Alfa Bank" && <div className="w-2 h-2 rounded-full bg-red-500"></div>}</div>
  </div>
  <div onClick={() => setbankname("Rosbank")} className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-purple-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div className="mt-px flex items-center gap-1">Rosbank{bankname === "Rosbank" && <div className="w-2 h-2 rounded-full bg-red-500"></div>}</div>
  </div>
  {/* 
  <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-cyan-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
    <div className="mt-px">cyan</div>
  </div> */}
</div>



              <div className="mb-6">
                 <label
                   htmlFor="name"
                   className="block mb-2 text-sm text-gray-400"
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
                   className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring  bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:ring-gray-900 focus:border-gray-500"
                 />
               </div>




             <div className="mb-6">
                 <label
                   htmlFor="name"
                   className="block mb-2 text-sm text-gray-400"
                 >
                   Payment Type
                 </label>

                 <select value={paymentType}
                 onChange={(e) => setpaymentType(e.target.value)} name="" id="" className="w-full px-3 py-2 p border rounded-md focus:outline-none focus:ring  bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:ring-gray-900 focus:border-gray-500"
>
                    <option value="Bank Transfer">Bank Transfer</option>
                 </select>

               </div>

             <div className="mb-6">
                 <label
                   htmlFor="name"
                   className="block mb-2 text-sm text-gray-400"
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
                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:ring-gray-900 focus:border-gray-500"
                 />
               </div>






               <div className="mb-6">
                 <label
                   htmlFor="account_name"
                   className="block mb-2 text-sm  text-gray-400"
                 >
                   Bank Account Number
                 </label>
                 <input
                     value={accountnumber}
                     onChange={(e) => setaccountnumber(e.target.value)}
                   type="text"
                   name="account_name"
                   id="account_name"
                   placeholder="Please Enter Account Number"
                   required
                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring  bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:ring-gray-900 focus:border-gray-500"
                 />
               </div>



               <div className="mb-6">
                 <label
                   htmlFor="branch"
                   className="text-sm text-gray-400"
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
                   className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:ring-gray-900 focus:border-gray-500"
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


     </div>}


     
   </>
  );
};

export default Payment;







