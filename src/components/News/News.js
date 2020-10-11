import React, {useEffect, useState} from 'react';
import shortid from 'shortid';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import {API_URL} from "../../CONSTANTS";

export default function News({...props}){

  const [news, setNews] = useState(null);
  const newsCountOnMain = 3;

  useEffect( () =>{
     getNews();
  },[]);

  const getNews = () =>{
    fetch(API_URL + "/news", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    })
      .then(res => res.json())
      .then((result) => {
        if (result) {
          setNews(result);
        }
      })
  };

const NewsCard = () => {
  if(!news)return;
  return news.map((prop, key) => {
    if(key > newsCountOnMain-1)return true;
    return (
      <Col xs={12} md={12} lg={4} className={'mt-2'}  key={shortid()}>
        <Card className={'h-100'}>
          <CardHeader>
            <CardTitle tag={'h2'} className={'text-center'} style={{color: '#1171ef'}}>
              {
                localStorage.getItem('language') == "ru"
                ? prop.heading_ru
                : prop.heading_en
              }
            </CardTitle>
          </CardHeader>
          <CardBody>
            {
              localStorage.getItem('language') == "ru"
                ? prop.body_ru.substr(0, )
                : prop.body_en
            }
          </CardBody>
        </Card>
      </Col>
    )
  })
}

  return (
    <Row>
      {(news)? NewsCard() : ''}
    </Row>
  )
}
