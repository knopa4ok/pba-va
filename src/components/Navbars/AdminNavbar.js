import React,{useState, useEffect} from "react";
import {API_URL} from "../../CONSTANTS";
import {
  Card,
  CardBody,
  Collapse,
  Nav,
  NavbarBrand,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
import shortid from 'shortid';
import StaffSelect from "../../views/Modal/StaffSelect";

export default function AdminNavbar({...props}){
  const [collapseOpen, setCollapse] = useState(true);
  const [modalContent, setModalContent] = useState(false);
  const toggleCollapse = () =>{setCollapse(!collapseOpen);};
  const toggleModal = (f) => {
    if (!modalContent) {
      setModalContent(f);
    } else {
      setModalContent(false)
    }
  };
  const getContent = () =>{
    switch(modalContent){
      case 'staff':
        return <StaffSelect toggleModal={toggleModal} pilot={props.pilot}/>
        break;
      default:
        return <ModalBody ></ModalBody>
        break;
    }
  };

  if(!props.user.access)return;
  return (
    <>
    <Card className={'card-profile shadow mt-3'} >
      <CardBody className={'p-0'}>
        <Nav
          className="flex-column navbar-light bg-white"
          expand={'sm'}>
            <NavItem key={shortid()} className='p-2' style={{cursor: 'pointer'}}>
              <NavLink style={{fontSize: '0.8vw'}} onClick={(e) => toggleModal('staff')}>
                <i className="fa fa-users text-info fa-lg mr-3"/>
                { localStorage.getItem('language') == 'ru'? 'Add to staff' : 'Назначить  в стафф' }
              </NavLink>
            </NavItem>
            <NavItem key={shortid()} className='p-2' style={{cursor: 'pointer'}}>
              <NavLink style={{fontSize: '0.8vw'}}>
                <i className="fa fa-globe fa-lg text-info mr-3"/>
                {localStorage.getItem('language') == 'ru'? "Change pilot location": "Переместить пилота" }
              </NavLink>
            </NavItem>
        </Nav>
      </CardBody>
    </Card>
    <Modal color='primary' toggle={toggleModal} isOpen={modalContent != false}>
      {getContent()}
    </Modal>
    </>
  );
};
