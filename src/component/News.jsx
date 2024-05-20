import React, { useEffect, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card, Empty } from "antd";
import moment from "moment";
import Loader from "./Loader";

import {
  getNew,
  // useGetCryptoNewsQuery,
} from "../services/cryptoNewApi";

import { useGetCryptoListQuery } from "../services/cryptoApi"
import { useDispatch } from "react-redux";
import { setNews } from "../services/userSlice";


const { Title, Text } = Typography;
const { Option } = Select;

const demoImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEVKIe////88AO7Kv/pDEu/Z0fxGGu9IHu+2qfhACu/e1vyqmfdNI++xofi1pvisnPfVzftPKO9pSPKhkfa+tPjSyPvh2vx/aPPk3/z49/7Mwvrv6/6aiPWTgPXs6P2OevSZhfaJLhvkAAADkElEQVR4nO2dCVLjMBBFJUeWIhMgISsQBu5/ypnMDEXwVmXcG+K/G7ySf3+EG+McAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADCxJADEdoqfaRQPWx3+5qEwzFq+3QI7nzyZNxmbZ82KR8J/fx9TtpGbfI9oZ9BwVTdUgreVOYE8x2toLZQmxSWlIL39gQzraC5DLqK9BG1J1j+kCk+g8SC5h5RVxUuWH4GUfSTMDhkUPTfXLD8IVN8BlH031yw/Ayi6CdhcMig6L+5YPlDpvgM/ryif2wWX+ZpG6wJdjL46zVWMzD3irBT9HU0dwiz6GTwOdp7hzmHbtGfzb3DnEen6B9jWY9ot+gbc102h74eXJRk2Fv0RRn23ujnGyYrQR74YXu2YXjb2KiboRv9bMNqf1hZUBz8YXu+4cI3Tl9x+EZPYehr/VMcvtGTGPq1suLYjZ7G0NeqD+rohZfI0Deapzh6o6cy9E1SUwxvI4J0hn6t1ovVs4yhXyudYngZE6Q01Mpi3okZKlV/WMsZ6lR/qAUNVao/L4bkOAw1qj9sRQ0Vxk3ayBoqVP/4y3p6Q/nqT6OzhsFQvvpjGikMDkP5LMbNsCKLoXz1x9TIGspXf1wNKTIZyld/dAPjhstQvvrjqj+LbIYK42bVe4p8hvLVH11fFhkN5au/d9xwGtqoflZDX0uvCPRUP6+hX0q/vOtWP7Oh30i/e+tkkdtwK75u065+bsOF/KpHq/q5DWuFlanP1c9tuNZYCvtU/dyGO5WFpOtxw234orPYd1X9zIbPWsssH9XPbKh0hO6q+nkNl4rLp+9ZZDVcqm6u/q9+TsNb5RX+f9XPaHinvjL3t/r5DJcGVvgv1c9mqJvBd+LqsGcyvDNwghfi5m3uPO831B4yH8xfDu01FL/ac9JnaCODVPQYliXoqs6vKO1kkIQUH9tTtKQM/iGf24+okZqgIsbW1lxhGUw5tl73WCn6K8KcPz2Mr60TtDdkUtg+ff3PR5v2kLFX9In2U5cGM1gVLpiqG0pBgxmkfUTtFT11Bu3VROkZdLQZtFf0GDLTQNHLU/qQQQangaKXp/QMouinUfyQQdHLU/qQQQangaKXp/QMouinUfyQMfgtT1LB09HcI+oy4edmT2dn7lOXLh4PNP8Gb7/bPlT2hugFqn9lmIP616AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwM/jN20+O3P9m7QoAAAAAElFTkSuQmCC';



const News = ({ simplified }) => {
  const dispatch = useDispatch()

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const [cryptoNews, setCryptoNews] = useState(null)

  // const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12, });

  const { data } = useGetCryptoListQuery(100)



useEffect(() => {
  (async()=> {
    try {
      const response = await getNew()
      if(response){
        setCryptoNews(response)
        dispatch(setNews(true))
      }
    } catch (error) {
      dispatch(setNews(false))
    }
   
  })()
},[])



  if (!cryptoNews) return <Loader />;
  // if (!data) return <Loader />;



  const count = simplified ? 6 : undefined

  const filteredNews = cryptoNews?.data?.filter(news => {
    if (newsCategory === "Cryptocurrency") {
      return news
    } else {
      return news.title.includes(newsCategory)
    }
  })

  // console.log(filteredNews)

  return (
    <Row gutter={[24, 24]}>
      {!count && <Title >Top Latest Crypto News</Title>}

      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder='select a Crypto'
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) > 0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => <Option key={coin.name} value={coin.name}>{coin.name}</Option>)}



          </Select>
        </Col>
      )}
      {cryptoNews && filteredNews?.slice(0, count).map((news, i) => (

        <Col xs={24} sm={12} lg={8} key={i}>


          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title " level={5}>
                  {news.title}
                </Title>
                <img src={news?.thumbnail || demoImage} alt="news"
                  style={{ maxWidth: '200px', height: '100px' }} />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>

                  <Avatar src={demoImage} alt="news" />
                  <Text className="provider-name">Safepal</Text>
                </div>
                <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
              </div>



            </a>
          </Card>


        </Col>



      ))}


      {filteredNews?.length === 0 && <div className="empty_container">

        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>}


    </Row>
  );
};

export default News;


