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
import React,{useEffect, useState} from "react";
import { Link} from "react-router-dom";
import LoginModal from  "../Modals/LoginModal.js" ;
import {API_URL, languages} from "../../CONSTANTS";
// reactstrap components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Collapse,
  Row,
  Col,
  DropdownToggle,
  NavbarBrand,
  Media,
  Container,
  Button,
} from "reactstrap";

export default function UserNavbar({ ...props }){
  const [token, tokenChange] = useState(localStorage.getItem("IVAOTOKEN"));
  const [topMenuOpen, setTopMenu] = useState(false);

  function registerAsPilot(){
    fetch( API_URL+"/pilot" , {
      method: 'POST',
      body: JSON.stringify({'vid':props.user.vid}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('IVAOTOKEN'),},
    })
      .then(res => res.json())
      .then(result =>{window.location.pathname = '/'})
  }

  /* MENU TOP MENU HANDLING */
  function toggleTopMenu(e){
    e.preventDefault();
    setTopMenu(!topMenuOpen);
  }

  function langSwitch(){
    props.languageSwitcher();
  }

  function logOut(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  }

  const userTopNavbar = (
      <UncontrolledDropdown nav inNavbar className={"d-sm-inline"}>
          <DropdownToggle nav  className="dropdown pr-0">
            <Media className="align-items-center d-inline-flex d-xs-inline">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                          alt="..."
                          src={require("../../anime3.png")}
                      />
                    </span>
              <Media className="ml-2 dnp-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {
                          (props.user && props.user.vid && props.user.firstname)?
                            props.user.vid + " | " + props.user.lastname + " " + props.user.firstname.substr(0,1) + ".": ""
                        }
                        </span>
              </Media>
            </Media>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem href="/profile/info">
                    <i className="ni ni-single-02" />
                    <span>{localStorage.getItem("language") === "ru"
                        ?"Мой профиль"
                        :"My profile"}
                    </span>
                  </DropdownItem>
            {
              (props.pilot)?
                  <DropdownItem href="/profile/booking">
                    <i className="fa fa-plane" />
                    <span>{localStorage.getItem("language") === "ru"
                      ?"Забронировать"
                      :"Book flight"}
                          </span>
                  </DropdownItem>
                : null}
            <DropdownItem divider />
                  <DropdownItem onClick={logOut}>
                    <i className="ni ni-user-run" />
                    <span>
                      {localStorage.getItem("language") === "ru"
                          ?"Выйти"
                          :"Log-out"}
                    </span>
                  </DropdownItem>
          </DropdownMenu>
      </UncontrolledDropdown>
  );

    return (
      <>
        <Navbar
            className="navbar-top navbar-dark py-1 justify-content-end"
            expand="md"
            id="navbar-main">
          <button
              className="navbar-toggler"
              onClick={toggleTopMenu}
              type="button"
          >
            {localStorage.getItem("IVAOTOKEN")
                ? <span className="navbar-toggler-icon"></span>
                    : <span className="fa fa-lock"></span>
            }
          </button>
          {/* BRAND TEXT HERE */}
          {((props.user && props.pilot === null) && localStorage.getItem("IVAOTOKEN" ) && props.location.pathname.indexOf('/admin/') != 0)
            ?<>
              <NavbarBrand
              className={"mr-auto pl-2"} hidden={(props.pilot !== null && props.pilot.length != 0)? true : false}>
              {localStorage.getItem("language") == "ru"
                ?<><h3 className={"d-inline text-white p-4"}>{"Вы не зарегистрированы как пилот! "}</h3><Button onClick={registerAsPilot}>Зарегистрироватся!</Button> </>
                :<><h3 className={"d-inline text-white p-4"}>{"You are not registered as pilot!"}</h3><Button onClick={registerAsPilot}>Register me!</Button> </>}
            </NavbarBrand></>
            : ""
          }
          <Collapse navbar isOpen={topMenuOpen} className={"flex-grow-0"}>
            <Container fluid>
              <Link
                  className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                  to="/"
              >
                {props.brandText}
              </Link>
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-close">
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleTopMenu}
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav navbar className="align-items-center d-inline d-md-flex" >

                {/* Check user logged */ }
                {
                  props.user.vid ? userTopNavbar :
                    <>
                    <NavItem className={"pl-1 d-inline"}>
                      <NavLink
                        className="nav-link-icon"
                        href='https://login.ivao.aero/index.php?url=http://pbd-va.ru/'
                        target={'_self'}
                      >
                        <i className={"fa fa-key fa-lg"}></i>
                        <span className="nav-link-inner--text">
                          LOGIN
                        </span>
                      </NavLink>
                    </NavItem>
                    </>
                }

                <NavItem className={"pl-1 d-inline"}>
                  <NavLink
                      className="nav-link-icon"
                      onClick={langSwitch}
                  >
                    <i className={"fa fa-lg fa-globe align-top"}></i>
                    <span className={"d-inline d-md-none"}>
                      {
                        localStorage.getItem("language") == "ru"? "Русский" : "English"
                      }
                    </span>
                  </NavLink>
                </NavItem>
                </Nav>
            </Container>
          </Collapse>
        </Navbar>
      </>
    );
}

