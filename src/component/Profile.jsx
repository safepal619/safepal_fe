import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BaseUrl } from '../../Root'
import axios from 'axios'
import { Image, Button } from 'antd'
import { toast } from 'react-toastify'
import { UploadImage } from '../utils/firebase.utils'

const Profile = () => {

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



  const {user} = useSelector((state) => state.user)
 
  const [isLoading, setIsLoading] = useState(false)

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
//  console.log(zip)


 const config = {
  headers: { Authorization: `Bearer ${user.token}` }
};

  useEffect(() => {
    (async()=> {
      

    try {
       const res = await axios.get(`${BaseUrl}/user/accountInformation/${user._id}`, config)

        const {avatar, username, email, phone_number, country, city, street, state, zip, kycfront, kycback} = res?.data?.data
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
    
        
    } catch (error) {
        
    }
    })()
  },[])



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
    <div className="flex flex-col justify-center items-center  pt-4">
      <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-full md:w-[576px] mx-auto p-1 sm:p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">

          <form onSubmit={handleProfile}>
            <div className="space-y-12">


              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

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

              <div className="border-b border-gray-900/10 pb-12">

                <h2 className="text-base font-semibold leading-7 text-gray-900">Are you KYC compliants?</h2>
                <p className="text-base  leading-7 text-gray-400">As part of our ongoing regulatory "Know your customer"(KYC) requirements, all clints are to update their account records by submitting cpoies of their Nation Identity/Passport or drivers licence.</p>




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
    </div>

  )
}

export default Profile;



