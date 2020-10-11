import React from "react";
import Header from "../../components/Headers/Header";
import {Card, CardBody, CardHeader, CardTitle, Container, FormGroup} from "reactstrap";
import {matchPath} from "react-router-dom";
import FlightView from "../../components/FlightView/FlightView";
import {API_URL, hist} from "../../CONSTANTS";

export default function AdminFlightView({props}){

  const match = () => {return matchPath(hist.location.pathname, {path: '*/:layout/:id', exact: false, strict: false})};
  const handle_validate = () =>{
    const options = {
      method: 'PUT',
      body: JSON.stringify({'validated': 1}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL+"/flight/validate/"+match().params.id,options)
      .then(res => res.json())
      .then(response => {
        window.location.pathname = '/history'
      });
  };

  const handle_reject = () =>{
    const options = {
      method: 'PUT',
      body: JSON.stringify({'validated': -1}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL+"/flight/validate/"+match().params.id,options)
      .then(res => res.json())
      .then(response => {
        window.location.pathname = '/history'
      });
  };

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Card className="p-3">
          <CardBody>
            <button
              className={'btn btn-success px-5 py-1 mr-4'}
              style={{fontSize: '1.5em'}}
              onClick={handle_validate}>
              {
                localStorage.getItem('language') == 'ru'
                  ? 'Валидировать'
                  : 'Validate'
              }
            </button>
            {

            }
            <button className={'btn btn-warning'} onClick={handle_reject}>
              {
                localStorage.getItem('language') == 'ru'
                  ? 'Отклонить'
                  : 'Reject'
              }
            </button>
            {
              (match().params.id)? <FlightView id={match().params.id} {...props} /> : ''
            }
          </CardBody>
        </Card>
      </Container>
    </>
  )
}
