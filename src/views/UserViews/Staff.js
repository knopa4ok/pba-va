/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";
import shortid from 'shortid';
import {API_URL} from "../../CONSTANTS";
// reactstrap components
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";


import Header from "components/Headers/Header.js";

export default function Staff({...props}){

    const[staff, setStaff] = useState([]);

    useEffect(() =>{
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(API_URL+"/staff",options)
            .then(res =>res.json())
            .then(json => {setStaff(json)})
    },[])

  const staffList =(
        staff.map((prop, key) => {
            return (
            <Col lg={'4'} md={"6"} sm={"12"} key={shortid()} className={"my-3"}>
                <Card style={{maxHeight: '17em', height: '100%'}}>
                    <Row>
                        <Col xs="2" key={shortid()}>
                            <CardImg>

                            </CardImg>
                        </Col>
                        <Col size={"10"}>
                            <CardTitle tag={"h2"} className={"text-left pt-2 pl-4"}>{prop.fullusername} ({prop.vid})</CardTitle>
                            <CardBody>
                                {prop.position}
                                <p><i className={"fa fa-at"}></i> {prop.email}</p>

                            </CardBody>
                        </Col>
                    </Row>
                </Card>
            </Col>
            )
        })
  )

  return (
      <>
        <Header />
        {/* Page content */}

        <Container className="mt--7" fluid>
            <Row>
            {
                staffList
            }
            </Row>
        </Container>
      </>
  );
}
