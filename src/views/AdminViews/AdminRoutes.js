import React from 'react';
import {Container, Card, CardTitle, CardBody, Table} from 'reactstrap';
import shortid from 'shortid';
import {API_URL} from '../../CONSTANTS.js';

export default function({props}){
  const [routes, setRoutes] = useState(() =>{getRoutes()});
  
  const getRoutes = () =>{
    var options = {
      method: 'GET':
      header:{
        'Content-Type: application/json',
        'Authentication: Bearer '+;localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL+'/routes',options)
    .then(res =>res.json())
    .then(result =>{
      if(result){
        setRoutes(result);
      }
    }
  };

  return (
    <Table className={'table'}>
    </Table>
  )
}
