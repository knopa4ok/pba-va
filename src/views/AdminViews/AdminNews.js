import React, {useEffect, useState} from "react";
import {API_URL} from "../../CONSTANTS";

import shortid from 'shortid';
import {
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  Container,
  Row,
  Col, Table
} from "reactstrap";

import AdminNewsList from "./AdminNewsList";
import AdminNewsView from "./AdminNewsView";
import PageLoading from "../PageLoading";

export default function AdminNews({...props}) {

  const [news, setNews] = useState(null);
  const [content, setContent] = useState();

  useEffect(() =>{
    getNews()
  },[]);

  useEffect(() =>{
    if(news){
      if(!isNaN(props.props.location.pathname.split('/').pop()) ||
        props.props.location.pathname.split('/').pop() == 'new'){
        setContent(props.props.location.pathname.split('/').pop())}
      else{setContent('list');}
    }
  },[news]);

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
      if (result !== null) {
        var arr = [];
        Object.keys(result).map((key) =>{
          arr[result[key]['id']] = result[key]
        });
        setNews(arr);
      }
    })
  };

  const getNewsById = () =>{

  }

 if(!news)return <PageLoading/>
  return (
    <Container className="mt--7" fluid>
      <Card>
        <Row>
          <Col>
            {
              (!isNaN(content) || content == 'new')
                ? <AdminNewsView {...news} />
                : <AdminNewsList {...news} />
            }
          </Col>
        </Row>
      </Card>
    </Container>
  )
}
