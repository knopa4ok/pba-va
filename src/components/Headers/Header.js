/*!

Author: Konstantin Malinovski
email: malinovski.konstantin@gmail.com
*/
import React, {useEffect, useReducer} from "react";
import shortid from 'shortid';
import {API_URL} from "../../CONSTANTS";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import routes from "../../routes";

export default function Header({...props}) {
  const [state, dispatch] = useReducer(reducer, {});

  function reducer(state, action) {
    switch (action.type) {
      case 'setStatistics':
        var s = state;
        s.statistics = action.payload;
        return s;
        break;
      default:
        return state;
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  const getStatistics = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL + "/statistics", options)
      .then(res => res.json())
      .then(((result) => {
          if (result) {
            console.log('setStatistics');
            dispatch({type: 'setStatistics', payload: result})
          }
        }),
        (error) => {
        });
  };
                                
  const statsBlocks = () => {
    if (!state.statistics) return;
    return routes.map((prop, key) => {
      if (
        prop.path + prop.layout == window.location.pathname &&
        prop.statBar == 1
      ) {
        return (
          <Row key={shortid()}>
            <Col lg="6" xl="3" key={shortid()}>
              <Card className="card-stats mb-4 mb-xl-0 h-100" key={shortid()}>
                <CardBody key={shortid()}>
                  <Row key={shortid()}>
                    <div className="col" key={shortid()}>
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0" key={shortid()}
                      >
                        {localStorage.getItem("language") === "ru" ? "Активные пилоты:" : "Active pilots:"}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0" key={shortid()}>
                            {state.statistics.countPilots}
                          </span>
                    </div>
                    <Col className="col-auto" key={shortid()}>
                      <div className="icon icon-shape bg-primary text-white rounded-circle shadow" key={shortid()}>
                        <i className="fa fa-users" key={shortid()}/>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="3" key={shortid()}>
              <Card className="card-stats mb-4 mb-xl-0 h-100" key={shortid()}>
                <CardBody key={shortid()}>
                  <Row key={shortid()}>
                    <div className="col" key={shortid()}>
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0" key={shortid()}
                      >
                        {localStorage.getItem("language") === "ru" ? "Совершенных полётов:" : "Total flights:"}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0" key={shortid()}>
                            {state.statistics.countFlight}
                          </span>
                    </div>
                    <Col className="col-auto" key={shortid()}>
                      <div className="icon icon-shape bg-success text-white rounded-circle shadow" key={shortid()}>
                        <i className="fa fa-plane" key={shortid()}/>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="3" key={shortid()}>
              <Card className="card-stats mb-4 mb-xl-0 h-100" key={shortid()}>
                <CardBody key={shortid()}>
                  <Row key={shortid()}>
                    <div className="col" key={shortid()}>
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                        key={shortid()}
                      >
                        {localStorage.getItem("language") === "ru" ? "Налёт компании:" : "Total flights duration:"}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0" key={shortid()}>
                            {(state.statistics) ?
                              localStorage.getItem('language') === "ru" ? state.statistics.hoursSum + " часов" : state.statistics.hoursSum + " hours" : ""}

                          </span>
                    </div>
                    <Col className="col-auto" key={shortid()}>
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow" key={shortid()}>
                        <i className="fa fa-clock-o" key={shortid()}/>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="3" key={shortid()}>
              <Card className="card-stats mb-4 mb-xl-0 h-100" key={shortid()}>
                <CardBody key={shortid()}>
                  <Row key={shortid()}>
                    <div className="col" key={shortid()}>
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0" key={shortid()}
                      >
                        {localStorage.getItem("language") === "ru" ? "Забронированные полёты:" : "Booked flights:"}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0" key={shortid()}>
                            {state.statistics.countBooked}
                          </span>
                    </div>
                    <Col className="col-auto" key={shortid()}>
                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow" key={shortid()}>
                        <i className="fas fa-history" key={shortid()}/>
                      </div>
                    </Col>
                  </Row>
                  {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>*/}
                </CardBody>
              </Card>
            </Col>
          </Row>
        )
      }
    });
  };
  return (
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8" key={shortid()}>
        <Container fluid key={shortid()}>
          <div className="header-body" key={shortid()}>
            {/* Card stats */}
            {statsBlocks()}
          </div>
        </Container>
      </div>
  );
}

