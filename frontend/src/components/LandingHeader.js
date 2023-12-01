import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/headerStyles.css'; 
import logoImage from '../assets/images/logo-1.png';
import userImage from '../assets/images/user.png';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Form, InputGroup, Image, Dropdown, Collapse, DropdownItem, Col} from "react-bootstrap";
import { userContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { getContextUser, setContextUser} = useContext(userContext);
    const user = getContextUser()
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState(null);
    const [open, setOpen] = useState(false);

    const isLoggedIn = !!user.accessToken

    let profileUrl;
    if (user?.contextUserType === "shelter")
        profileUrl = `/shelterprofile/${user?.contextUserId}`
    else if (user?.contextUserType === "seeker")
        profileUrl = `/seekerprofile/${user?.contextUserId}`

    useEffect(function () {
      async function fetchNotifications() {
          try {
              const response = await fetch(`http://localhost:8000/notifications?read=False`, {
                  method: 'GET',
                  headers: {
                        'Authorization': `Bearer ${user.accessToken}`,
                  }
              });

              if (response.status >= 200 && response.status < 300) {
                  const data = await response.json();
                  console.log(data)
                  setNotifications(data)
              } else if (response.status === 404) {
                  alert(404);
              } else {
                  console.log(response.status)
              }
          } catch (e) {
              console.log(e);
          }
      }
      fetchNotifications().then((res) => console.log("notifications loaded"))
    }, []);


    const logout = () => {
        setContextUser({})
        navigate("/")
    }

    const NotificationItem = (props) => {
      const notification = props.notification;
      const id = notification.object_id;
      switch (notification.notification_type) {
          case "status_update":
              return <DropdownItem className="text-wrap" href={`/applications/${id}`}>Application status updated!</DropdownItem>
          case "application_creation":
              return <DropdownItem className="text-wrap" href={`/applications/${id}`}>New application was created for you!</DropdownItem>
          case "new_review":
              // TODO: make it to proper id
              return <DropdownItem className="text-wrap" href={`/shelterprofile/${id}`}>New review!</DropdownItem>
          case "new_message":
              // TODO: make it to proper id
              return <DropdownItem className="text-wrap" href={`/applications/${id}`}>New message for your application!</DropdownItem>
          case "new_pet_listing":
              return <DropdownItem className="text-wrap" href={`/pet/${id}`}>New pet added!</DropdownItem>
          default:
              return <DropdownItem className="text-wrap">New notification!</DropdownItem>
      }
    }

    return (
    <Navbar expand="lg" className="bg-white shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logoImage} width="150" alt="logo"/>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarSupportedContent"></Navbar.Toggle>

        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto" activeKey={window.location.pathname}>
              {(!isLoggedIn || user.contextUserType === "seeker") && <>
              <Nav.Item>
                <Form
                  role="search"
                  style={{ width: '400px', minWidth: '35%', maxWidth: '90%' }}
                  action="/searchpage"
                >
                  <InputGroup>
                    <Form.Control
                      type="search"
                      placeholder="Search pets here..."
                      aria-label="Search"
                      aria-describedby="search-btn"
                      required
                    />
                    <Button variant="outline-success" type="submit" id="search-btn">Search
                    </Button>
                  </InputGroup>
                </Form>
              </Nav.Item>
              <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link href="/shelters">All shelters</Nav.Link></Nav.Item>
              </>}
              {user.contextUserType === "shelter" && <>
                  <Nav.Item>
                      <Nav.Link href="/mypets">My Pets</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link href="/applications">Applications</Nav.Link>
                  </Nav.Item>
              </>
              }
              <hr className="mobile-nav-item"></hr>

              {!isLoggedIn && <>
                  <Nav.Item className="mobile-nav-item">
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                  <Nav.Item className="mobile-nav-item">
                    <Nav.Link href="/signup">Sign up</Nav.Link>
                  </Nav.Item></>}
              {isLoggedIn && <>
              <Nav.Item>
                  <Nav.Link className="mobile-nav-item" href={profileUrl}>Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item className="mobile-nav-item">
                <Nav.Link onClick={() => setOpen(!open)}>Notifications</Nav.Link>
                <Collapse in={open}>
                    <div className="ms-4">
                        {notifications?.map((item, index) => <NotificationItem className="nav-link" key={index} notification={item}></NotificationItem>)}
                        {notifications?.length === 0 && <div className="text-wrap">No notifications...</div>}
                    </div>
                </Collapse>
              </Nav.Item>
              <hr></hr>
              <Nav.Item>
                    <Nav.Link className="mobile-nav-item" onClick={logout}>Logout</Nav.Link>
              </Nav.Item>
              </>}
          </Nav>

          {!isLoggedIn && <div className="ms-auto">
              <Link to="/login" className="btn btn btn-outline-primary me-2 def-nav-item" role="button">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary def-nav-item" role="button">
                Sign up
              </Link>
          </div>}
          {isLoggedIn && <div className="ms-auto d-flex" style={{marginRight: "6rem"}}>
              <Dropdown className="my-auto def-nav-item">
                  <Dropdown.Toggle className="d-flex" variant="" type="button" data-bs-toggle="dropdown">
                      {/*https://icons.getbootstrap.com/icons/bell/*/}
                      <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor"
                          className="bi bi-bell me-2 text-secondary" viewBox="0 0 16 16">
                          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                      </svg>
                      {!(notifications?.length === 0) &&
                          <span className="badge bg-danger"
                            style={{transform: "translate(-25px, -4px) scale(0.8)", marginRight: "-25px"}}>{notifications?.length}
                          </span>
                      }
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu">
                      {notifications?.map((item, index) => <NotificationItem className="dropdown-item text-wrap" key={index} notification={item}></NotificationItem>)}
                      {notifications?.length === 0 && <Dropdown.Item className="text-wrap" href="#">No notifications...</Dropdown.Item>}
                  </Dropdown.Menu>
              </Dropdown>
              <div className="vr mx-2 def-nav-item"></div>
              <Dropdown className="my-auto def-nav-item">
                  <Dropdown.Toggle type="button" variant="" data-bs-toggle="dropdown">
                      <Image className="border rounded-circle" src={userImage}
                             style={{backgroundColor: "cornsilk", width: "50px"}} alt="user icon"></Image>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item href={profileUrl}>Profile</Dropdown.Item>
                      <Dropdown.Item>
                        <hr></hr>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
          </div>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default Header;

