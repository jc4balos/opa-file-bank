import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../App";
import { Navigation } from "../components/Navigation";
import { SideNav } from "../components/SideNav";
import "../css/global.css";

export const Trash = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const { errorModal, userData, fullScreenLoading, session } =
    useContext(Context);

  useEffect(() => {
    session.fetchSessionData(location);

    if (userData.userId) {
    }
  }, [userData.userId]);

  return (
    <div>
      <Navigation />
      <div className="m-lg-3 m-1">
        <Row>
          <Col className="d-none d-lg-flex" lg="2">
            <SideNav />
          </Col>
          <Col lg="10"></Col>
        </Row>
      </div>
    </div>
  );
};
