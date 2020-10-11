import React, {useEffect, useState} from "react";
import {API_URL} from "../../../CONSTANTS";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Table,
  Row, TabPane,
} from "reactstrap";
// javascipt plugin for creating charts
import Chart from "chart.js";
// core components
import {
  chartOptions,
  parseOptions,
  randomRGBA
} from "variables/charts.js";

// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import shortid from 'shortid';

export default function ProfileInfo({...props}){

  var d = new Date();
  const[chartsData, setChartsData] = useState({labels: {rus: [], eng: []}, data:{flightCount: [], flightHours: [], flights: []}});
  const[activeTab, setActiveTab] = useState('ftab_'+ (new Date().getMonth()+1));

  useEffect(() =>{
    if(!props.pilot || !props.pilot.vid ) return;
    getChartsData();

  },[]);

  const getChartsData = () =>{
    fetch( API_URL+"/pilot/chart/" + props.pilot.vid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),
      }})
      .then(res =>res.json())
      .then((response => {setChartsData(response)}));
  };


  const pilotStatistic = {
    flightCount: {
      color: "",
      data: {},
      labels: []
    },
    flightHours: {},
    topPlanes: {},
    topAirport: {}
  }
  /*** CHARTS ***/

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  /*** КОЛИЧЕСТВО ПОЛЁТОВ ПО МЕСЯЦАМ ***/
  let flightCount = {
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function(value) {
                if (!(value % 10)) {
                  //return '$' + value + 'k'
                  return value;
                }
              }
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function(item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
              content += label;
            }
            content += yLabel;
            return content;
          }
        }
      }
    },
    data: {
      labels: (localStorage.getItem("language") == "ru")? chartsData.labels.rus : chartsData.labels.eng ,
      datasets: [
        {
          label: "Sales",
          data: chartsData.data.flightsCount,
          maxBarThickness: 10,
          backgroundColor: "rgba(117, 207, 254, 1)"
        }
      ]
    }
  };
  /*** НАЛЁТ ПО МЕСЯЦАМ ***/
  let flightHours = {
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function(value) {
                if (!(value % 10)) {
                  //return '$' + value + 'k'
                  return value;
                }
              }
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function(item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
              content += label;
            }
            content += yLabel;
            return content;
          }
        }
      }
    },
    data: {
      labels: (localStorage.getItem("language") == "ru")? chartsData.labels.rus : chartsData.labels.eng ,
      datasets: [
        {
          label: "Sales",
          data: chartsData.data.flightsHours,
          maxBarThickness: 10,
          backgroundColor: "rgba(56, 117, 254, 1)"
        }
      ]
    }
  };

  const toggleTabs = (e) =>{
    e.preventDefault();
    if(activeTab !== e.target.id) setActiveTab(e.target.id);
  }

  const flightTabs = (
    Object.entries(chartsData.data.flights).map((prop, key) => {
      return (
        <NavItem key={shortid()}>
          <NavLink
            id={'ftab_' + prop[0]}
            active={(activeTab == 'ftab_' + prop[0])}
            onClick={toggleTabs}
          >
            {
              localStorage.getItem('language') == 'ru'
              ? chartsData.labels.rus[11-(d.getMonth()+1 - prop[0])]
              : chartsData.labels.eng[11-(d.getMonth()+1 - prop[0])]
            }
          </NavLink>
        </NavItem>
      )}
  ));

  const flightTabContent = (
    Object.entries(chartsData.data.flights).map((prop, key) =>{
      return (
        <TabPane key={shortid()} tabId={'ftab_'+prop[0]} >
          <Table className='table table-hover table-responsive-md'>
            <thead>
            <tr>
              <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`, }}>{localStorage.getItem("language") == "ru"? 'Тип' : 'Type'}</th>
              <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Дата' : 'Date'}</th>
              <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Позывной' : 'Callsign'}</th>
              <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Тип ВС' : 'AC type'}</th>
              <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Маршрут' : 'Route'}</th>
            </tr>
            </thead>
            <tbody>
            {prop[1].map((p,k) =>{
              return (
              <tr key={shortid()} style={{cursor: 'pointer'}} onClick={() => {window.location.pathname = '/profile/flight/'+p.id}}>
              <td>{
                (p.charter == 1)
                  ?((localStorage.getItem('language') == 'ru')? 'Чартер' : 'Charter')
                  :((localStorage.getItem('language') == 'ru')? 'Полет ВА' : 'VA flight')
              }</td>
              <td>{p.date}</td>
              <td>{p.callsign}</td>
              <td>{p.fleet}</td>
              <td>{p.dep_icao + ' - ' + p.arr_icao}</td>
              </tr>
              )
            })}
            </tbody>
          </Table>
        </TabPane>
      )
    })
  );


  return (
    <>
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">{localStorage.getItem("language") == "ru" ? "Мой профиль" : "My profile"}</h3>
            </Col>
            <Col className="text-right" xs="4">
              {/* <Button
                color="primary"
                href="#pablo"
                onClick={e => e.preventDefault()}
                size="sm"
              >
                Settings
              </Button>*/}
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" md="6">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        {localStorage.getItem("language") == "ru" ? "Статистика" : "Statistics"}
                      </h6>
                      <h2 className="mb-0">
                        {
                          localStorage.getItem("language") == "ru" ? "Статистика количества полётов" : "Flight count statistic"
                        }
                      </h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={flightCount.data}
                      options={flightCount.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" md="6">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        {localStorage.getItem("language") == "ru" ? "Статистика" : "Statistics"}
                      </h6>
                      <h2 className="mb-0">
                        {
                          localStorage.getItem("language") == "ru" ? "Статистика налета по месяцам" : "Flight duration per month"
                        }
                      </h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={flightHours.data}
                      options={flightHours.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className='pt-3'>
            <Col xs='12'>
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h2 className="mb-0">
                    {
                      localStorage.getItem("language") == "ru" ? "Список полётов по месяцам" : "Flights list per month"
                    }
                  </h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs='12'>
                      <Nav tabs>
                        {(chartsData.labels)? flightTabs : ''}
                      </Nav>
                      <TabContent activeTab={activeTab}>
                          {(chartsData.data.flights)? flightTabContent : ''}
                      </TabContent>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}
