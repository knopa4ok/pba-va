
import React, {useState, useEffect} from "react";
import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser from 'react-html-parser';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";


import Header from "components/Headers/Header.js";
import {API_URL} from "../../CONSTANTS";

export default function HomePage({ ...props }){

  const [rules, setRules] = useState('');

  useEffect(() =>{getRules()},[]);

  const getRules = () =>{
    var options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL + "/articles/1", options, {
    })
      .then(res => res.json())
      .then((result) => {
        setRules(result);
      });
  };

  return (
      <>
        {<Header />}
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Card className="p-3">
            <CardHeader>
              <CardTitle tag={'h1'}>
                {
                  localStorage.getItem('language') == 'ru'
                  ? 'Устав виртуальной авиакомпании ПОБЕДА'
                  : 'Rules of POBEDA virtual aircompany'
                }
              </CardTitle>
            </CardHeader>
            <CardBody>
              {
                (rules)
                  ? localStorage.getItem('language') == 'ru'
                  ? ReactHtmlParser(draftToHtml(JSON.parse(rules.text_ru)))
                  : ReactHtmlParser(draftToHtml(JSON.parse(rules.text_en)))
                  : ''
              }
           </CardBody>
          </Card>
        </Container>
      </>
  );
}
