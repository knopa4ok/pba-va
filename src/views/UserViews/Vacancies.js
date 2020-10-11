
import React from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Container,
} from "reactstrap";


import Header from "components/Headers/Header.js";

export default function Vacancies({props}){

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Card className="p-3">
          <CardHeader>
            <CardTitle tag='h2'>
              {
                localStorage.getItem('language') == 'ru'
                ? 'Вакансии' : 'Vacancies'
              }
            </CardTitle>
          </CardHeader>
          <CardBody></CardBody>
        </Card>
      </Container>
    </>
  )
}
