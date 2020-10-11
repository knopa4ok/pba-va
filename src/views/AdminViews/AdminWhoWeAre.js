import React, {useEffect, useState} from "react";
/* EDITOR */
import { EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {API_URL} from "../../CONSTANTS";
import PageLoading from "../PageLoading";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

export default function AdminWhoWeAre(){
  const[text_ru, set_text_ru] = useState(EditorState.createEmpty());
  const[text_en, set_text_en] = useState(EditorState.createEmpty());
  const [activeTab, setActiveTab] = useState('text_ru');

  useEffect(() =>{
    getArticle();
  },[]);

  const getArticle = () =>{
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
        if(result.text_ru){
          set_text_ru(EditorState.createWithContent(convertFromRaw(JSON.parse(result.text_ru))));
        }
        if(result.text_en){
          set_text_en(EditorState.createWithContent(convertFromRaw(JSON.parse(result.text_en))));
        }
      });
  };
  const toggle = (e) =>{
    e.preventDefault();
    if(activeTab !== e.target.id) setActiveTab(e.target.id);
  };
  const handle_text_ru = (editorState) =>{
    set_text_ru(editorState);
  };
  const handle_text_en = (editorState) =>{
    set_text_en(editorState);
  };
  const handle_submit = (e) =>{
    e.preventDefault();
    var options = {
      method: "PUT",
      body: JSON.stringify({
        'text_ru': JSON.stringify(convertToRaw(text_ru.getCurrentContent())),
        'text_en': JSON.stringify(convertToRaw(text_en.getCurrentContent())),
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL + "/articles/0", options, {
    })
      .then(res => res.json())
      .then((result) => {
      });
  };

  if(!activeTab || !text_en) return <PageLoading />
  return (
    <Container className="mt--7" fluid>
      <Card>
        <CardHeader>
          <Button color="primary" onClick={handle_submit}>
            {
              localStorage.getItem('language') == 'ru'
                ? 'Сохранить'
                : 'Save'
            }
          </Button>
        </CardHeader>
        <CardBody>
          <Form>
            <Nav tabs>
              <NavItem>
                <NavLink
                  id={'text_ru'}
                  active={(activeTab == 'text_ru')}
                  onClick={toggle}
                >
                  По русски</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  id={'text_en'}
                  active={(activeTab == 'text_en')}
                  onClick={toggle}
                >
                  In english</NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={'text_ru'} >
                <Editor
                  id={'text_ru_textarea'}
                  editorState={text_ru}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName border border-light px-1"
                  onEditorStateChange={handle_text_ru}
                />
              </TabPane>
              <TabPane  tabId={'text_en'} >
                <Editor
                  id={'text_ru_textarea'}
                  editorState={text_en}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName border border-light px-1"
                  onEditorStateChange={handle_text_en}
                />
              </TabPane>
            </TabContent>
          </Form>
        </CardBody>
      </Card>
    </Container>
  )
}
