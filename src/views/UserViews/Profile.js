import React, {useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Container, Row} from "reactstrap";
import {matchPath} from "react-router-dom";
import {hist} from "../../CONSTANTS";

import Header from "../../components/Headers/Header";
import ProfileInfo from "./Profile/Info";
import ProfileBooking from "./Profile/Booking";
import FlightView from "../../components/FlightView/FlightView";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import Admin from "../../layouts/Admin";

export default function Profile({...props}){
  const[info, setInfo] = useState(props.pilot);
  const[contentLink, setContent] = useState(hist.location.pathname);

  const match = () => {return matchPath(contentLink, {path: '*/:layout/:id', exact: false, strict: false})};

  const switchContent = (e) =>{
    e.preventDefault();
    switch (isNaN(match().params.id)? match().params.id : match().params.layout) {
      case 'booking':
        hist.replace('/profile/info');
        break;
      case 'info':
      default:
        hist.replace('/profile/booking');
        break;
    }
    setContent(hist.location.pathname);
  };

  const content = () => {
    switch (isNaN(match().params.id)? match().params.id : match().params.layout) {
      case 'flight':
        return <FlightView id={match().params.id} {...props} />
        break;
      case 'booking':
        return <ProfileBooking pilot={props.pilot}{...props}/>
        break;
      case 'info':
      default:
        return <ProfileInfo pilot={props.pilot}{...props}/>
        break;
    }
  };
  return (
    <>
        {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../anime3.png")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  {(props.pilot)?
                  <Button
                    className="mr-4"
                    color="info"
                    href=""
                    onClick={e =>switchContent(e)}
                    size="sm"
                  >
                    {localStorage.getItem("language") == "ru"? "Забронировать" : "Book flight"}
                  </Button>
                    : null}
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">
                          {
                            (info && info.flights_count)? info.flights_count : ""
                          }
                        </span>
                        <span className="description">
                          {localStorage.getItem("language") == "ru" ? "Число полётов" : "Flights count"}
                        </span>
                      </div>
                      <div>
                        <span className="heading">
                          {
                          (info && info.flight_hours)? info.flight_hours : ""
                        }
                        </span>
                        <span className="description">
                          {localStorage.getItem("language") == "ru" ? "Налёт часов" : "Total hours"}
                        </span>
                      </div>
                      <div>
                        <span className="heading">
                          {
                            (info && info.pilot_rank)? info.pilot_rank : ""
                          }
                        </span>
                        <span className="description">
                          {localStorage.getItem("language") == "ru" ? "Звание" : "Rank"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {(info)? info.fullusername : props.user.fullusername}
                    <span className="font-weight-light"></span>
                  </h3>

                  {(props.pilot)?
                    <h5>{props.pilot.staff_name}
                      <span className="font-weight-light"></span>
                    </h5>: ''}

                  <div className="h3 font-weight-700">
                    <i className="ni location_pin mr-2" />
                    {
                      (info && info.callsign)? info.callsign : ""
                    }
                  </div>
                  <hr className="my-4" />
                  <div className="h3 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {
                      localStorage.getItem("language") == "ru"? "Текущее местоположение: " : "Current location:"
                    }
                  </div>
                  <div>
                    {
                      (info && info.pilot_location_icao)? info.pilot_location_name + " (" + info.pilot_location_icao + ")" : ""
                    }
                    <i className="ni education_hat mr-2" />
                  </div>
                  <hr className="my-4" />
                </div>
              </CardBody>
            </Card>
            { props.user.access == 1? <AdminNavbar {...props} /> : true }
          </Col>
          <Col className="order-xl-1" xl="8">
            {content()}
          </Col>
        </Row>
    </Container>
    </>
  )
}
