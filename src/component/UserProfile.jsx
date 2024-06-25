import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BaseUrl } from '../../Root'
import axios from 'axios'
import { Image, Button } from 'antd'
import { toast } from 'react-toastify'
import { UploadImage } from '../utils/firebase.utils'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser } from '../services/request'

const UserProfile = () => {
    const {userId} = useParams()
    const  [sidebarOpen, setSidebarOpen] = useState(false)

    const navigate = useNavigate()

  const [avatar, setavatar] = useState("")
  const [email, setemail] = useState("")
  const [username, setusername] = useState("")
  const [phone_number, setphone_number] = useState("")
  const [country, setcountry] = useState("")
  const [street, setstreet] = useState("")
  const [state, setstate] = useState("")
  const [city, setcity] = useState("")
  const [zip, setzip] = useState("")
  const [kycfront, setkycfront] = useState("")
  const [kycback, setkycback] = useState("")
  const [password, setpassword] = useState("")


  const [bankusername, setbankusername] = useState("")
  const [bankname, setbankname] = useState("")
  const [bankbranch, setbankbranch] = useState("")
  const [paymentType, setpaymentType] = useState("")
  const [accountnumber, setaccountnumber] = useState("")

  const [Tether, setTether] = useState("")
  const [Bitcoin, setBitcoin] = useState("")
  const [Ethereum, setEthereum] = useState("")
  const [Litecoin, setLitecoin] = useState("")





 


//   console.log(userId) 
  const {user} = useSelector((state) => state.user)


  const {data, isLoading } = getUser({token: user.token , userId})
 
  const [isLoadingSave, setIsLoading] = useState(false)

  const ImageSrc = (original) => {
    let src = ""

   
    if(typeof(original) === "string"){
       src = original
      } else {
      src = URL.createObjectURL(original[0]);
    }

    return src

  }

 const kycbackurl =  ImageSrc(kycback)
 const kycfronturl =  ImageSrc(kycfront)
 const avatarurl =  ImageSrc(avatar)


//  console.log(kycbackurl)
//  console.log(avatarurl)
//  console.log(kycfronturl)
//  console.log(data)


//  const config = {
//   headers: { Authorization: `Bearer ${user.token}` }
// };

  useEffect(() => {
    (async()=> {
      

    try {
    //    const res = await axios.get(`${BaseUrl}/user/accountInformation/${userId}`, config)

        const {avatar, username, email, phone_number, country, city, street, state, zip, kycfront, kycback, password} = data?.data
        setavatar(avatar)
        setusername(username)
        setemail(email)
        setphone_number(phone_number)
        setcountry(country)
        setcity(city)
        setstreet(street)
        setstate(state)
        setzip(zip)
        setkycfront(kycfront)
        setkycback(kycback)
        setpassword(password)

    // console.log(data?.data?.accountdetail)
        
    setbankusername(data?.data?.accountdetail?.username)
    setbankname(data?.data?.accountdetail?.bankname)
     setbankbranch(data?.data?.accountdetail?.bankbranch)
   setpaymentType(data?.data?.accountdetail?.paymentType)
     setaccountnumber(data?.data?.accountdetail?.accountnumber)


     
    setbankusername(data?.data?.wallet?.Tether?.fiatbalance)
    setbankusername(data?.data?.wallet?.Bitcoin?.fiatbalance)
    setbankusername(data?.data?.wallet?.Ethereum?.fiatbalance)
    setbankusername(data?.data?.wallet?.Litecoin?.fiatbalance)
   
   




    } catch (error) {
        
    }
    })()
  },[data])



  const handleProfile = async(e) => {
    e.preventDefault()
    setIsLoading(true)
  
    try {

      let kycback1 = "" ;
      let kycfront1 = "" ;
      let avatar1 = "" ;

      if(typeof(kycback) === "string" ) {
        kycback1 = kycback
      } else {
        kycback1  = await UploadImage(kycback[0])
      }

      if(typeof(kycfront) === "string" ) {
        kycfront1 = kycfront
      } else {
        kycfront1  = await UploadImage(kycfront[0])
      }

      if(typeof(avatar) === "string" ) {
        avatar1 = avatar
      } else {
        avatar1  = await UploadImage(avatar[0])
      }


     

      const res = await axios.patch(`${BaseUrl}/user/profile/update/${user._id}`, {avatar: avatar1, username, email, phone_number, country, city, street, state, zip, kycfront: kycfront1, kycback: kycback1}, config)

       toast.success("profile updated successfully")
   } catch (error) {
    toast.error("profile updated failed.")
   }finally {
    setIsLoading(false)
   }

  }



 

  return (

<div className='flex max-h-screen w-full'>
<div  onClick={() => setSidebarOpen(false)} className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}></div>

<div className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}>
                <div className="flex items-center justify-center mt-8">
                    <button onClick={() => navigate("/")} className="flex items-center cursor-pointer">
                        <svg className="w-12 h-12" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z" fill="#4C51BF" stroke="#4C51BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z" fill="white"></path>
                        </svg>
                        
                        <span className="mx-2 text-2xl font-semibold text-white">Dashboard</span>
                    </button>
                </div>
        
                <nav className="mt-10">
                    <button onClick={() => navigate("/")} className="flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700 bg-opacity-25 w-full cursor-pointer" >
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                        </svg>
        
                        <span className="mx-3">Dashboard</span>
                    </button>
        
                    {/* <a className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        href="#">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z">
                            </path>
                        </svg>
        
                        <span className="mx-3">UI Elements</span>
                    </a> */}
        
                    {/* <a className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        href="#">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                            </path>
                        </svg>
        
                        <span className="mx-3">Tables</span>
                    </a> */}
        
                    {/* <a className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        href="#">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                            </path>
                        </svg>
        
                        <span className="mx-3">Forms</span>
                    </a> */}
                </nav>
            </div>



            {isLoading && <div className="flex min-h-screen items-center justify-center flex-1">
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
</div>}


            

           {!isLoading && <div className="   pt-4 overflow-y-auto flex-1">
  
      <div className="relative flex flex-col items-center rounded-[10px] border-[1px] md:w-[576px] border-gray-200 w-full  mx-auto p-1 sm:p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="flex items-center justify-between rounded-t-3xl p-3 w-full"> 

          <form onSubmit={handleProfile}>
            <div className="space-y-12">


              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <br />
                {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

                <div className="col-span-full">
                  <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                  <div className="mt-2 flex items-center gap-x-3">
                    {avatarurl && <img src={avatarurl} className='h-12 w-12 rounded-full' alt="profile" />}
                    {!avatarurl && <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                    </svg>}


                    <label htmlFor="file-upload3" className="border px-2.5 py-1.5 text-sm relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input  onChange={(e) => setavatar(e.target.files)} id="file-upload3" name="file-upload3" type="file" className="sr-only" />
                        </label>
                     {/* </div> */}
                    {/* <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button> */}
                  </div>
                </div>



                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Full name</label>
                    <div className="mt-2">
                      <input value={username} onChange={(e) => setusername(e.target.value)} type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

            

                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                      <input value={email} onChange={(e) => setemail(e.target.value)} id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                    <div className="mt-2">
                      <input value={phone_number} onChange={(e) => setphone_number(e.target.value)} type="text" name="phone" id="phone" autoComplete="phone" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div className="mt-2">
                      <input value={password} onChange={(e) => setpassword(e.target.value)} type="text" name="password" id="password" autoComplete="password" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                    <div className="mt-2">
                      <input value={country} onChange={(e) => setcountry(e.target.value)} type="text" name="country" id="country" autoComplete="country" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  {/* <div className="sm:col-span-4">
          <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
          <div className="mt-2">
            <select id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>


        </div> */}

                  <div className="col-span-full">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                    <div className="mt-2">
                      <input value={street} onChange={(e) => setstreet(e.target.value)} type="text" name="street-address" id="street-address" autoComplete="street-address" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                    <div className="mt-2">
                      <input value={city} onChange={(e) => setcity(e.target.value)} type="text" name="city" id="city" autoComplete="address-level2" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                    <div className="mt-2">
                      <input value={state} onChange={(e) => setstate(e.target.value)} type="text" name="region" id="region" autoComplete="address-level1" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                    <div className="mt-2">
                      <input value={zip} onChange={(e) => setzip(e.target.value)} type="text" name="postal-code" id="postal-code" autoComplete="postal-code" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>




                </div>
              </div>


              {/* bank details start*/}

<div className="border-b border-gray-900/10 pb-12">


              <h1 className='block text-lg font-medium leading-6 text-gray-900'>Bank Details:</h1>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              

<div className="sm:col-span-2 sm:col-start-1">
  <label htmlFor="bankusername" className="block text-sm font-medium leading-6 text-gray-900">Account Name</label>
  <div className="mt-2">
    <input value={bankusername} disabled  type="text" name="bankusername" id="bankusername" autoComplete="address-level2" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
  </div>
</div>

<div className="sm:col-span-2">
  <label htmlFor="bankname" className="block text-sm font-medium leading-6 text-gray-900">Bank Name</label>
  <div className="mt-2">
    <input value={bankname} disabled type="text" name="bankname" id="bankname" autoComplete="address-level1" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
  </div>
</div>

<div className="sm:col-span-2">
  <label htmlFor="accountnumber" className="block text-sm font-medium leading-6 text-gray-900">Account Number</label>
  <div className="mt-2">
    <input value={accountnumber} disabled type="text" name="accountnumber" id="accountnumber" autoComplete="accountnumber" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
  </div>
</div>


<div className="sm:col-span-2">
  <label htmlFor="bankbranch" className="block text-sm font-medium leading-6 text-gray-900">Bank Branch</label>
  <div className="mt-2">
    <input value={bankbranch} disabled type="text" name="bankbranch" id="bankbranch" autoComplete="address-level1" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
  </div>
</div>

<div className="sm:col-span-2">
  <label htmlFor="paymentType" className="block text-sm font-medium leading-6 text-gray-900">Payment Type</label>
  <div className="mt-2">
    <input value={paymentType} disabled type="text" name="paymentType" id="paymentType" autoComplete="paymentType" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
  </div>
</div>


</div>
</div>

              {/* bank details ends */}

              {/* Deposit detail */}

<div className="border-b border-gray-900/10 pb-12">


              <h1 className='block text-lg font-medium leading-6 text-gray-900'>Deposit Details In Dollar:</h1>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              

<div className="sm:col-span-2 sm:col-start-1">
  <label htmlFor="Tether" className="block text-sm font-medium leading-6 text-gray-900">Tether</label>
  <div className="mt-2">
    <input value={Tether || 0 } disabled  type="text" name="Tether" id="Tether" autoComplete="address-level2" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
  </div>
</div>

<div className="sm:col-span-2">
  <label htmlFor="Bitcoin" className="block text-sm font-medium leading-6 text-gray-900">Bitcoin</label>
  <div className="mt-2">
    <input value={Bitcoin || 0} disabled type="text" name="Bitcoin" id="Bitcoin" autoComplete="address-level1" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
  </div>
</div>

<div className="sm:col-span-2">
  <label htmlFor="Ethereum" className="block text-sm font-medium leading-6 text-gray-900">Ethereum</label>
  <div className="mt-2">
    <input value={Ethereum || 0} disabled type="text" name="Ethereum" id="Ethereum" autoComplete="Ethereum" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
  </div>
</div>


<div className="sm:col-span-2">
  <label htmlFor="Litecoin" className="block text-sm font-medium leading-6 text-gray-900">Litecoin</label>
  <div className="mt-2">
    <input value={Litecoin || 0} disabled type="text" name="Litecoin" id="Litecoin" autoComplete="address-level1" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
  </div>
</div>


</div>
</div>

              {/* deposit details ends */}




              <div className="border-b border-gray-900/10 pb-12">

                {/* <h2 className="text-base font-semibold leading-7 text-gray-900">Are you KYC compliants?</h2>
                <p className="text-base  leading-7 text-gray-400">As part of our ongoing regulatory "Know your customer"(KYC) requirements, all clints are to update their account records by submitting cpoies of their Nation Identity/Passport or drivers licence.</p> */}




                {/*
      <p className="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>

      <div className="mt-10 space-y-10">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
          <div className="mt-6 space-y-6">
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input id="comments" name="comments" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="comments" className="font-medium text-gray-900">Comments</label>
                <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input id="candidates" name="candidates" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="candidates" className="font-medium text-gray-900">Candidates</label>
                <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input id="offers" name="offers" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="offers" className="font-medium text-gray-900">Offers</label>
                <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-x-3">
              <input id="push-everything" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">Everything</label>
            </div>
            <div className="flex items-center gap-x-3">
              <input id="push-email" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">Same as email</label>
            </div>
            <div className="flex items-center gap-x-3">
              <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">No push notifications</label>
            </div>
          </div>
        </fieldset>
      </div> */}


      {/* cover */}
      {kycfronturl && <div className=' mx-auto text-center border-2 p-2 rounded border-dotted'>
               <img src={kycfronturl} alt="" className='w-1/2 h-52 object-contain mx-auto' />
<label htmlFor="file-upload1" className="border px-2.5 py-1.5 relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input  onChange={(e) => setkycfront(e.target.files)} id="file-upload1" name="file-upload1" type="file" className="sr-only" />
                        </label>
                     </div>
                     } 
                     
                    


                {/* cover one */}

                {!kycfronturl &&  <div className="col-span-full mt-4">
                  <label htmlFor="cover-photo1" className="block text-sm font-medium leading-6 text-gray-900">Front Cover photo</label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    
                   
                    
                    <div className="text-center ">
                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                      </svg>

                    <div className='text-center text-red-500'>
                      <div className="mt-4 flex text-sm  leading-6 text-gray-600">
                        <label htmlFor="file-upload1" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input  onChange={(e) => setkycfront(e.target.files)} id="file-upload1" name="file-upload1" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>

                    </div>
                    </div>
                  </div>
                  </div>}


{/* cover 2 */}
                {kycbackurl && <div className=' mx-auto text-center border-2 p-2 rounded border-dotted'>
                  <img src={kycbackurl} alt="" className='w-1/2 h-40 object-contain mx-auto' />
                  <div>

                  <label htmlFor="file-upload2" className="border px-2.5 py-1.5 relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input onChange={(e) => setkycback(e.target.files)} id="file-upload2" name="file-upload2" type="file" className="sr-only" />
                  </label>
                  </div>
                </div>}

                {/* cover 2 */}
                
                {!kycbackurl && <div className="col-span-full mt-3">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Back Cover photo</label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                      </svg>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label htmlFor="file-upload2" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input onChange={(e) => setkycback(e.target.files)} id="file-upload2" name="file-upload2" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1 text-center">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>}

              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button> */}
              {isLoading &&  <Button type="primary" className="mx-auto block rounded-md border bg-blue-500 px-6 py-2 text-white outline-none" loading>Loading</Button>}
              {!isLoading && <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>}
            </div>
          </form>

      </div>
      </div>
  
    </div>}

</div>



  )
}

export default UserProfile;



