import React, {useReducer} from "react";
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Modal,
} from "reactstrap";
import shortid from 'shortid';
import StaffSelect from "../../views/Modal/StaffSelect";
import LocationChange from "../../views/Modal/LocationChange";

export default function AdminNavbar({...props}) {
  const [modalContent, setModalContent] = useReducer(modalSwitch, {content: false});
  const toggleModal = (f) => {
    if (!modalContent) {
      setModalContent(f);
    } else {
      setModalContent(false)
    }
  };

  function modalSwitch(state, action) {
    switch (action) {
      case 'staff':
        return {content: <StaffSelect toggleModal={() => setModalContent(false)} pilot={props.pilot}/>};
        break;
      case 'location':
        return {content: <LocationChange toggleModal={() => setModalContent(false)} pilot={props.pilot}/>}
        break;
      case false:
        window.location.pathname = window.location.pathname;
        break;
      default:
        return {content: action};
    }
  }

  if(!props.user.access)return;
  return (
    <>
    <Card className={'card-profile shadow mt-3'} >
      <CardBody className={'p-0'}>
        <Nav
          className="flex-column navbar-light bg-white"
          expand={'sm'}>
          <NavItem key={shortid()} className='p-2' style={{cursor: 'pointer'}}>
            <NavLink style={{fontSize: '0.8vw'}} onClick={() => {
              setModalContent('staff')
            }}>
              <i className="fa fa-users text-info fa-lg mr-3"/>
              {localStorage.getItem('language') == 'ru' ? 'Add to staff' : 'Назначить  в стафф'}
            </NavLink>
          </NavItem>
          <NavItem key={shortid()} className='p-2' style={{cursor: 'pointer'}}>
            <NavLink style={{fontSize: '0.8vw'}} onClick={() => {
              setModalContent('location')
            }}>
              <i className="fa fa-globe fa-lg text-info mr-3"/>
              {localStorage.getItem('language') == 'ru' ? "Change pilot location" : "Переместить пилота"}
            </NavLink>
          </NavItem>
        </Nav>
      </CardBody>
    </Card>
      <Modal color='primary' toggle={toggleModal} isOpen={modalContent.content != false}>
        {modalContent.content}
      </Modal>
    </>
  );
};
