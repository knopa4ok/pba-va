/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {API_URL, hist} from "./CONSTANTS";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/scss/font-awesome.scss";

import "assets/css/custom.css"

import MainLayout from "layouts/MainLayout/MainLayout.js";
import Login from "components/Login/Login.js";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";

var props;
/* Check if Language switch request is present */
if(!localStorage.getItem("language")){localStorage.setItem("language", "en"); }
if(hist.location.pathname.indexOf("lang") >= 0){

}
/* Redirect to right way */
if(hist.location.pathname.length > 2 && hist.location.pathname.substr(-1) == "/"){
  hist.location.pathname = hist.location.pathname.substr(0, -1);
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin/:view" component={AdminLayout} />
      <Route path="/admin/:view/:id" component={AdminLayout} />
      <Route path="/home" component={MainLayout} />
      <Route path="/rules" component={MainLayout} />
      <Route path="/staff" component={MainLayout} />
      <Route path="/fleet" component={MainLayout} />
      <Route path="/pilots" component={MainLayout} />
      <Route path="/routes" component={MainLayout} />
      <Route path="/history" component={MainLayout} />
      <Route path="/staff" component={MainLayout} />
      <Route path="/cv" component={MainLayout} />
      <Route path="/login" component={Login(hist)} />
      <Route path="/profile/" component={MainLayout} />
      <Route path="/">
          <Redirect to="/home"  component={MainLayout} ></Redirect>
      </Route>

    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
