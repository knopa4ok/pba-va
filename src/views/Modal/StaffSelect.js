import React,{useEffect, useState} from "react";
import {Row, Col, Input, ModalBody, ModalHeader, ModalFooter} from "reactstrap";

export default function StaffSelect({...props}){
  const handle_position_ru = () =>{

  };
  const handle_position_en = () =>{

  };

  const handleEmail = () =>{

  };

  const handleSubmit = () =>{

  };

  const handleDelete = () =>{

  };

  return (
    <>
      <ModalHeader toggle={props.toggleModal}>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col xs={'12'}>
            <label>Название позиции</label>
            <Input onChange={handle_position_ru}></Input>
          </Col>
          <Col xs={'12'}>
            <label>Position name</label>
            <Input onChange={handle_position_en}></Input>
          </Col>
          <Col xs={'12'}>
            <label>Email</label>
            <Input onChange={handle_position_en}></Input>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </>
    );
}
