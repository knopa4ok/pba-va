import React, {useEffect, useCallback, useState} from "react";
import {API_URL} from "../../CONSTANTS";
import {
  Card,
  Table,
} from "reactstrap";
import PageLoading from "../../views/PageLoading";


export default function TimeTable() {

  const [flights, setFlights] = useState(null);
  useEffect(()=>{
    if(flights)return;
    getFlights()
  },[flights]);

  const getFlights = () => {
    fetch(API_URL+"/flight/timetable", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),
    },
    })
      .then(res => res.json())
     .then(response =>{
       if(response)setFlights(response);
     })
    };

  const switchStatus = (prop) => {
    switch(prop['status']){
      case "0":
        return (
          <>
        <span style={{color: "#f3bf52"}}>
          {
            localStorage.getItem("language") == "ru"
              ? "ЗАГРУЗКА" : "BOARDING"
          }
        </span>
          </>
        )
        break;
      case "1":
      case "3":
        return (
          <>
        <span style={{color: "#f3bf52"}}>
          {
            localStorage.getItem("language") == "ru"
              ? "РУЛЕНИЕ" : "TAXING"
          }
        </span>
          </>
        )
        break;
      case "2":
        return (
          <>
        <span style={{color: "black"}}>
          {
            localStorage.getItem("language") == "ru"
              ? "В ПОЛЁТЕ" : "IN FLIGHT"
          }
        </span>
          </>
        )
        break;
      case "4":
        return (
          <>
          {
            localStorage.getItem("language") == "ru"
              ? "НА СТОЯНКЕ" : "ARRIVED"
          }
          </>
        )
        break;
    }
  };


  const flightLinesBooked = (
    (flights && flights.booked) ?
     flights.booked.map((prop, key) => {
        return (
          <tr key={key}>
            <td className={'border-right'} style={{fontSize: `calc(0.7em + .4vw)`, fontWeight: `bold`}}>{prop['callsign']}</td>
            <td className={'border-right'} style={{fontSize: `calc(0.7em + .4vw)`, fontWeight: `bold`}}>{prop['book_time']}</td>
            <td className={'border-right'} style={{fontSize: `calc(0.7em + .4vw)`, fontWeight: `bold`}}>{prop['dep_icao']}</td>
            <td className={'border-right'} style={{fontSize: `calc(0.7em + .4vw)`, fontWeight: `bold`}}>{prop['arr_icao']}</td>
            <td className={'border-right'} style={{fontSize: `calc(0.7em + .4vw)`, fontWeight: `bold`}}>{localStorage.getItem('language') == 'ru'?'Забронирован' : 'SHEDULED'}</td>
          </tr>
        )
      })
      : "");
  const flightLinesActive = (
    (flights && flights.active)?
      flights.active.map((prop, key) => {
    return (
      <tr key={key}>
        <td className={'border-right'} style={{fontSize: `calc(0.7em + .4vw)`, fontWeight: `bold`}}>{prop['callsign']}</td>
        <td className={'border-right'} style={{fontSize: `calc(0.7em + .4vw)`, fontWeight: `bold`}}>{prop['conn_time']}</td>
        <td className={'border-right'} style={{fontSize: `calc(0.7em + .4vw)`, fontWeight: `bold`}}>{prop['dep_icao']}</td>
        <td className={'border-right'} style={{fontSize: `calc(0.7em + .4vw)`, fontWeight: `bold`}}>{prop['arr_icao']}</td>
        <td className={'border-right'} style={{fontSize: `calc(0.7em + .4vw)`, fontWeight: `bold`}}>
              {prop['ended'] == '0'
                ?
                switchStatus(prop)
                : localStorage.getItem("language") == "ru"
                  ? "Завершен" : "Ended"
              }
        </td>
      </tr>
    )})
        : ""
);

  if(!flights)return <PageLoading/>
  return (
      <Card id={"FlightTimeTable-"+localStorage.getItem('language')} className="w-100 mt-3 " style={{backgroundColor: "#616066", fontFamily: (localStorage.getItem('language') == 'ru'? 'Open Sans, sans-serif' : 'inherit')}}>
        <div className={"table-responsive"}>
          <Table className={"table-info table"}>
            <thead style={{backgroundColor: `#1171ef`}}>
            <tr className={"text-white text-center"}>
              <th colSpan={5} style={{fontSize: `1.2em`}}>
                {localStorage.getItem("language") == "ru"? "Онлайн табло" : "Online timetable"}
              </th>
            </tr>
              <tr className={"text-white"}>
                <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Позывной' : "Callsign"}</th>
                <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Время вылета' : "Dep. time"}</th>
                <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Вылет' : "Departure"}</th>
                <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Прилёт' : "Arrival"}</th>
                <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Статус' : "Status"}</th>
              </tr>
            </thead>
            <tbody className={"bg-white text-left"}>
            {(flights.booked == "" && !flights.active == "")?<tr><td colspan={5}></td></tr>: null}
            {(flights.booked) ? flightLinesBooked : null}
            {(flights.active) ? flightLinesActive : null}
            </tbody>
          </Table>
        </div>

      </Card>
  )
}
