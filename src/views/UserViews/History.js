import React,{useEffect, useState} from "react";
import Header from "../../components/Headers/Header";
import {Card,CardHeader,CardTitle,CardBody,Container, Table,} from "reactstrap";
import {API_URL} from "../../CONSTANTS";
import shortid from 'shortid';

export default function History({...props}){
  const [flights, setFlights] = useState(null);
  useEffect(() =>{getFlights()},[]);
  const getFlights = () => {
    fetch(API_URL + "/flight", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    })
      .then(res => res.json())
      .then((result => {
        if (result) {
          setFlights(result.reverse())
        }
      }))
  };
  const openValidation = (e) => {
    e.preventDefault();
    if (props.user.access == 1) {
      window.location.pathname = '/admin/flight/' + e.target.parentElement.id;
    }
  };

  function getStatus(id) {
    switch (id) {
      case 0:
        return localStorage.getItem('language') == 'ru' ? "Ожидает валидацию" : 'Pending validation';
        break;
      case 1:
        return localStorage.getItem('language') == 'ru' ? "Валидирован" : 'Validated';
        break;
      case 2:
        return localStorage.getItem('language') == 'ru' ? "Завалидирован(А)" : 'Validate(A)';
        break;
      case -1:
        return localStorage.getItem('language') == 'ru' ? "Отклонен" : 'Rejected';
        break;
    }
  }

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Card className="p-3">
          <CardHeader>
            <CardTitle tag={'h2'}>
              {
                localStorage.getItem('language') == 'ru'
                ? 'История полётов'
                : 'Flights history'
              }
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Table className={'table-hover table-responsive-md'}>
              <thead>
              <tr className=''>
                <th scope='col' style={{fontSize: `1.2em`}}>VID</th>
                <th scope='col' style={{fontSize: `1.2em`}}>
                  {localStorage.getItem('language') == 'ru' ? 'Позывной' : 'Callsign'}</th>
                <th scope='col' style={{fontSize: `1.2em`}}>
                  {localStorage.getItem('language') == 'ru' ? 'Тип ВС' : 'AC type'}</th>
                <th scope='col' style={{fontSize: `1.2em`}}>
                  {localStorage.getItem('language') == 'ru' ? 'Маршрут' : 'Route'}</th>
                <th scope='col' style={{fontSize: `1.2em`}}>
                  {localStorage.getItem('language') == 'ru' ? 'Длительность' : 'Duration'}</th>
                <th scope='col' style={{fontSize: `1.2em`}}>
                  {localStorage.getItem('language') == 'ru' ? 'Статус' : 'Status'}</th>
              </tr>
              </thead>
              <tbody>
              {
                (flights)
                ?flights.map((prop,key) =>{
                    if(key > 20)return;
                    if(prop.ended = 0)return;
                  return (
                    <tr key={shortid()} id={prop.id} onClick={openValidation}>
                      <td>{prop.vid}</td>
                      <td>{prop.callsign}</td>
                      <td>{prop.fleet}</td>
                      <td>{prop.dep_icao} - {prop.arr_icao}</td>
                      <td>{prop.duration}</td>
                      <td>{getStatus(prop.validated)
                      }
                      </td>
                    </tr>
                  )
                  })
                :null
              }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
