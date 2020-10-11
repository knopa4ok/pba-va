import React, {useEffect, useState} from "react";
import shortid from 'shortid';
// reactstrap components
import {
  Container,
    Table,
    Card
} from "reactstrap";


import Header from "components/Headers/Header.js";
import {API_URL} from "../../CONSTANTS";

export default function Pilots({...props}){

  const[pilots, setPilots] = useState([]);

  useEffect(() =>{
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),
      }};
    fetch(API_URL +"/pilot",options)
        .then(res =>res.json())
        .then(json => {setPilots(json)})
  },[])

  const openPilotProfile = (e) =>{
    e.preventDefault();
    if(props.user.access == 1){
      window.location.pathname = '/profile/info/'+e.target.parentElement.id;
    }
  };
  const pilotsList =(
      pilots.map((prop, key) => {
        return (
            <tr key={shortid()} id={prop.vid} onClick={openPilotProfile} style={{cursor: 'pointer'}}>
              <td>{prop.vid}</td>
              {
                (props.user.vid)?
                  (
                    <td>{prop.fullusername}</td>
                  ): ''

              }
              <td>{prop.callsign}</td>
            </tr>
        )
      })
  )

  return (
      <>
        <Header />
        {/* Page content */}

        <Container className="mt--7" fluid>
            <Card>
              <Table className={"align-items-center table-hover"} responsive>
                <thead className={"thead-light"}>
                  <tr>
                    <th style={{fontSize: "calc(0.8em + .4vw)"}}>VID</th>
                    {(props.user.vid)
                        ?<th style={{fontSize: "calc(0.8em + .4vw)"}}>
                            {localStorage.getItem("language") == "ru" ?
                                "Имя пилота" : "Pilot name"
                            }</th>: null}
                    <th style={{fontSize: "calc(0.8em + .4vw)"}}>{(localStorage.getItem("language") == "ru") ? "Позывной" : "Callsign"}</th>
                  </tr>
                </thead>
                <tbody>
                {pilotsList}
                </tbody>
              </Table>
            </Card>
        </Container>
      </>
  );
}
