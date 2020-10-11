import React,{useState, useEffect} from "react";
import {Card, CardHeader, CardBody, Container, Table} from "reactstrap";

import Header from "../../components/Headers/Header";
import {API_URL} from "../../CONSTANTS";
import {Map as LeafletMap, Marker, Polyline, Popup, TileLayer, GeoJSON} from "react-leaflet";
import shortid from "shortid";
import L from "leaflet";
import PageLoading from "../PageLoading";

export default function Routes({...props}){
  const [routes, setRoutes] = useState(null);
  const [airport, setAirport] = useState('UUWW');

  // eslint-disable-next-line
  useEffect(() =>{getRoutes()},[]);

  const getRoutes = () =>{
    var options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL + "/routes",options)
      .then(res => res.json())
      .then(result =>{
        if(result)setRoutes(result)
      });
  };

  const dotIcon =  new L.icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Zz4KPGltYWdlIHdpZHRoPSI3IiBoZWlnaHQ9IjciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMS4xNjQgNjQuMzgzKSBzY2FsZSgwLjI0KSIgb3BhY2l0eT0iMC43NSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBtdWx0aXBseTsiPjwvaW1hZ2U+CjxjaXJjbGUgY3g9IjciIGN5PSI3IiByPSI3IiBmaWxsPSIjMDBiNmVkIj48L2NpcmNsZT4KPC9nPgo8L3N2Zz4=',
    iconSize: [20,20],
    iconAnchor: [5,5]
  });
  const getMarkers = () =>{
    if(!routes)return;
    var markers = [];
    var airports = [];
    routes.map((prop, key) =>{
      if(airports.indexOf(prop.dep_icao) < 0){
        airports.push(prop.dep_icao);
        markers.push(
          <Marker position={[prop.dep_location[0], prop.dep_location[1]]} icon={dotIcon} key={shortid()} onClick={() =>setAirport(prop.dep_icao)}>
            <Popup>
              {prop.dep_name}
            </Popup>
          </Marker>
        )
      }
    });
    return markers;
  };
  const getPolylines = () =>{
    if(!routes)return true;
    var polylines = [];
    var popups = [];
    var airports = [];
    routes.map((prop,key) =>{
      if(airports.indexOf(prop.dep_icao) < 0 && prop.dep_icao == airport) {
        polylines.push(
          <Polyline
            key={shortid()}
            positions={[[prop.dep_location[0], prop.dep_location[1]], [prop.arr_location[0], prop.arr_location[1]]]} >
            <Popup>
            {prop.identifier}
            </Popup>
          </Polyline>
        );
      }
    });
    return polylines;
  };
  const getTbody = () =>{
    if(routes){
      var arr = [];
      var dep = [];
      var trs = [];
      routes.map((prop, key) =>{
        if(prop.dep_icao == airport){dep.push({name: prop.arr_icao, ident: prop.identifier})}
        if(prop.arr_icao == airport){arr.push({name: prop.dep_icao, ident: prop.identifier})}
      });
      var c = (dep.length > arr.length)? dep.length : arr.length;
      for(var n = 0; n < c ; n++){
        trs[n] = (
          <tr key={shortid()}>
            <td>{(dep[n])? dep[n]['ident'] : ''}</td>
            <td>{(dep[n])? dep[n]['name'] : ''}</td>
            <td>{(arr[n])? arr[n]['ident'] : ''}</td>
            <td>{(arr[n])? arr[n]['name'] : ''}</td>
          </tr>
        )
      }
    }
    return trs;
  };

  if(!routes)return <PageLoading />;
  return (
    <>
      {<Header />}
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Card className="p-3">
          <CardHeader tag={'h2'}>
              {
                localStorage.getItem('language') == 'ru'
                ? 'Маршруты компании' : 'Aircompany routes'
              }
          </CardHeader>
          <CardBody>
            <Table className={'table-responsive-sm text-center'}>
              <thead>
              <tr>
                <th scope='col' colSpan={'2'} style={{fontSize: 'calc(0.8em + .3vw)',fontWeight: '700'}}>
                  {localStorage.getItem('language') == 'ru' ? 'Вылет' : 'Departure'}
                </th>
                <th scope='col'colSpan={'2'} style={{fontSize: 'calc(0.8em + .3vw)',fontWeight: '700'}}>
                  {localStorage.getItem('language') == 'ru' ? 'Прилёт' : 'Arrival'}
                </th>
              </tr>
              <tr>
                <th scope='col'style={{fontSize: 'calc(0.6em + .4vw)',fontWeight: '700'}}>
                  {localStorage.getItem('language') == 'ru' ? 'Номер рейса' : 'Flight nr.'}
                </th>
                <th scope='col'style={{fontSize: 'calc(0.6em + .4vw)',fontWeight: '700'}}>
                  {localStorage.getItem('language') == 'ru' ? 'Куда' : 'To'}
                </th>
                <th scope='col'style={{fontSize: 'calc(0.6em + .4vw)',fontWeight: '700'}}>
                  {localStorage.getItem('language') == 'ru' ? 'Номер рейса' : 'Flight nr.'}
                </th>
                <th scope='col'style={{fontSize: 'calc(0.6em + .4vw)',fontWeight: '700'}}>
                  {localStorage.getItem('language') == 'ru' ? 'Откуда' : 'From'}
                </th>
              </tr>
              </thead>
              <tbody>
              {getTbody()}
              </tbody>
            </Table>
            <LeafletMap
              style={{width: '100%', minHeight: '40em', height: '100%'}}
              center={[55.5992,37.2731]}
              zoom={6}
              maxZoom={10}
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
              {getMarkers()}
              {getPolylines()}
            </LeafletMap>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}
