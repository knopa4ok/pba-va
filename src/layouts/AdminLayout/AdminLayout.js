/*!

* Malinovski Konstantin
* konstantin@malinovski.tk
*/
import React, {useEffect, useState} from "react";
import { Route, Switch} from "react-router-dom";
// reactstrap components
import { Container, Button, Modal} from "reactstrap";

import Header from "../../components/Headers/Header";
// core components
import UserNavbar from "components/Navbars/UserNavbar.js";
import UserFooter from "components/Footers/UserFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import PageLoading from "../../views/PageLoading";

import routes from "routes.js";
import {API_URL,hist} from "../../CONSTANTS";
import shortid from "shortid";

export default function AdminLayout({ ...props }){
  document.documentElement.scrollTop = 0;
  document.scrollingElement.scrollTop = 0;

  const ref = React.createRef();
  const [scrollElem, handleScrollTop] = useState(document.scrollingElement.scrollTop);
  const [user, setUser] = useState({});

  useEffect(()=>{
    getUserInfo();
  },[]);

  const getUserInfo = ()=> {
    if(!localStorage.getItem('IVAOTOKEN')) return;
    fetch(API_URL + "/user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    })
      .then(res => res.json())
      .then((result) => {
        if (result) {
          if(result.access == 0) window.location.pathname = '/home';
          setUser(result);
        }
      })
  };

  const getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        path.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "";
  };

  const getRoutes = (
    routes.map((prop, key) => {
      return (
        <Route
          key={key}
          path={prop.layout + prop.path}
          component={() => <prop.component user={user} props={{...props}}/>}
        />
      )})
    );

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        user={user}
        logo={{
          innerLink: "/",
          imgSrc: require("logo.svg"),
          imgAlt: "..."
        }}
      />
      <div className="main-content" ref={ref}>
        <UserNavbar
          {...props}
          user={user}
          brandText={getBrandText(...props.location.pathname)}
        />
        <Header key={shortid()} {...props} noPilot={true}/>
        {(!user && localStorage.getItem('IVAOTOKEN') != null)? <PageLoading/> : null}
        <Switch>
          {(user || !localStorage.getItem('IVAOTOKEN'))? getRoutes : null}
        </Switch>
        <Container fluid>
          <UserFooter />
        </Container>
      </div>
    </>
  );
}
