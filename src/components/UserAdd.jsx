import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AccessLevelService } from "../service/AccessLevelService";
import { UserService } from "../service/UserService";

export const UserAdd = (props) => {
  const [accessLevels, setAccessLevels] = useState([]);

  useEffect(() => {
    getAllAccessLevels();
  }, []);

  const getAllAccessLevels = async () => {
    const accessLevelService = new AccessLevelService();
    const response = await accessLevelService.getAllAccessLevels();
    const data = await response.json();

    if (response.ok) {
      setAccessLevels(data);
      if (props.userAccessLevelId === null) {
        props.setUserAccessLevelId(1);
        console.log("accessLevlid:" + props.userAccessLevelId);
      }
    } else {
      props.showErrorModal(data);
    }
  };

  const addUser = async () => {
    const userService = new UserService();
    const data = {
      firstName: props.userFirstName,
      middleName: props.userMiddleName,
      lastName: props.userLastName,
      userName: props.userName,
      password: props.userPassword,
      title: props.userTitle,
      accessLevelId: props.userAccessLevelId,
      active: true,
    };
    console.log(data);
    const response = await userService.addUser(JSON.stringify(data));
    if (response.ok) {
      const data = await response.json();
      props.showSuccessModal(data);
      props.closeUserAddModal();
      props.fetchUsers();
    } else {
      const data = await response.json();
      props.showErrorModal(data);
    }
  };

  return (
    <div>
      <Modal
        className="shadow"
        centered
        backdrop="static"
        keyboard={false}
        show={props.showUserAddModal}
        onHide={props.closeUserAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="Juan"
              className="mb-3"
              value={props.userFirstName}
              onChange={(e) => {
                props.setUserFirstName(e.target.value);
              }}
              type="text"
            />

            <Form.Label className="d-flex align-items-center">
              Middle Name <small className="text-muted">(Optional)</small>
            </Form.Label>
            <Form.Control
              placeholder="Aguinaldo"
              className="mb-3"
              value={props.userMiddleName}
              onChange={(e) => {
                props.setUserMiddleName(e.target.value);
              }}
              type="text"
            />

            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Dela Cruz"
              className="mb-3"
              value={props.userLastName}
              onChange={(e) => {
                props.setUserLastName(e.target.value);
              }}
              type="text"
            />

            <Form.Label>Username</Form.Label>
            <Form.Control
              className="mb-3"
              placeholder="juanDelaCruz"
              value={props.userName}
              onChange={(e) => {
                props.setUserName(e.target.value);
              }}
              type="text"
            />

            <Form.Label>Password</Form.Label>
            <Form.Control
              className="mb-3"
              value={props.userPassword}
              onChange={(e) => {
                props.setUserPassword(e.target.value);
              }}
              type="password"
            />

            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Agriculturist I"
              className="mb-3"
              value={props.userTitle}
              onChange={(e) => {
                props.setUserTitle(e.target.value);
              }}
              type="text"
            />

            <Form.Label>Access Level</Form.Label>
            <Form.Select
              onChange={(e) => {
                props.setUserAccessLevelId(e.target.value);
              }}>
              {accessLevels.map((accessLevel) => {
                return (
                  <option
                    value={accessLevel.accessLevelId}
                    key={accessLevel.accessLevelId}>
                    {accessLevel.accessLevelName}
                  </option>
                );
              })}
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={props.closeUserEditModal}>
            Close
          </Button>
          <Button
            onClick={() => {
              addUser();
            }}
            variant="secondary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
