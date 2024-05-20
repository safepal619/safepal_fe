import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeader={
  'X-RapidAPI-Key': '7d3fe17c69msh049c275c93b3332p1a3673jsn70feed33cb25',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'

}

const baseUrl='https://coinranking1.p.rapidapi.com'

const createRequest = (url) =>({url, headers:cryptoApiHeader})

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptoList: builder.query({
      query: (count)=>createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: (coinId)=>createRequest(`/coin/${coinId}`)
    }),
    getCryptoHistory: builder.query({
      query: ({coinId,timePeriod})=>createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
      
    }),
    getExchanges: builder.query({
      query: ()=>createRequest(`/exchanges`),
      
    }),
  })
})


export const {useGetCryptoListQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery,useGetExchangesQuery} = cryptoApi