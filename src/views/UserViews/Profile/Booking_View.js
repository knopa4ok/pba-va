import React, {useEffect, useState} from 'react';
import {API_URL} from "../../../CONSTANTS";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import Select from "react-select";
import AsyncSelect from "react-select/async/dist/react-select.esm";
import PageLoading from "../../PageLoading";

export default function BookingView({...props}) {
  const[aircrafts, setAircrafts] = useState(null);
  const[routes, setRoutes] = useState([]);
  const[airports, setAirports] = useState(null);
  const[va_route, set_va_route] = useState(true);
  const[va_charter, set_va_charter] = useState(false);
  const[ac_type, set_ac_type] = useState(null);
  const[ac_reg, set_ac_reg] = useState(null);
  const[ident, set_ident] = useState(props.props.pilot.callsign);
  const[dep_icao, set_dep_icao] = useState(null);
  const[arr_icao, set_arr_icao] = useState(null);
  const [delCount, setCounter] = useState(0);

  useEffect(() =>{
    if(delCount >= 2){
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),
        }};
      fetch( API_URL+"/booking/"+props.id, options)
        .then(()=>{
          window.location.pathname = '/profile/booking';
        })
    }
  },[delCount]);

  useEffect(() =>{
    getBookingInfo();
  },[]);

  useEffect(() =>{
    getAllFleet();
    getAirports();
    if(!dep_icao  || !ac_type) return;
    if(ac_type.label != 'B738' || (ident && ident.indexOf('PBD') >= 0) && !va_charter){
      set_va_route(0);
      set_va_charter(1);
    }else if(!ident || ident.indexOf('PBD') != 0){
      getIdent();
      set_va_route(1);
      set_va_charter(0);
    }
  },[ident, dep_icao, arr_icao, ac_type]);

  const getBookingInfo =() =>{
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),
      }};
    fetch( API_URL+"/booking/"+props.id, options)
      .then(res => res.json())
      .then((result) => {
        set_arr_icao({label: result.arr_icao, icao: result.arr_icao});
        set_dep_icao({label: result.dep_icao, icao: result.dep_icao});
        set_ident(result.callsign);
        set_ac_type({label: result.fleet_name, value: result.fleet_type});
        set_ac_reg({label: result.fleet_code, value: result.fleet_reg});
        if(result.charter == 1){set_va_charter(1); set_va_route(0);}
      });
  }

  const getAllFleet = () =>{
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),
      }};
    let airport = (dep_icao && va_route)? '?icao='+dep_icao.icao : '';
    fetch( API_URL+"/fleet/all"+airport, options)
      .then(res => res.json())
      .then((result) => {
        if(aircrafts != result){ setAircrafts(result)}
      });
  };
  const getAirports = (silent) =>{
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),
      }};
    let airport = (dep_icao && va_route)? '?icao='+dep_icao.icao : '';
    fetch( API_URL+"/airports"+airport, options)
      .then(res => res.json())
      .then(((result) => {
          if(airports != result){
            var res = result;
            for(var i=0; i<res.airports.length; i++){
              res.airports[i]['label'] = res.airports[i]['icao'];
            }
          }
          if(!silent)setAirports(res);
          else{
            return res;
          }

        }),
        (error)=>{
        });
  };
  const getIdent = () =>{
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),
      }};
      var airport = (arr_icao && dep_icao)? '?arr_icao=' + arr_icao.icao + '&dep_icao=' + dep_icao.icao : '';
      fetch(API_URL + "/routes" + airport, options)
        .then(res => res.json())
        .then((result) => {
          if(result)
            set_ident(result.identifier);
          else{
            set_ident(props.props.pilot.callsign);
          }
        });
  }

  const getDepIcaoOptions = () =>{
    var tmp = [];
    var ret = [];
    var options = [];
    ret.push({label: localStorage.getItem('language') == 'ru'? 'Маршрут компании' : "VA routes"});
    if(!airports) return;
    airports.va_dep_icao.map((prop, key) =>{
      options.push({icao: prop.dep_icao, label: prop.dep_icao});
      tmp.push(prop.dep_icao);
    });
    ret[0]['options'] = options;
    options = [];
    ret.push({label: localStorage.getItem('language') == 'ru'? "Чартеры" : "Charters"});
    ret[1]['options'] = [{}];
    return ret;
  };
  const getArrIcaoOptions = () =>{
    // var airports = getAirports();
    var tmp = [];
    var ret = [];
    var options = [];
    ret.push({label: localStorage.getItem('language') == 'ru'? 'Маршрут компании' : "VA routes"});
    if(!airports || !airports.va_arr_icao) return;
    airports.va_arr_icao.map((prop, key) =>{
      options.push({icao: prop.arr_icao, label: prop.arr_icao});
      tmp.push(prop.arr_icao);
    });
    ret[0]['options'] = options;
    options = [];
    ret.push({label: localStorage.getItem('language') == 'ru'? "Чартеры" : "Charters"});
    ret[1]['options'] = [{}];
    return ret;
  };

  const handle_va_route = (e) =>{
    set_va_route(1);
    set_va_charter(0);
    set_ac_type({value: 240, label: 'B738'});
    set_arr_icao(null);
    if(ident.indexOf('PBD') == 0)set_ident("");

  }
  const handle_va_charter =(e) =>{
    set_va_route(0);
    set_ac_reg(null);
    set_va_charter(1);
    set_ident(props.props.pilot.callsign);
    getAllFleet();
  }
  const handle_ac_type = (e) =>{
    if(e.keyCode && e.keyCode != 13) return;
    if(e.label != 'B738') handle_va_charter();
    set_ac_type(e);
  }
  const handle_ac_reg = (e) =>{
    if(e.keyCode && e.keyCode != 13) return;
    set_ac_reg(e);
  }
  const handle_ident = (e) =>{
    set_ident(e.target.value)
  }
  const loadIcaoOptions = (inputValue, callback) =>{
    if(!airports) return;
    callback(airports.airports.filter(i => i.icao.includes(inputValue.toUpperCase())));
  }
  const handle_dep_icao = (newValue, actionMeta) =>{
    if(newValue.keyCode && newValue.keyCode != 13) return;
    set_dep_icao(newValue);
    return newValue;
  }
  const handle_arr_icao = (newValue, actionMeta) =>{
    if(newValue.keyCode && newValue.keyCode != 13) return;
    set_arr_icao(newValue);
    return newValue;
  }

  const handleDelete = (e) =>{
    e.preventDefault();
    setCounter(delCount+1);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    var error = false;
    if(!ac_type){alert(localStorage.getItem('language') == 'ru'? 'Проверьте тип ВС': 'Check AC type');error = true;}
    if(!dep_icao){alert(localStorage.getItem('language') == 'ru'? 'Проверьте ICAO вылета': 'Check departure ICAO');error = true;}
    if(!arr_icao){alert(localStorage.getItem('language') == 'ru'? 'Проверьте ICAO прилета': 'Check arrival ICAO');error = true;}

    if(!error){
      var data = {
        'id': props.id,
        'va_route': va_route,
        'va_charter': va_charter,
        'ac_type': ac_type.value,
        'ac_reg': ac_reg.value,
        'ident': ident,
        'dep_icao': dep_icao.icao,
        'arr_icao': arr_icao.icao
      }
      const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),
        }};
      fetch( API_URL+"/booking/"+props.id, options)
        .then(res => res.json())
        .then(((result) => {
            window.location.pathname = '/profile/booking';
          }),
          (error)=>{
          });
    }
  }

  if(va_route === null || va_charter == null || ac_type == null || dep_icao == null)return <PageLoading/>
  return (
    <Form role="form" onSubmit={handleSubmit}>
      <Row className={'px-3'}>
        <Col xs='6' className={'text-right'}>
          <Col xs='12' className={''}>
            <h3>
              {
                localStorage.getItem("language") == "ru"? 'Полёт компании' : 'VA Route'
              }
            </h3>
          </Col>
          <Col xs='12'>
            <div className={'custom-control custom-checkbox my--3'}>
              <Input className={'custom-control-input'} type={'checkbox'} checked={va_route} onChange={handle_va_route} id={'va_route'} ></Input>
              <Label className="custom-control-label mt--100" for='va_route'></Label>
            </div>
          </Col>
        </Col>
        <Col xs='6' className={'text-left'}>
          <Col xs='12' className={''}>
            <h3>
              {
                localStorage.getItem("language") == "ru"? 'Чартер' : 'Charter'
              }
            </h3>
          </Col>
          <Col xs='12'>
            <div className={'custom-control custom-checkbox mt--3'}>
              <Input className={'custom-control-input'} type={'checkbox'} checked={va_charter} onChange={handle_va_charter} id={'va_charter'}></Input>
              <Label className="custom-control-label mt--100" for='va_charter'></Label>
            </div>
          </Col>
        </Col>
      </Row>
      <Row className={'pt-3'}>
        <Col xs={'6'}>
          <FormGroup>
            <Label for={'type_aircraft'}>{localStorage.getItem('language') == 'ru' ? 'Тип ВС' : 'Type of AC'}</Label>
            <Select
              required
              class={'form-control'}
              id={'type_aircraft'}
              onChange={handle_ac_type}
              value={ac_type}
              options={
                (aircrafts != null)?
                  aircrafts.types.map((prop, key) =>{
                    return (
                      {value: prop.id, label: prop.type}
                    )
                  })
                  : ''
              } >

            </Select>
          </FormGroup>
        </Col>
        <Col xs={'6'}>
          <FormGroup>
            <Label for={'type_aircraft'}>{localStorage.getItem('language') == 'ru' ? 'Номер ВС' : 'AC number'}</Label>
            <Select
              class={'form-control'}
              id={'type_aircraft'}
              onChange={handle_ac_reg}
              value={ac_reg}
              isDisabled={va_charter}
              options={
                (aircrafts != null)?
                  aircrafts.aircrafts.map((prop, key) =>{
                    return (
                      {value: prop.id, label: prop.code}
                    )
                  })
                  : ''
              } >

            </Select>
          </FormGroup>
        </Col>
      </Row>
      <Row className={'pt-3'}>
        <Col xs={'4'}>
          <FormGroup>
            <Label for={'callsign_input'}>{
              (!va_route)
                ?localStorage.getItem('language') == 'ru' ? 'Позывной' : 'Callsign'
                :localStorage.getItem('language') == 'ru' ? 'Номер рейса' : 'Flight Nr'
            }
            </Label>
            <Input type={'text'} className={'form-control'} style={{height: '36px'}} id={'callsign_input'} value={ident} disabled={va_route} onChange={handle_ident}></Input>
          </FormGroup>
        </Col>
        <Col xs={'4'}>
          <FormGroup>
            <Label for={'dep_icao_input'}>{localStorage.getItem('language') == 'ru' ? 'ICAO вылета' : 'Dep ICAO'}</Label>
            <AsyncSelect
              placeholder={localStorage.getItem('language') == 'ru' ? 'Введите ICAO' : 'Enter ICAO'}
              id={'dep_icao_input'}
              cacheOptions
              value={dep_icao}
              defaultOptions={getDepIcaoOptions()}
              loadOptions={loadIcaoOptions}
              onChange={handle_dep_icao}
              onKeyDown={handle_dep_icao}
              required
            />
          </FormGroup>
        </Col>
        <Col xs={'4'}>
          <FormGroup>
            <Label for={'arr_icao_input'}>{localStorage.getItem('language') == 'ru' ? 'ICAO прилёта' : 'Arr ICAO'}</Label>
            <AsyncSelect
              placeholder={localStorage.getItem('language') == 'ru' ? 'Введите ICAO' : 'Enter ICAO'}
              id={'arr_icao_input'}
              cacheOptions
              value={arr_icao}
              defaultOptions={getArrIcaoOptions()}
              loadOptions={loadIcaoOptions}
              onChange={handle_arr_icao}
              onKeyDown={handle_arr_icao}
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className={'pt-3'}>
        <Col xs={'12'} className={'text-right'}>
          {
            (delCount > 0)?
              <h3 className={'text-warning'}>
                {
                  localStorage.getItem('language') == 'ru'
                    ? 'Нажмите еще раз чтобы удалить!'
                    : 'Press one more time for delete'
                }
              </h3>
              : null
          }
          <Button
            className={'mt-4'}
            color={'warning'}
            type={'button'}
            onClick={handleDelete}>
            {
              localStorage.getItem('language') == 'ru'
                ? 'Удалить'
                : 'Delete'
            }
          </Button>
          <Button
            className="mt-4"
            color="info"
            type="submit"
            onClick={handleSubmit}>
            {
              localStorage.getItem('language') == 'ru'
                ? 'Забронировать'
                : 'Book flight'
            }
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
