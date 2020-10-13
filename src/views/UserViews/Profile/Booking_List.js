import React, {useState} from "react";
import {Table} from "reactstrap";
import shortid from 'shortid';
import {hist} from "../../../CONSTANTS";

export default function BookingsList(arr){

  const [bookings, setBookings] = useState(arr.bookings);

  return (
    <div className={"table-responsive"}>
      <Table className={"table-info table-hover table"}>
        <thead style={{backgroundColor: `#1171ef`}}>
        <tr className={"text-white text-center"}>
          <th colSpan={5} style={{fontSize: `1.2em`}}>
            {localStorage.getItem("language") == "ru"? "Ваши бронирования" : "Yours bookings"}
          </th>
        </tr>
        <tr className={"text-white"}>
          <th scope={"col"} style={{fontSize: `1.2em`}}>{localStorage.getItem("language") == "ru"? 'Тип' : 'Type'}</th>
          <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Позывной' : 'Callsign'}</th>
          <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Тип ВС' : 'AC type'}</th>
          <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Маршрут' : 'Route'}</th>
          <th scope={"col"} style={{fontSize: `calc(0.8em + .4vw)`}}>{localStorage.getItem("language") == "ru"? 'Время бронирования' : 'Booking time'}</th>
        </tr>
      </thead>
      <tbody className={"bg-white text-center"}>
      {
        bookings.map((prop, key) =>{
          return (
            <tr style={{cursor: 'pointer'}} key={shortid()} onClick={() => {hist.replace('/profile/booking/'+prop.id); hist.go(0);}}>
              <td style={{fontSize: `1.2em`, fontWeight: `bold`}}>
                {
                  (prop.charter === 1)
                    ? localStorage.getItem("language") == "ru"? 'Чартер' : 'Charter'
                    : localStorage.getItem("language") == "ru"? 'Маршрут ВК' : 'VA route'
                }</td>
              <td style={{fontSize: `1.2em`, fontWeight: `bold`}}>{prop.callsign}</td>
              <td style={{fontSize: `1.2em`, fontWeight: `bold`}}>{prop.fleet_name}</td>
              <td style={{fontSize: `1.2em`, fontWeight: `bold`}}>{prop.dep_icao + ' - ' + prop.arr_icao}</td>
              <td style={{fontSize: `1.2em`, fontWeight: `bold`}}>{prop.book_time}</td>
            </tr>
          )
        })
      }
      </tbody>
    </Table>
    </div>
  )
}
