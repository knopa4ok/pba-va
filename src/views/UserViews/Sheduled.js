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
import React, {useEffect, useState} from "react";
import Api from "../../components/Api/Api.js"

// reactstrap components
import {
  Container,
  Table,
  Card
} from "reactstrap";


import Header from "components/Headers/Header.js";

export default function Sheduled(){
  var api = new Api();

  const[bookings, setBookingsts] = useState([]);

  useEffect(() =>{
    /*const options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    };
    fetch("https://pbdapi.malinovski.tk/Flights/Booking/",options)
        .then(res =>res.json())
        .then(json => {setPilots(json)})*/
  },[])

  /*const sheduleList =(
      pilots.map((prop, key) => {
        return (
            <tr>
              <td>{prop.vid}</td>
              {
                localStorage.getItem("token") &&
                <td>{prop.fullname}</td>
              }
              <td>{prop.callsign}</td>
            </tr>
        )
      })
  )*/

  return (
      <>
        <Header />
        {/* Page content */}

        <Container className="mt--7" fluid>
          <Card shadow>
            <Table className={"align-items-center"} responsive>
              <thead className={"thead-light"}>
              <tr>
                <th style={{fontSize: "1.1em"}}>{(localStorage.getItem("language") == "ru") ? "Позывной" : "Callsign"}</th>
                <th style={{fontSize: "1.1em"}}>{(localStorage.getItem("language") == "ru") ? "Тип ВС" : "AC type"}</th>
                <th style={{fontSize: "1.1em"}}>{(localStorage.getItem("language") == "ru") ? "Маршрут" : "Route"}</th>
              </tr>
              </thead>
              <tbody>
              {/*sheduleList*/}
              </tbody>
            </Table>
          </Card>
        </Container>
      </>
  );
}
