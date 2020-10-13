/*!

* Malinovski Konstantin
* konstantin@malinovski.tk
*/
import React, {useEffect, useState, useMemo} from "react";
import {matchPath, Route, Switch} from "react-router-dom";
// reactstrap components
import {Container, Button, Modal} from "reactstrap";
// core components
import Header from "../../components/Headers/Header";
import UserNavbar from "components/Navbars/UserNavbar.js";
import UserFooter from "components/Footers/UserFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import {API_URL, hist} from "../../CONSTANTS";
import PageLoading from "../../views/PageLoading";

export default function HomeLayout({...props}) {
  document.documentElement.scrollTop = 0;
  document.scrollingElement.scrollTop = 0;

  const [language, setLanguage] = useState(() => {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'en');
    }
    return localStorage.getItem('language')
  });
  const [user, setUser] = useState([]);
  const [pilot, setPilot] = useState([]);

  const match = () => {
    return matchPath(hist.location.pathname, {path: '*/:layout/:id', exact: false, strict: false})
  };

  useEffect(() => {
    console.log('useEffect - getUserInfo()');
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!user.vid) return;
    if (match() && !isNaN(match().params.id) && match().params[0] == '/profile' && match().params.layout == 'info') {
      getPilotInfo(match().params.id)
    } else {
      getPilotInfo();
    }
  }, [user]);

  const languageSwitch = () => {
    var lang;
    if (!language || language == 'ru') {
      lang = 'en'
    } else {
      lang = 'ru'
    }
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const getUserInfo = useMemo(()=> {
    if(!localStorage.getItem('IVAOTOKEN')) return;
    fetch(API_URL + "/user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result && result.vid) {
          result.loaded = 1;
          setUser(result);
        } else {
          localStorage.removeItem('IVAOTOKEN');
          return false;
        }
      });
  },[user]);

  const getPilotInfo= (vid) =>{
    vid = (vid)? vid : user.vid;
    fetch(API_URL+"/pilot/"+vid,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),
      }})
      .then(res => res.json())
      .then((result) => {
          setPilot(result);
        });
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

  const logOut = () => {
    localStorage.clear();
    setUser(null);
  };

  const getRoutes = () => {
    return routes.map((prop, key) => {
      return (
        <Route
          key={key}
          path={prop.layout + prop.path}
          component={() => <prop.component language={language} user={user} props={{...props}} pilot={pilot}/>}
        />
      )
    })
  };

  return (
    <>
      <Sidebar
        {...props}
        user={user}
        routes={routes}
        logo={{
          innerLink: "/",
          imgSrc: require("logo.svg"),
          imgAlt: "..."
        }}
      />
      <div className="main-content">
        <UserNavbar
          {...props}
          user={user}
          pilot={pilot}
          brandText={getBrandText(...props.location.pathname)}
          languageSwitcher={languageSwitch}
          logOut={logOut}
        />
        <Header/>
        <Switch>
          {(user || !localStorage.getItem('IVAOTOKEN')) ? getRoutes() : null}
        </Switch>
        <Container fluid>
          <UserFooter/>
        </Container>
      </div>
    </>
  );
}
