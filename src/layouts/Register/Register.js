import React from 'react';
import {Col, Container, Row} from "reactstrap";
import {Redirect, Route, Switch} from "react-router-dom";
import routes from "../../routes";

import RegisterNavbar from "../../components/Navbars/RegisterNavbar.js";

export default function Register(){
  const getRoutes = (
    routes.map((prop, key) => {
      if (prop.language === localStorage.getItem("language")) {
        return (
          <Route
            key={key}
            path={prop.layout + prop.path}
            component={prop.component}
          />
        );
      }
    })
  );

  return (
    <>
      {localStorage.getItem("token")? <Redirect to="/home" /> : ""}
    <div className="main-content">
      <RegisterNavbar />
      <div className="header bg-gradient-info py-7 py-lg-8">
        <div className="separator separator-bottom separator-skew zindex-100">
        </div>
      </div>
      {/* Page content */}
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Switch>
            {getRoutes}
            {/*<Redirect from="*" to="/auth/login" />*/}
          </Switch>
        </Row>
      </Container>
    </div>
  </>
  )
}
