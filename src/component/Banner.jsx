
import { useNavigate } from 'react-router-dom'


const Banner = ({totalBalance}) => {
 
  const navigate = useNavigate()



 


  return (
    <div className='text-center py-10 space-y-3'>
      <h1 className='font-bold text-xl md:text-4xl'>${totalBalance ? totalBalance?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0:00"}</h1>
      <p>Multi coin wallet</p>

      <div className='flex text-white gap-3 justify-center h-10'>
      <button onClick={() => navigate("/sendtoken")} className=' bg-[#001529] text-center rounded min-w-14 sm:min-w-20'>Send</button>
      <button onClick={() => navigate("/recievetoken")}  className='bg-[#001529] text-center rounded min-w-14 sm:min-w-20'>Recieve</button>
      <button onClick={() => navigate("/chat")} className=' bg-[#001529] text-center rounded min-w-14 sm:min-w-20'>Chat</button>
      <button onClick={() => navigate("/history")} className=' bg-[#001529] text-center rounded min-w-14 sm:min-w-20'>History</button>
   
      </div>


    </div>
  )
}

export default Banner