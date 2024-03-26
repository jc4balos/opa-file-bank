import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Row } from "react-bootstrap";

import { Navigation } from "../components/Navigation";

export const Login = ()=>{
    return(
        <div>
            <Navigation />
            <LoginForm />
        </div>
    );

}

const LoginForm = () =>{

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  

    return(

      

      <Container className ="p-lg-5 p-1 ">
        <Row>

        <Col>
            <Card>
              <CardHeader className="fw-bold text-light d-flex justify-content-center bg-primary"><span>Login</span></CardHeader>
            <CardBody>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label className="fw-bold">Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="fw-bold">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <p className="text-muted small" >Contact administrator for credentials</p>
                <div>
                  <Button variant="secondary" type="submit">
                      Submit
                  </Button>
                </div>
            </Form>
            </CardBody>
          </Card>
          </Col>
          <Col className="align-items-center">
          
          </Col>
   


        </Row>
     
      </Container>
       
    );


}