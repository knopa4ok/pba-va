import React,{useEffect, useState} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Button,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import PageLoading from "../PageLoading";
import {API_URL} from "../../CONSTANTS";
/* EDITOR */
import { EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function AdminRules({...props}){

  const[rules_ru, set_rules_ru] = useState(EditorState.createEmpty());
  const[rules_en, set_rules_en] = useState(EditorState.createEmpty());
  const [activeTab, setActiveTab] = useState('rules_ru');

  useEffect(() =>{
    getRules();
  },[]);

  const getRules = () =>{
    var options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL + "/articles/1", options, {
    })
      .then(res => res.json())
      .then((result) => {
        set_rules_ru(EditorState.createWithContent(convertFromRaw(JSON.parse(result.text_ru))));
        set_rules_en(EditorState.createWithContent(convertFromRaw(JSON.parse(result.text_en))));
      });
  };

  const toggle = (e) =>{
    e.preventDefault();
    if(activeTab !== e.target.id) setActiveTab(e.target.id);
  };
  const handle_rules_ru = (editorState) =>{
    set_rules_ru(editorState);
  };
  const handle_rules_en = (editorState) =>{
    set_rules_en(editorState);
  };

  const handle_submit = (e) =>{
    e.preventDefault();
    var options = {
      method: "PUT",
      body: JSON.stringify({
        'text_ru': JSON.stringify(convertToRaw(rules_ru.getCurrentContent())),
        'text_en': JSON.stringify(convertToRaw(rules_en.getCurrentContent())),
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('IVAOTOKEN'),
      }
    };
    fetch(API_URL + "/articles/1", options, {
    })
      .then(res => res.json())
      .then((result) => {
      });
  };

  if(!activeTab || !rules_en) return <PageLoading />
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
                id={'rules_ru'}
                active={(activeTab == 'rules_ru')}
                onClick={toggle}
              >
                По русски</NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id={'rules_en'}
                active={(activeTab == 'rules_en')}
                onClick={toggle}
              >
                In english</NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId={'rules_ru'} >
                <Editor
                  id={'rules_ru_textarea'}
                  editorState={rules_ru}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName border border-light px-1"
                  onEditorStateChange={handle_rules_ru}
                />
            </TabPane>
            <TabPane  tabId={'rules_en'} >
              <Editor
                id={'rules_ru_textarea'}
                editorState={rules_en}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName border border-light px-1"
                onEditorStateChange={handle_rules_en}
              />
            </TabPane>
          </TabContent>
          </Form>
        </CardBody>
      </Card>
    </Container>
  )
}
