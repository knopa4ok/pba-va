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
/*eslint-disable*/
import React,{useState} from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Collapse,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

var ps;

export default function Sidebar(props) {
  const [collapseOpen, setCollapse] = useState(false);
  const {bgColor, routes, logo} = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (props) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapse(!collapseOpen);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapse(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = routes => {
    return routes.map((prop, key) => {
      if (prop.needAuth == 1 && !localStorage.getItem("IVAOTOKEN")) return;
      if (prop.needAdmin && !props.user.access) return;
      if (prop.hidden == 1) return;
      return (
          <NavItem key={key} className={(prop.delimiter)?'border-top mt-3':''}>
          <NavLink
            className={(prop.children) ? "pl-5": ''}
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon}/>
            {prop.name[localStorage.getItem('language')]}
          </NavLink>
        </NavItem>
      );
    });
  };

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank"
    };
  }

  Sidebar.defaultProps = {
    routes: [{}]
  };
  Sidebar.propTypes = {
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
      // innerLink is for links that will direct the user within the app
      // it will be rendered as <Link to="...">...</Link> tag
      innerLink: PropTypes.string,
      // outterLink is for links that will direct the user outside the app
      // it will be rendered as simple <a href="...">...</a> tag
      outterLink: PropTypes.string,
      // the image src of the logo
      imgSrc: PropTypes.string.isRequired,
      // the alt for the img
      imgAlt: PropTypes.string.isRequired
    })
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <div display="inline">
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon"/>
          </button>
          {/* Brand */}
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            {logo ? (
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            ) : null}
          </NavbarBrand>
        </div>

        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc}/>
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc}/>
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span/>
                  <span/>
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search"/>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}

          {/* Heading */}
          {/*<h6 className="navbar-heading text-muted"></h6>*/}
          {/* Navigation */}
        </Collapse>
      </Container>
    </Navbar>
  );
}
