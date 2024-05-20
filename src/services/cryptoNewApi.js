import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'




// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: '/',
//   headers: {

//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }

const cryptoNewsApiHeader = {
  'X-RapidAPI-Key': 'd88090b7eemsh101932b4b9c736bp1002c3jsna93727a75bbe',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
}




const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com/v1'

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeader })

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/cointelegraph`)
    }),
  })
})
// /news/search?q=${newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${count}

export const { useGetCryptoNewsQuery } = cryptoNewsApi


// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://bing-news-search1.p.rapidapi.com/news',
//   params: {
//     safeSearch: 'Off',
//     textFormat: 'Raw'
//   },
//   headers: {
//     'X-BingApis-SDK': 'true',
//     'X-RapidAPI-Key': 'd88090b7eemsh101932b4b9c736bp1002c3jsna93727a75bbe',
//     'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }

export const getNew = async () => {


  const options = {
    method: 'GET',
    url: 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk11',
    headers: {
      'X-RapidAPI-Key': '6b095a6cb0msh3aa35b265bfbceep153b26jsnda3bc0602589',
      'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
    }
  };

    await axios.request(options);
    // console.log(response.data);
    return response.data
  
}