import React,{useState, useEffect} from "react";
import BookingsList from "./Booking_List";
import BookingView from "./Booking_View";
import BookingNew from "./Booking_New";
import {API_URL,hist} from "../../../CONSTANTS";
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import {matchPath} from "react-router-dom";

export default function ProfileBooking({...props}){

  const [bookings, setBookings] = useState();
  const booking_id = (
    hist.location.pathname.split('/')[hist.location.pathname.split('/').length-1]
);

    useEffect(() =>{
      if(!props.pilot)window.location.pathname = '/';
      getBookings();
    },[]);
  const getBookings = () =>{
    fetch( API_URL+"/booking", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),
      }})
      .then(res =>res.json())
      .then(response => {
        setBookings(response)
      })
    }

    const content = () =>{
    if(!isNaN(booking_id)) return <BookingView id={booking_id} props={props}/>
      if(!bookings) return;
      if(bookings.length > 0){
        return <BookingsList bookings={bookings}/>
      }
      else{
        return <BookingNew {...props}/>
      }
    }

  return (
    <>
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">
                {
                  (bookings && bookings.length > 0)
                      ? localStorage.getItem("language") == "ru" ? "Мои бронирования" : "My booked flights"
                      : localStorage.getItem("language") == "ru" ? "Детали бронировние" : "Booking details"
                }
              </h3>
            </Col>
            <Col className="text-right" xs="4">

            </Col>
          </Row>
        </CardHeader>
        <CardBody>
              {content()}
        </CardBody>
      </Card>
    </>
  )
}
