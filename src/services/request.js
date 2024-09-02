import axios from "axios";
import {  BaseUrl} from "../../Root";
import { useMutation, useQuery } from '@tanstack/react-query'


// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: BaseUrl,
    withCredentials: true

  });

  // const AUTH_TOKEN = ""
  
  // Alter defaults after instance has been created
  // instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


//   const config = {
//     headers: { Authorization: `Bearer ${user.token}` }
// };

  //  const res = await axios.get(`${BaseUrl}/user/accountInformation/${user._id}`, config)

  const queryAllUsers = async({ queryKey }) => {
    const [_key, { token }] = queryKey

    let config = {
          headers: { Authorization: `Bearer ${token}` }
      };
const res = await instance.get("/user/allUser", config)
return res.data
  }

  // `/user/transaction/user/${user._id}`,
  const queryTransaction = async({ queryKey }) => {
    const [_key, { token , userId}] = queryKey

    let config = {
          headers: { Authorization: `Bearer ${token}` }
      };
const res = await instance.get(`/user/transaction/user/${userId}`, config)
return res.data
  }



  const queryUser = async({ queryKey }) => {
    const [_key, { token , userId}] = queryKey

    let config = {
          headers: { Authorization: `Bearer ${token}` }
      };
const res = await instance.get("/user/accountInformation/" + userId, config)
return res.data
  }

  const queryTransactions = async({ queryKey }) => {
const res = await instance.get("/user/transactions")
return res.data
  }

  const queryNotifications = async({ queryKey }) => {
const res = await instance.get("/user/notifications")
return res.data
  }


export const getAllUsers = ({token}) => useQuery({ queryKey: ['users', {token}], queryFn: queryAllUsers })



export const getUser = ({token, userId}) => useQuery({ queryKey: ['user', {token, userId}], queryFn: queryUser })

export const getTransaction = ({token, userId}) => useQuery({ queryKey: ['transaction', {token, userId}], queryFn: queryTransaction })
export const getTransactions = () => useQuery({ queryKey: ['transactions'], queryFn: queryTransactions })




export const getNotifications = () => useQuery({ queryKey: ['notifications'], queryFn: queryNotifications })


const queryChat = async({ queryKey }) => {
  const [_key, { from, to, status}] = queryKey

  // let config = {
  //       headers: { Authorization: `Bearer ${token}` }
  //   };
const res = await instance.get("/message/" + from + "/" + to + "/" + status)
return res.data
}

export const getChat = ({from, to, status}) => useQuery({ queryKey: ['chat', {from, to, status}], queryFn: queryChat })


export const verifyNotificationsmutation = () => useMutation({
  mutationFn: () => {
    return instance.post('/user/create-notifications')
  },
})

export const rejectTransationmutation = () => useMutation({
  mutationFn: (txnId) => {
    return instance.patch('/user/reject-transaction', {txnId})
  },
})

export const verifyTransationmutation = () => useMutation({
  mutationFn: ({userId, txnId}) => {
    return instance.patch('/user/verify-transaction', {txnId, userId})
  },
})

export const setChatMutation = () => useMutation({
  mutationFn: ({from, to, message,status}) => {
    return instance.post('/message', {from, to, message, status})
  },
})




