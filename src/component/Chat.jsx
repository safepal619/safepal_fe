import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getChat, getUser, setChatMutation } from '../services/request'

// import { io } from "socket.io-client";
// import { AdminBaseUrl } from '../../Root';

import { useQueryClient } from '@tanstack/react-query'



const Chat = () => {
  const {id} = useParams()
  const {user} = useSelector((state) => state.user)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
//   const [arrivalmessages, setAlrivalMessages] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const queryClient = useQueryClient()

  const scrollRef = useRef(null)



//   const socket = io(AdminBaseUrl)
//   socket.emit("add-user", user._id)


  

  const {data: userInfo} = getUser({token:user.token, userId: user.status === "User" ?  "664c99e8421f68f32ee5528c" : id?.toString()})

  const {data} = getChat({from: user._id, to: user.status === "User" ?  "664c99e8421f68f32ee5528c" : id?.toString(), status:user.status})
  const chat = setChatMutation()



//   useEffect(() => {
//     const el = document.getElementById('messages')
// 	el.scrollTop = el.scrollHeight
//   }, [])



  const handleSubmit = async() => {

   // if(!message) return
   // if(loading) return
   setLoading(true)

   try {
      // socket.emit("send-message", {from: user._id, to: user.status === "User" ?  "664c99e8421f68f32ee5528c" : id.toString(), message})
      
      const res = await chat.mutateAsync({from: user._id, to: user.status === "User" ?  "664c99e8421f68f32ee5528c" : id.toString(), message, status:user.status})
     
      if(res.data){
         let msgs = [...messages];
         msgs.unshift({fromSelf: true, message, avatar: user.avatar, _id: Math.random()})
         setMessages(msgs)
         setMessage("")
         queryClient.invalidateQueries({ queryKey: ['user'] })
      
         // scrollRef.current.scrollIntoView({ behavior: "smooth",  block: "end" });

      }

   } catch (error) {
      
   }finally {
      setLoading(false)
   }

  }


  useEffect(() => {
 
   queryClient.invalidateQueries({ queryKey: ['users'] })
setMessages(data?.data)
  }, [data?.data])


//   useEffect(() => {

//    if(scrollRef.current){
//       scrollRef.current.scrollIntoView({ behavior: "smooth",  block: "end" });
//    }



//   }, [messages?.length])

  return (
<div className="flex-1 p:2 sm:p-6 justify-betweenn flex flex-col h-screen">
   
      
{userInfo?.data &&  <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">

    <div className="relative flex items-center space-x-4">
         <div className="relative">
            <span className="absolute text-green-500 right-0 bottom-0">
               <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
               </svg>
            </span>
         <img src={userInfo.data.avatar} alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
         </div>
         <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
               <span className="text-gray-700 mr-3">{userInfo?.data?.username}</span>
            </div>
         </div>
      </div>
   </div>}

   
   <div id="messages" className="flex-1 border flex flex-col-reverse space-y-4 p-3 overflow-y-auto sscrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
     

{
 messages && messages.map(mes => {
   return(
      <div ref={scrollRef} className="chat-message my-1" key={mes._id}>
            <div className={`flex items-end ${mes.fromSelf ? "justify-end" : "justify-start"}`}>
               <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{mes.message}</span></div>
               </div>
               <img src={mes.avatar} alt="My profile" className="w-6 h-6 rounded-full order-1" />
            </div>
         </div>
    )
 })
}

 


   </div>
   <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">
        
         <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3" />
         <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
           

           {!loading && <button onClick={handleSubmit}  type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
               <span className="font-bold">Send</span>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg>
            </button>}

           {loading && <button  disabled={true} type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
               <span className="font-bold">loading</span>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg>
            </button>}

         </div>
      </div>
   </div>
</div>

  )
}

export default Chat

