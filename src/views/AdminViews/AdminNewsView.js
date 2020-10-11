import React,{useEffect,useState} from "react";
import {Form, FormGroup,Input, Label, Button} from 'reactstrap';
import {API_URL} from "../../CONSTANTS";

export default function AdminNewsView({...props}){
  var props = props[window.location.pathname.split('/').pop()];
    const [heading_ru, set_heading_ru] = useState((props)? props.heading_ru : '');
    const [heading_en, set_heading_en] = useState((props)?props.heading_en : '');
    const [body_ru, set_body_ru] = useState((props)?props.body_ru : '');
    const [body_en, set_body_en] = useState((props)?props.body_en : '');


  const handle_heading_ru = (e) => {set_heading_ru(e.target.value)}
  const handle_heading_en = (e) => {set_heading_en(e.target.value)}
  const handle_body_ru = (e) => {set_body_ru(e.target.value)}
  const handle_body_en = (e) => {set_body_en(e.target.value)}

  const handle_submit = (e) =>{
    e.preventDefault();
    var options = {
      method: (props)? 'PUT' : "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    options.body = (props)
    ? JSON.stringify({
        'id': props.id,
        'heading_ru': heading_ru,
        'heading_en': heading_en,
        'body_ru': body_ru,
        'body_en': body_en,
      })
    : JSON.stringify({
        'heading_ru': heading_ru,
        'heading_en': heading_en,
        'body_ru': body_ru,
        'body_en': body_en,
      });
    let id = (props)? '/' + props.id : '';
    fetch(API_URL + "/news"+id, options, {
    })
      .then(res => res.json())
      .then((result) => {
        window.location.pathname = '/admin/news';
      })
  }
  const handle_delete = (e) =>{
    e.preventDefault();
    var options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL + "/news/"+props.id, options, {
    })
      .then(res => res.json())
      .then((result) => {
      window.location.pathname = '/admin/news'
      });
  }

  const handle_clear = (e) =>{
    e.preventDefault();
    set_heading_ru('');
    set_heading_en('');
    set_body_en('');
    set_body_ru('');
  }


  return (
    <Form className={'p-3'}>
      <FormGroup>
        <button
          className={'btn btn-primary px-5 py-1 mr-4'}
          style={{fontSize: '1.5em'}}
          onClick={handle_submit}>
          {
          localStorage.getItem('language') == 'ru'
          ? 'Сохранить'
          : 'Save'
          }
        </button>
        <button className={'btn btn-warning'} onClick={handle_delete}>
          {
            localStorage.getItem('language') == 'ru'
              ? 'Удалить'
              : 'Delete'
          }
        </button>
      </FormGroup>
      <FormGroup>
        <Label for='ru_heading' style={{fontSize: '1.1em'}}>
          Заголовок по Русски
        </Label>
        <Input
          required
          id="ru_heading"
          type="text"
          className={'form-control text-dark'}
          placeholder={'Заголовок по русски'}
          onChange={handle_heading_ru}
          value={heading_ru}>{}</Input>
      </FormGroup>
      <FormGroup>
        <Label for='en_heading' style={{fontSize: '1.1em'}}>
          Heading in English
        </Label>
        <Input
          required
          id="en_heading"
          type="text"
          className={'form-control text-dark'}
          placeholder={'Heading in English'}
          onChange={handle_heading_en}
          value={heading_en}></Input>
      </FormGroup>
      <FormGroup>
        <Label for='ru_body' style={{fontSize: '1.1em'}}>
          Текст новости
        </Label>
        <textarea
          required
          id="ru_body"
          type="text"
          className={'form-control text-dark'}
          onChange={handle_body_ru}
          value={body_ru}
          >
        </textarea>
      </FormGroup>
      <FormGroup>
        <Label for='en_body' style={{fontSize: '1.1em'}}>
          News text
        </Label>
        <textarea
          required
          id="en_body"
          type="text"
          className={'form-control text-dark'}
          onChange={handle_body_en}
          value={body_en}>
        </textarea>
      </FormGroup>
    </Form>
  )
}
