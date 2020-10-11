import React, {useEffect, useState} from "react";
import Recaptcha from "react-recaptcha";
import {
  Button,
  Card,
  CardBody,
  CardHeader, Col,
  Form,
  FormGroup, Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText, Row
} from "reactstrap";

export default function Register(){
  const [state, setState] = useState({vid: "", firstname: "", lastname: "", rules: false})
  const [errorMsg, setErrorMsg] = useState("");
  const [tokenMsg, setTokenMsg] = useState("");

  const handleCaptcha = (response) => {
    localStorage.setItem("captcha", response)
  }


  const handleChange = (e) =>{
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(localStorage.getItem("captcha")) {
      sendResponse();
    } else {
      localStorage.getItem("language") == "ru"
        ?setErrorMsg('Подтвердите что вы не робот')
        : setErrorMsg("Confirm you are not robot")
    }
  }

  function sendResponse(){
    fetch( "http://127.0.0.1:8000/User/", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          vid: state.vid,
          firstname: state.firstname,
          lastname: state.lastname,
          captcha: localStorage.getItem("captcha")
      })
    })
      .then(res => res.json())
      .then(((result) => {
          if(typeof(result) == "array"){
            localStorage.getItem("language") == "ru"
            ? setTokenMsg("Ваш токен для авторизации:\n" + result.token + "</h2>\n пожалуйста, запишите его!")
            : setTokenMsg("You access token is:\n<h2>" + result.token + "</h2>\nplease remember it!")
          }
          else{
            setTokenMsg(result);
          }
          localStorage.removeItem("captcha");
        }),
        (error)=>{
          localStorage.removeItem("token");
        });
  }

  return (
    <Col lg="6" md="8">
      {
        (tokenMsg != "")?
        <Card className="bg-secondary shadow border-0 mb-3">
        <CardBody className="px-lg-5 py-lg-2">
        <div className="text-center text-primary mb-2">
        <h1 className={"text-warning"}>{tokenMsg}</h1>
        </div>
        </CardBody>
        </Card>
          : ""
      }
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-primary mb-4">
            <h1 className={"text-warning"}>{errorMsg}</h1>
            <h1>Registration</h1>
          </div>
          <Form role="form" onSubmit={handleSubmit}>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    {/*<i className="ni ni-hat-3" />*/}
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="VID"
                  name="vid"
                  type="number"
                  value={state.vid}
                  onChange={handleChange}
                  required />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  {/*<i className="ni ni-hat-3" />*/}
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Firstname"
                name="firstname"
                type="text"
                value={state.firstname}
                onChange={handleChange}
                required/>
            </InputGroup>
            <InputGroup className="input-group-alternative mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  {/*<i className="ni ni-hat-3" />*/}
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Lastname"
                name="lastname"
                type="text"
                value={state.lastname}
                onChange={handleChange}
                required/>
            </InputGroup>
            </FormGroup>
            <Row className="my-4">
              <Col xs="12">
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="customCheckRegister"
                    name="rules"
                    type="checkbox"
                    value={state.rules}
                    onChange={handleChange}
                    required={true}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheckRegister"
                  >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="/rules" onClick={e => e.preventDefault()}>
                            Rules
                          </a>
                        </span>
                  </label>
                </div>
              </Col>
            </Row>
            <Recaptcha
              sitekey="6Lf-K8kZAAAAAGmPJ9sRS74QpDxX_7pkZ6xPGXU0"
              verifyCallback={handleCaptcha}
            />
            <div className="text-center">
              <Button
                className="mt-4"
                color="primary"
                type="submit"
              onClick={handleSubmit}>
                Create account
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}
