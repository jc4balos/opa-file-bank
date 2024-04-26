import { useContext, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Context } from "../App";
import { Navigation } from "../components/Navigation";
import { LoginService } from "../service/LoginService";

export const Login = (props) => {
  return (
    <div>
      <Navigation />
      <LoginForm />
    </div>
  );
};

const LoginForm = (props) => {
  const { infoModal, errorModal, successModal, userData, previewModal } =
    useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async (event) => {
    event.preventDefault();
    const data = {
      userName: username,
      password: password,
    };
    const loginService = new LoginService();
    try {
      const response = await loginService.login(data);
      if (response.ok) {
        const data = await response.json();
        await successModal.showSuccessModal(data.message);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        const data = await response.json();
        await errorModal.showErrorModal(data.message);
      }
    } catch (error) {
      errorModal.showErrorModal(JSON.stringify(error.message));
    }
  };

  return (
    <Container className="p-lg-5 p-1 ">
      <Row>
        <Col>
          <Card>
            <CardHeader className="fw-bold text-light d-flex justify-content-center bg-primary">
              <span>Login</span>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitLogin}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label className="fw-bold">Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Enter Username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="fw-bold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <p className="text-muted small">
                  Contact administrator for credentials
                </p>
                <div>
                  <Button variant="secondary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col className="align-items-center d-none d-lg-grid"></Col>
      </Row>
    </Container>
  );
};
