import React from 'react';
import { Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default function Login(hist){
  var SearchParams = new URLSearchParams(hist.location.search);

  if(SearchParams.get("IVAOTOKEN")){
    localStorage.setItem("IVAOTOKEN",  SearchParams.get("IVAOTOKEN"));
    hist.replace('/home');
  }

}
