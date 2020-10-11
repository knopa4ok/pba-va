import React, {useState, useEffect} from "react";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardImg,
    CardTitle,
    Container,
    Row,
    Col
} from "reactstrap";


import Header from "components/Headers/Header.js";
import TimeTable from "../../components/TimeTable/TimeTable";
import News from "../../components/News/News";
import shortid from "shortid";
import {API_URL} from "../../CONSTANTS";
import ReactHtmlParser from "react-html-parser";
import draftToHtml from "draftjs-to-html";
import PageLoading from "../PageLoading";

export default function HomePage({...props}){

  const [weAre, setWeAre] = useState(null);
  useEffect(()=>{getWhoWeAre()},[]);

  const getWhoWeAre = () =>{
    var options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL + "/articles/0", options, {
    })
      .then(res => res.json())
      .then((result) => {
        setWeAre(result);
      });
  };

  if(props.user.vid && props.pilot && props.pilot.length == 0)return <PageLoading/>;
    return (
        <>
            <Header key={shortid()} {...props}/>
            {/* Page content */}

            <Container className="mt--7" fluid>
                    <Card>
                        <Row>
                            <Col lg="2" sm="12">
                                <CardImg src={require("ivao_va.svg")} />
                            </Col>
                            <Col lg="10" sm="12">
                                <CardHeader>
                                    <CardTitle tag="h2" className="text-center">
                                        {localStorage.getItem("language") == "ru"? "Кто МЫ?" : "Who WE ARE?"}
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                  {
                                    (weAre)
                                      ? localStorage.getItem('language') == 'ru'
                                      ? ReactHtmlParser(draftToHtml(JSON.parse(weAre.text_ru)))
                                      : ReactHtmlParser(draftToHtml(JSON.parse(weAre.text_en)))
                                      : ''
                                  }

                                  {/*localStorage.getItem("language") == "ru"
                                        ? "Виртуальная авиакомпания \"Победа\" - это группа авиационных энтузиастов. Мы стремимся обеспечить дополненный виртуальный авиационный опыт, создавая виртуальную авиационную среду для всех. Мы являемся некоммерческой организацией, сотрудничающей с International Virtual Aviation Network (IVAO)."
                                        : "Pobeda Virtual Airlines is a group of aviation enthusiasts. We aim to provide an augmented virtual aviation experience by creating a virtual airline environment for everyone. We are a non-commercial organisation partnering with the International Virtual Aviation Network (IVAO)."
                                   */ }</CardBody>
                            </Col>
                    </Row>
                    </Card>
                    <News />
                    <TimeTable />

            </Container>
        </>
    );
}
