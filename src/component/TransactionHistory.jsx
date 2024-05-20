import { Empty, Typography } from 'antd'
import React, { useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BaseUrl } from '../../Root'
import axios from 'axios'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import moment from 'moment';

const TransactionHistory = () => {

    const { Title } = Typography

    const [transactionhistory, setTransationHistory] = useState([])

    const {user} = useSelector((state) => state.user)
    // const navigate = useNavigate()
  
  
    useEffect(() => {
      (async()=> {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
      };
  
      try {
         const res = await axios.get(`${BaseUrl}/user/transaction/user/${user._id}`, config)
  
          setTransationHistory(res.data.data)
          
      } catch (error) {
        //   toast.error("Failed try again.")
        //   console.log(error)
      }
      })()
    },[])

  return (
    <div>
        {/* <div className='home-heading-container gap-6'>
           
            <div className='border flex-1'>
        <Title level={2} className='home-title text-xl text-center'>Transaction History</Title>

            </div>
        {transactionhistory?.length >  10 && <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>}
      </div> */}
    
             {transactionhistory?.length === 0  ? <div className="empty_container">

             <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
           </div>
           
          :

        <div className="flex flex-col justify-center items-center  pt-4">
            <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-full md:w-[576px] mx-auto p-1 sm:p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">
                    <div className="text-lg font-bold text-navy-700 dark:text-white">
                        History
                    </div>
                    {/* <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
                        See all
                    </button> */}
                </div>

                {
                  transactionhistory.map(data => (
                    <div key={data._id} className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700 gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-8 w-8 sm:h-16 sm:w-16 items-center justify-center">
                        <img
                            className="h-full w-full rounded-xl"
                            src={data.logo}
                            alt=""
                        />
                        </div>
                        <div className="flex flex-col">
                        <h5 className="text-xs md:text-base font-bold text-navy-700 dark:text-white">
                            {data.walletname}({data.walletId})
                        </h5>

                      <div className={` text-center my-1 border-none shadow-none rounded ${data.isVerify ? "bg-green-700" : "bg-[#d9512c]"}`}>
                      <p className=" text-xs sm:text-sm font-normal text-white">
                            {data.isVerify ? "Approved" : "Pending"}
                        </p>
                      </div>


                        </div>
                    </div> 

<div className='break-all'>
                    <div className="mt-1 flex items-center justify-end text-navy-700 dark:text-white">
                        <div>
                            {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg> */}
                            {data.isDeposit  ? <ArrowUpOutlined className='text-green-800 ' /> : <ArrowDownOutlined className='text-red-800' />}
                        </div>


                        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                        {/* <p> $  </p> */}
                        <p className="ml-1">${data.amount?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        </div>
                        {/* <div className='flex items-center'>
                            {data.isDeposit  ? <ArrowUpOutlined className='text-green-800 mr-3' /> : <ArrowDownOutlined className='text-red-800 mr-3' />}<span >$</span><span className={data.isDeposit  ? 'text-green-800 ml-1' : 'text-red-800 ml-1'}>${data.amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        </div> */}
                    </div>
                    <div className="ml-2 flex items-center justify-end text-sm font-normal text-gray-600 dark:text-white">
                        {/* <p>30s</p>
                        <p className="ml-1">ago</p> */}
                        <p>{moment(data.createdAt).fromNow()}</p>
                        </div>

</div>
                    
                </div>

                  ))
                }


               


                {/* <div className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
                    <div className="flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center">
                        <img
                            className="h-full w-full rounded-xl"
                            src="https://horizon-tailwind-react-corporate-7s21b54hb-horizon-ui.vercel.app/static/media/Nft6.9ff5403226e81a6fd390.png"
                            alt=""
                        />
                        </div>
                        <div className="flex flex-col">
                        <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            3D Cubes Art
                        </h5>
                        <p className="mt-1 text-sm font-normal text-gray-600">
                            Esthera Jackson
                        </p>
                        </div>
                    </div> 
                    <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                        <div>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                        </div>
                        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                        <p>   </p>
                        0.4<p className="ml-1">ETH</p>
                        </div>
                        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                        <p>30s</p>
                        <p className="ml-1">ago</p>
                        </div>
                    </div>
                </div>
                <div className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
                    <div className="flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center">
                        <img
                            className="h-full w-full rounded-xl"
                            src="https://horizon-tailwind-react-corporate-7s21b54hb-horizon-ui.vercel.app/static/media/Nft4.5fc37877b25c9fb9a52d.png"
                            alt=""
                        />
                        </div>
                        <div className="flex flex-col">
                        <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            Swipe Circles
                        </h5>
                        <p className="mt-1 text-sm font-normal text-gray-600">
                            Peter Will
                        </p>
                        </div>
                    </div> 
                    <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                        <div>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                        </div>
                        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                        <p>   </p>
                        0.4<p className="ml-1">ETH</p>
                        </div>
                        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                        <p>4h</p>
                        <p className="ml-1">ago</p>
                        </div>
                    </div>
                </div>
                <div className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
                    <div className="flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center">
                        <img
                            className="h-full w-full rounded-xl"
                            src="https://horizon-tailwind-react-corporate-7s21b54hb-horizon-ui.vercel.app/static/media/Nft3.3b3e6a4b3ada7618de6c.png"
                            alt=""
                        />
                        </div>
                        <div className="flex flex-col">
                        <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            Swipe Circles
                        </h5>
                        <p className="mt-1 text-sm font-normal text-gray-600">
                            Manny Gates
                        </p>
                        </div>
                    </div> 
                    <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                        <div>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                        </div>
                        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                        <p>   </p>
                        0.4<p className="ml-1">ETH</p>
                        </div>
                        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                        <p>30s</p>
                        <p className="ml-1">ago</p>
                        </div>
                    </div>
                </div>
                <div className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
                    <div className="flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center">
                        <img
                            className="h-full w-full rounded-xl"
                            src="https://horizon-tailwind-react-corporate-7s21b54hb-horizon-ui.vercel.app/static/media/Nft5.62dbaf7dd91b4180035c.png"
                            alt=""
                        />
                        </div>
                        <div className="flex flex-col">
                        <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            Mesh Gradients
                        </h5>
                        <p className="mt-1 text-sm font-normal text-gray-600">
                            Will Smith
                        </p>
                        </div>
                    </div> 

                    <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                        <div>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                        </div>
                        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                        <p>   </p>
                        0.4<p className="ml-1">ETH</p>
                        </div>
                        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                        <p>30s</p>
                        <p className="ml-1">ago</p>
                        </div>
                    </div>
                </div> */}


            </div>  
            {/* <p className="font-normal text-navy-700 mt-20 mx-auto w-max">Profile Card component from <a href="https://horizon-ui.com?ref=tailwindcomponents.com" target="_blank" className="text-brand-500 font-bold">Horizon UI Tailwind React</a></p>   */}
        </div>


          }




     
    </div>
  )
}

export default TransactionHistory
