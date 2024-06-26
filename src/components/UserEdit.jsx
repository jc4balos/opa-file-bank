import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Context } from "../App";
import { AccessLevelService } from "../service/AccessLevelService";
import { UserService } from "../service/UserService";

export const UserEdit = (props) => {
  const [accessLevels, setAccessLevels] = useState([]);
  const { successModal, errorModal } = useContext(Context);

  useEffect(() => {
    getAllAccessLevels();
  }, []);

  const getAllAccessLevels = async () => {
    const accessLevelService = new AccessLevelService();
    const response = await accessLevelService.getAllAccessLevels();
    const data = await response.json();

    if (response.ok) {
      setAccessLevels(data);
    } else {
      errorModal.showErrorModal(data);
    }
  };

  const modifyUser = async () => {
    const userService = new UserService();
    const data = {
      userId: props.userId,
      firstName: props.userFirstName,
      middleName: props.userMiddleName,
      lastName: props.userLastName,
      password: props.userPassword,
      active: true,
      userName: props.userName,
      title: props.userTitle,
      accessLevelId: props.userAccessLevelId,
    };
    const response = await userService.modifyUser(JSON.stringify(data));
    if (response.ok) {
      successModal.showSuccessModal("User updated successfully");
      props.closeUserEditModal();
      props.setIsReloaded(false);
    } else {
      const data = await response.json();
      errorModal.showErrorModal(data);
    }
  };

  return (
    <div>
      <Modal
        className="shadow"
        centered
        backdrop="static"
        keyboard={false}
        show={props.showUserEditModal}
        onHide={props.closeUserEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="mb-3"
              value={props.userFirstName}
              onChange={(e) => {
                props.setUserFirstName(e.target.value);
              }}
              type="text"
            />

            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              className="mb-3"
              value={props.userMiddleName}
              onChange={(e) => {
                props.setUserMiddleName(e.target.value);
              }}
              type="text"
            />

            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="mb-3"
              value={props.userLastName}
              onChange={(e) => {
                props.setUserLastName(e.target.value);
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
              className="mb-3"
              value={props.userTitle}
              onChange={(e) => {
                props.setUserTitle(e.target.value);
              }}
              type="text"
            />

            <Form.Label>Access Level</Form.Label>
            <Form.Select
              value={props.userAccessLevelId}
              onChange={(e) => {
                props.setUserAccesslevelId(e.target.value);
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
              modifyUser();
            }}
            variant="secondary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
