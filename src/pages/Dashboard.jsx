import { useEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { Navigation } from "../components/Navigation";
import { SessionService } from "../service/SessionService";

export const Dashboard = () => {
  return (
    <div>
      <Navigation />
      <Container>
        <Row>
          <Col lg="2">
            <SideNav />
          </Col>
          <Col lg="10"></Col>
        </Row>
      </Container>
    </div>
  );
};

const SideNav = () => {
  const [userFullName, setUserFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userTitle, setUserTitle] = useState("");

  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionService = new SessionService();
      const response = await sessionService.getSessionData();

      if (response.status === 200) {
        const data = await response.json();
        setUserFullName(data.userFullName);
        setUserName(data.userName);
        setUserTitle(data.userTitle);
      }
    };

    fetchSessionData();
  }, [userFullName, userName, userTitle]);

  return (
    <Stack className="">
      <span className="fw-bold text-center">{userFullName}</span>
      <small className="text-center">{userTitle}</small>
      <small className="text-muted text-center">@{userName}</small>
    </Stack>
  );
};
