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
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
import * as Cookies from 'tiny-cookie'
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";


// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardImg,
    CardTitle,
    CardText,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col
} from "reactstrap";


import Header from "components/Headers/Header.js";

export default function HomePage({ ...props }){
    return (
        <>
            <Header />
            {/* Page content */}

            <Container className="mt--7" fluid>
                {
                    <Card>
                        <Row>
                            <Col lg="2" sm="12">
                                <CardImg src={require("ivao.svg")} />
                            </Col>
                            <Col lg="10" sm="12">
                                <CardHeader>
                                    <CardTitle tag="h2" className="text-center">
                                        {localStorage.getItem("language") == "ru"? "Кто МЫ?" : "Who WE ARE?"}
                                    </CardTitle>
                                </CardHeader>
                                <CardBody tag="h3">
                                    {localStorage.getItem("language") == "ru"
                                        ? "Виртуальная авиакомпания \"Победа\" - это группа авиационных энтузиастов. Мы стремимся обеспечить дополненный виртуальный авиационный опыт, создавая виртуальную авиационную среду для всех. Мы являемся некоммерческой организацией, сотрудничающей с International Virtual Aviation Network (IVAO)."
                                        : "Pobeda Virtual Airlines is a group of aviation enthusiasts. We aim to provide an augmented virtual aviation experience by creating a virtual airline environment for everyone. We are a non-commercial organisation partnering with the International Virtual Aviation Network (IVAO)."
                                    }</CardBody>
                            </Col>
                        </  Row>
                    </Card>
                }
            </Container>
        </>
    );
}
