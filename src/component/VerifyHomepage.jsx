import React, { useEffect, useState } from 'react'
import Loader from './Loader'

import { Banner, CryptoList } from '../component'

import { useSelector } from 'react-redux'
import { BaseUrl } from '../../Root'
import axios from 'axios'
import { getUser } from '../services/request'


const VerifyHomepage = () => {

  const {user} = useSelector((state) => state.user)
 
  const {data, isLoading } = getUser({token: user.token , userId: user._id})
 
// console.log(data?.data)
  return (
    <>

    {data?.data  && <Banner messagecount={data?.data?.message_counter_user} totalBalance={data?.data?.totalBalance} />}
    
     {data?.data && <CryptoList wallet={data?.data?.wallet} liveCryptoUpdate={data?.data?.liveCryptoUpdate}  />}
     {isLoading && <Loader  />}
    </>
    
  )
}

export default VerifyHomepage
