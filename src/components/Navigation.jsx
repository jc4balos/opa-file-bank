import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";
import { Context } from "../App";

export const Navigation = () => {
  const sessionId = Cookies.get("SESSION");
  const { userData, session } = useContext(Context);
  const location = useLocation();

  const [fetchedAccessLevelId, setFetchedAccessLevelId] = useState(null);

  useEffect(() => {
    initNavigation();
  }, []);

  const initNavigation = async () => {
    const sessionData = await session.fetchSessionData(location);
    setFetchedAccessLevelId(await sessionData.accessLevelId);
  };

  const logOut = () => {
    Cookies.remove("SESSION");
    window.location.href = "/login";
  };

  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <img
          src="logo.png"
          alt="logo"
          style={{ height: "40px" }}
          className="pe-lg-3 p-1"></img>
        <Navbar.Brand href="/dashboard">
          <span>OPA File Bank</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link
              href="/admin"
              className={fetchedAccessLevelId != 1 ? "d-none" : ""}>
              Admin
            </Nav.Link>
            <Nav.Link className="d-lg-none">Profile</Nav.Link>
            <Nav.Link href="/trash" className="">
              Trash
            </Nav.Link>

            {sessionId && (
              <Nav.Link
                className="d-lg-none"
                onClick={() => {
                  logOut();
                }}>
                Log Out
              </Nav.Link>
            )}

            {!sessionId && (
              <Nav.Link className="d-lg-none" href="/login">
                Log In
              </Nav.Link>
            )}
          </Nav>
          <Dropdown align={{ lg: "end" }} className="d-none d-lg-grid">
            <Dropdown.Toggle id="dropdown-basic">
              <FontAwesomeIcon icon={faCog} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>

              {sessionId && (
                <Dropdown.Item
                  onClick={() => {
                    logOut();
                  }}>
                  Log Out
                </Dropdown.Item>
              )}
              {!sessionId && <Dropdown.Item>Log In</Dropdown.Item>}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
