import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const Navigation = () => {
  return (
    <Navbar  expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
      <img src="logo.png" style={{height: "40px"}} className="pe-lg-3 p-1"></img>
        <Navbar.Brand href="#home">
          
          <span>OPA File Bank</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
