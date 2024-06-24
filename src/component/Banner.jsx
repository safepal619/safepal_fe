
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

const Banner = ({messagecount , totalBalance}) => {
 
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {user} = useSelector((state) => state.user)

   queryClient.invalidateQueries({ queryKey: ['user'] })


  return (
    <div className='text-center py-10 space-y-3'>
      <h1 className='font-bold text-xl md:text-4xl'>${totalBalance ? totalBalance?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0:00"}</h1>
      <p>Multi coin wallet</p>

      <div className='flex text-white gap-3 justify-center h-10'>
      <button onClick={() => navigate("/sendtoken")} className=' bg-[#001529] text-center rounded min-w-14 sm:min-w-20'>Send</button>
      <button onClick={() => navigate("/recievetoken")}  className='bg-[#001529] text-center rounded min-w-14 sm:min-w-20'>Recieve</button>
      <button onClick={() => navigate("/chat/"+ user._id)} className=' bg-[#001529] text-center rounded min-w-14 sm:min-w-20'>{messagecount && messagecount > 0 && <span className='text-white bg-green-900 rounded-full p-1'>{messagecount}</span>} Chat</button>
      <button onClick={() => navigate("/history")} className=' bg-[#001529] text-center rounded min-w-14 sm:min-w-20'>History</button>
   
      </div>


    </div>
  )
}

export default Banner