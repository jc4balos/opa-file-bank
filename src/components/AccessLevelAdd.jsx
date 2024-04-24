import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Context } from "../App";
import { AccessLevelService } from "../service/AccessLevelService";

export const AccessLevelAdd = (props) => {
  const { infoModal, errorModal, successModal } = useContext(Context);
  const [
    infoModalState,
    setInfoModalState,
    infoModalHeading,
    setInfoModalHeading,
    infoModalMessage,
    setInfoModalMessage,
    infoModalAction,
    setInfoModalAction,
    infoModalActionText,
    setInfoModalActionText,
  ] = infoModal;

  const [errorData, setErrorData, errorModalState, setErrorModalState] =
    errorModal;

  const [successData, setSuccessData, successModalState, setSuccessModalState] =
    successModal;

  const [accessLevelName, setAccessLevelName] = useState("");

  const addAccessLevel = async () => {
    const data = { accessLevelName: accessLevelName };
    const accessLevelService = new AccessLevelService();

    try {
      const response = await accessLevelService.addAccessLevel(
        JSON.stringify(data)
      );

      if (response.ok) {
        setSuccessData("Access Level successfully added");
        setSuccessModalState(true);
        props.closeAddAccessLevelModal();
      } else {
        const responseData = await response.json();
        setErrorData(responseData);
        setErrorModalState(true);
      }
    } catch (error) {
      console.error("Error adding access level:", error);
      setErrorData({
        message: "An error occurred while adding the access level.",
      });
      setErrorModalState(true);
    }
  };

  return (
    <div>
      <Modal
        className="shadow"
        centered
        backdrop="static"
        keyboard={false}
        show={props.showAddAccessLevelModal}
        onHide={props.closeAddAccessLevelModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Access Level</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Access Level Name</Form.Label>
            <Form.Control
              className="mb-3"
              value={accessLevelName}
              onChange={(e) => {
                setAccessLevelName(e.target.value);
              }}
              type="text"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={props.closeAddAccessLevelModal}>
            Close
          </Button>
          <Button
            onClick={() => {
              addAccessLevel();
            }}
            variant="secondary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
