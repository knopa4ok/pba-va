import React,{useEffect, useState} from "react";
import {
    Button,
    Col,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    ModalBody,
    Row
} from "reactstrap";

export default function LoginModal(){
    return (
        <>
            <ModalBody>
                <Form action="/Login">
                    <Row>
                        <Col>
                            <Row>
                                <Label for="tokenInput">
                                    {localStorage.getItem("language") === "ru"? "Введите токен" : "Enter token"}
                                    :</Label>
                                <InputGroup className={"md-3"}>
                                    <Input
                                        id="token"
                                        type="text"
                                        className="form-control"
                                        placeholder="Token"
                                        name="token"
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button color="primary" type="submit">
                                            {localStorage.getItem("language") === "ru"? "Войти!" : "Log-in!"}
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Row>
                            <Row></Row>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
        </>
    )
}
