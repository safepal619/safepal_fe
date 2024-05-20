import React, { useEffect, useState } from 'react'
import Loader from './Loader'

import { Banner, CryptoList } from '../component'

import { useSelector } from 'react-redux'
import { BaseUrl } from '../../Root'
import axios from 'axios'


const VerifyHomepage = () => {

  const {user} = useSelector((state) => state.user)
 

  const [crypto, setCrypto] = useState({})



  useEffect(() => {
    (async()=> {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
    };

    try {
       const res = await axios.get(`${BaseUrl}/user/accountInformation/${user._id}`, config)

        // toast.success(res.data.message)
        // console.log(res.data)
        setCrypto(res?.data?.data)
        
    } catch (error) {
        // toast.error("Failed try again.")
        // console.log(error)
    }
    })()
  },[])

  console.log(crypto)

  return (
    <>

    <Banner totalBalance={crypto?.totalBalance} />
    
     {crypto && <CryptoList wallet={crypto?.wallet} liveCryptoUpdate={crypto?.liveCryptoUpdate}  />}
     {!crypto && <Loader  />}
    </>
    
  )
}

export default VerifyHomepage
