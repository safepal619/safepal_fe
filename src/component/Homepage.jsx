import React, { useEffect, useState } from 'react'
import millify from 'millify'
import Loader from './Loader'

import { Banner, CryptoList, Cryptocurrencies, News } from '../component'

import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptoListQuery } from '../services/cryptoApi'
import { useSelector } from 'react-redux'
const { Title } = Typography

const Homepage = () => {
  const { data, isFetching, } = useGetCryptoListQuery(10)
  const { isNews, isAuthenticated } = useSelector((state) => state.user)
  const globalStats = data?.data?.stats


  if (!isAuthenticated && isFetching) return <Loader />


  return (
    <>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title='Total Crytocurrencies' value={globalStats.total} /> </Col>
        <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} /> </Col>
        <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)} /> </Col>
        <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)} /> </Col>
        <Col span={12}><Statistic title='Total Markets' value={millify(globalStats.totalMarkets)} /> </Col>

      </Row>



      <div className='home-heading-container'>
        <Title level={2} className='home-title text-x'>Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified />


      {/* {!isNews && <>
        <div className='home-heading-container'>
          <Title level={2} className='home-title'>Latests Crypto News</Title>
          <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
        </div>
        <News simplified />
      </>} */}



    </>
  )
}

export default Homepage
