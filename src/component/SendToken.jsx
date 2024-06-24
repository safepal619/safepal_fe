import React, { useEffect, useState } from 'react'

import { Alert } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BaseUrl } from '../../Root';
import Loader from './Loader';

const SendToken = () => {

  const {user} = useSelector((state) => state.user)
  const [crypto, setCrypto] = useState({})

  const [loading, setIsloading] = useState(true)


  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [Amountmessage, setAmountmessage] = useState("")

  const [amount, setAmount] = useState("")
  const [withdrawWalletAddress, setWithdrawWallet] = useState("")


  const [wallet, setWallet] = useState({
    name: "Bitcoin",
    id: "BTC",
    address: "bc1qlwutcrm8gts9ul7977p8gd8efesfq022rl7vt4",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024",
    amount: 0
  })

  const [showWallet, setShowWallet] = useState(false)


  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsError(false)
    setIsSuccess(false)

    // if (+data.Amount > +selectedCoin?.amount || +selectedCoin?.amount === 0 || selectedCoin?.amount === "0") {
    if (+amount === 0 || wallet.amount < amount) {
      setAmountmessage("Insufficient balance")
       return
     }
   

    const config = {
        headers: { Authorization: `Bearer ${user.token}` }
    };

    try {
       await axios.post(`${BaseUrl}/user/transaction/user/withdraw/${user._id}`, {
            walletname: wallet.name,
            amount,
            logo: wallet.logo,
            walletId: wallet.id,
            withdrawWalletAddress
        }, config)

        setIsError(false)
        setIsSuccess(true)
        
    } catch (error) {
      setIsSuccess(false)
      setIsError(true)
        
    }
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
       const config = {
         headers: { Authorization: `Bearer ${user.token}` }
     };
 
     try {
        const res = await axios.get(`${BaseUrl}/user/accountInformation/${user._id}`, config)
 
         // toast.success(res.data.message)
         // console.log(res.data)
         setCrypto(res?.data?.data.wallet)

         setWallet({
          name: "Bitcoin",
          id: "BTC",
          address: "bc1qlwutcrm8gts9ul7977p8gd8efesfq022rl7vt4",
          logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024",
          amount: res?.data?.data.wallet?.Bitcoin?.fiatbalance
        })
         setIsloading(false)
         
     } catch (error) {
         // toast.error("Failed try again.")
         // console.log(error)
     }
     })()
   },[])



   if(loading) {
    return <Loader />
   }


  return (
    <div className='flex flex-col gap-3 mt-8 w-full md:w-[576px] mx-auto'>
      {isSuccess && <Alert
        message="Successful"
        description="Withdrawal request successful."
        type="success"
        showIcon
        closable
        onClose={() => setIsSuccess(false)}
      />}
      {
        isError &&
        <Alert
          message="Error"
          description={isError ? "Withdrawal failed try again." : isError}
          type="error"
          showIcon
          closable
          onClose={() => setIsError(false)}
        />}

      <div className="flex flex-col justify-center items-center  pt-4">
        <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-full md:w-[576px] mx-auto p-1 sm:p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div className="flex items-center justify-center rounded-t-3xl p-3 w-full">
            <div className="text-lg font-bold text-navy-700 dark:text-white text-center">

              <h2 className='font-bold text-lg text-blue-950 '>Withdraw</h2>
            </div>

          </div>

          <form className='w-4/5 lg:w-1/2 mx-auto space-y-4' onSubmit={handleSubmit}>

            {/* drop down start*/}
            <div>
              <div className="w-full">
                <label htmlFor="select" className="font-semibold block py-2">Select Wallet:</label>

                <div className="relative">
                  <div onClick={() => setShowWallet(v => !v)} className="h-10 bg-white flex border border-gray-200 rounded items-center cursor-pointer">
                    <p name="select" id="select" className="px-4 appearance-none outline-none text-gray-800 w-full" > {wallet.name}</p>

                    <button type='button' className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600">
                      <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    <button type='button' >
                      <label htmlFor="show_more" className="cursor-pointer outline-none focus:outline-none  border-gray-200 transition-all text-gray-300 hover:text-gray-600">
                        <svg className={`w-4 h-4 mx-2 fill-current ${!showWallet ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      </label>

                    </button>
                  </div>



                  <input type="checkbox" name="show_more" id="show_moree" className="hidden peer" checked={showWallet} onChange={() => setShowWallet(v => !v)} />
                  <div className="absolute z-[100] rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">

                    <div className="cursor-pointer group" onClick={() => setWallet({
                      name: "Tether",
                      id: "TRC20 USDT",
                      address: "TTy84MGCuq5kKxqGhQeCPBg2nvxpK4AfgQ",
                      logo: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=024",
                      amount: crypto?.Tether?.fiatbalance
                    })}>
                      <button type='button' className={`w-full text-black  text-start block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100  ${wallet.id === "TRC20 USDT" ? "border-blue-950" : ""}`}>USDT</button>
                    </div>


                    <div className="cursor-pointer group border-t" onClick={() => setWallet({
                      name: "Bitcoin",
                      id: "BTC",
                      address: "bc1qlwutcrm8gts9ul7977p8gd8efesfq022rl7vt4",
                      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024",
                      amount: crypto?.Bitcoin?.fiatbalance
                    })}>

                      <button type='button' className={`w-full text-black text-start block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100 ${wallet.id === "BTC" ? "border-blue-950" : ""}`}>Bitcoin</button>
                    </div>



                    <div className="cursor-pointer group border-t" onClick={() => setWallet({
                      name: "Ethereum",
                      id: "ETH",
                      address: "0x11CbAb83E5f90BC682fE2b3FFe73eA56C8ED2B58",
                      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024",
                      amount: crypto?.Ethereum?.fiatbalance
                    })}>
                      <button type='button' className={`w-full text-black text-start block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100 ${wallet.id === "ETH" ? "border-blue-950" : ""}`}>Ethereum</button>
                    </div>

                    <div className="cursor-pointer group border-t" onClick={() => setWallet({
                      name: "Litecoin",
                      id: "LTC",
                      address: "ltc1qlm8hhpa900nh6v62y2gyswlsur763ry9n534a2",
                      logo: "https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=024",
                      amount: crypto?.Litecoin?.fiatbalance
                    })}>
                      <button type='button' className={`w-full text-black  text-start block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100 ${wallet.id === "LTC" ? "border-blue-950" : ""}`}>Litecoin</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* drop down end*/}


            <input className='border rounded-md p-2 w-full text-black' value={withdrawWalletAddress} onChange={(e) => setWithdrawWallet(e.target.value)} type="text" placeholder={`Enter ${wallet?.id} Address`} required />

            <input className='border rounded-md p-2 w-full text-black' value={amount} onChange={(e) => {
              setAmount(e.target.value)
              setAmountmessage("")
            }
            
            } type="number" placeholder="Amount in dollar" required />
            <p className='text-red-500 mb-2'>{Amountmessage}</p>



            <div className=''>
              
              <p className='text-end'>Available balance: <span className='text-green-500'><span className='text-black'>$ </span>{wallet.amount?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>
            </div>
            <div className="w-full sm:flex sm:items-center sm:gap-4 mb-5">
              <button
                type='submit'
                className="w-full shrink-0 rounded-md border border-blue-950 bg-blue-950 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              >
                Confirm
              </button>
            </div>
          </form>

        </div>
      </div>



    </div>
  )
}

export default SendToken;



