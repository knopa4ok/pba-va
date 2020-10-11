import React,{useEffect, useState} from "react";
import shortid from 'shortid';
import {Row, Col, Card, CardHeader, CardTitle, CardBody, Table} from "reactstrap";
import {Map as LeafletMap, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import {API_URL} from "../../CONSTANTS";
import PageLoading from "../../views/PageLoading";


export default function Flightview({...props}){

  const [flight, setFlight] = useState(false);
  const [selectedPoint, selectPoint] = useState([0,0]);
  const [zoom, setZoom] = useState(6);


  useEffect(() => {
    var options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),
      }};
    fetch( API_URL+"/flight/"+props.id, options)
      .then(res =>res.json())
      .then(response => {
        setFlight(response);
        if(!response || response.records.length == 0)return;
        selectPoint([response.records[0].lat, response.records[0].lon])
        setZoom(10);
      })
  },[]);

  const dotIcon =  new L.icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Zz4KPGltYWdlIHdpZHRoPSI3IiBoZWlnaHQ9IjciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMS4xNjQgNjQuMzgzKSBzY2FsZSgwLjI0KSIgb3BhY2l0eT0iMC43NSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBtdWx0aXBseTsiPjwvaW1hZ2U+CjxjaXJjbGUgY3g9IjciIGN5PSI3IiByPSI3IiBmaWxsPSIjMDBiNmVkIj48L2NpcmNsZT4KPC9nPgo8L3N2Zz4=',
    iconSize: [20,20],
    iconAnchor: [5,5]
  });
  const polyline = () => {
    if (!flight) return;
    var pol = [];
    flight.records.map((prop) => {
      pol.push([prop.lat, prop.lon]);
    });
    return pol;
  };

  const markers = (
    (!flight)? '' :
    flight.records.reverse().map((prop) =>{
      return (
        <Marker position={[prop.lat, prop.lon]} icon={dotIcon} key={shortid()} >
          <Popup>
            {
              localStorage.getItem('language') == 'ru'
              ? 'Высота: '
              : 'Altitude: '
            }
            {prop.alt}<br />
            {
              localStorage.getItem('language') == 'ru'
                ? 'Скорость: '
                : 'Speed: '
            }
            {prop.gs}kn <br />
            {
              localStorage.getItem('language') == 'ru'
                ? 'Время: '
                : 'Time: '
            }
            {prop.rec_time}<br />

          </Popup>
        </Marker>
        )
    })
  );

  if(!flight)return <PageLoading />;
  return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <CardTitle tag={'h1'}>
            {
              localStorage.getItem('language') == 'ru'?
                'Трекер полёта номер ' :
                'Tracker for flight nr '
            }
            {props.id}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs='12' md='6'>
             <Table className={'table-hover table-responsive w-100'}>
               <thead>
                <tr className={'bordered'}>
                  <th scope={"col"} style={{fontSize: `1.1rem`}}>
                    {localStorage.getItem('language') == 'ru'? 'Дата' : 'Time'}
                  </th>
                  <th scope={"col"} style={{fontSize: `1.1rem`}}>
                    {localStorage.getItem('language') == 'ru'? 'Широта' : 'Latitude'}
                  </th>
                  <th scope={"col"} style={{fontSize: `1.1rem`}}>
                    {localStorage.getItem('language') == 'ru'? 'Долгота' : 'Longitude'}
                  </th>
                  <th scope={"col"} style={{fontSize: `1.1rem`}}>
                    {localStorage.getItem('language') == 'ru'? 'Высота' : 'Altitude'}
                  </th>
                  <th scope={"col"} style={{fontSize: `1.1rem`}}>
                    {localStorage.getItem('language') == 'ru'? 'Скорость' : 'GS'}
                  </th>
                </tr>
               </thead>
               <tbody>
               {
                 flight.records.map((prop) =>{
                   return (
                     <tr key={shortid()} onClick={(e) => selectPoint([prop.lat, prop.lon])} >
                       <td>{prop.rec_time}</td>
                       <td>{prop.lat}</td>
                       <td>{prop.lon}</td>
                       <td>{prop.alt}</td>
                       <td>{prop.gs}</td>
                     </tr>
                   )
                 })
               }
               </tbody>
             </Table>
            </Col>
            <Col xs='12' md='6'>
              <LeafletMap
                style={{width: '100%', minHeight: '60em', height: '100%', maxHeight: window.innerHeight}}
                center={selectedPoint}
                zoom={6}
                maxZoom={15}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
              >
                <TileLayer
                  url='https://api.maptiler.com/maps/voyager/256/{z}/{x}/{y}.png?key=mcvUo2p4sJvImSaZWF9e'
                />
                {(flight)? markers : null}
                <Polyline positions={polyline()} />
              </LeafletMap>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
}
