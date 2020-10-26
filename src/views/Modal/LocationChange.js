import React, {useState, useEffect} from "react";
import {Col, Input, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {API_URL} from "../../CONSTANTS";
import AsyncSelect from "react-select/async/dist/react-select.esm";

export default function LocationChange({...props}) {
  const [airports, setAirports] = useState([]);
  const [airport, setAirport] = useState(null);

  useEffect(() => {
    if (airports.length == 0) return;
    setAirport(airports.filter(i => i.icao.includes(props.pilot.pilot_location_icao))[0]);
  }, [airports]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL + "/airports", options)
      .then(res => res.json())
      .then(json => {
        var res = json;
        for (var i = 0; i < res.airports.length; i++) {
          res.airports[i]['label'] = res.airports[i]['icao'];
        }
        setAirports(res.airports)
      });
  }, []);

  const handle_airport = (newValue, actionMeta) => {
    setAirport(newValue);
  };

  const handle_key = (newValue, actionMeta) => {
    if (newValue.key == 'Enter') {
      handle_airport(newValue)
    }
  };

  const findOptions = (inputValue, callback) => {
    if (!airports) return;
    callback(airports.filter(i => i.icao.includes(inputValue.toUpperCase())));
  };

  const saveLocation = () => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({location: airport.id}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL + "/pilot/" + props.pilot.vid, options)
      .then(res => res.json())
      .then(json => {
        var res = json;
        props.toggleModal();
      });

  };

  return (
    <>
      <ModalHeader tag={'h2'} toggle={props.toggleModal}>
        {localStorage.getItem('language') == 'ru'
          ? 'Текущее расположение: ' : "Current location: "}<br/>
        {props.pilot.pilot_location_name}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col xs={'12'}>
          </Col>
          <Col xs={'12'}>
            <label>{(airport) ? airport.name_en : ''}</label>
            <AsyncSelect
              required
              class={'form-control'}
              id={'type_aircraft'}
              onChange={handle_airport}
              defaultOptions={airport}
              loadOptions={findOptions}
              onKeyDown={handle_key}
              value={airport}/>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <button className={'btn btn-primary'} onClick={saveLocation}>
          {
            localStorage.getItem('language') === 'ru'
              ? 'Сохранить' : 'Save'
          }
        </button>
      </ModalFooter>
    </>
  )
}
