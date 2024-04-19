import { React, useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

const SuccessModal = (props) => {
  const [successMessages, setSuccessMessages] = useState(props.successMessages);
  useEffect(() => {
    setSuccessMessages(props.successMessages);
  }, [props.successMessages]);

  return (
    <Modal
      centered
      backdrop="static"
      keyboard={false}
      show={props.showSuccessModal}
      onHide={props.closeSuccessModal}>
      <Modal.Header className="bg-success text-light" closeButton>
        <Modal.Title>{props.successModalHeading}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {Array.isArray(successMessages) ? (
          <ul>
            {successMessages.map((successMessage, index) => (
              <li key={index}>{successMessage}</li>
            ))}
          </ul>
        ) : typeof successMessages === "object" ? (
          <ul>
            {Object.entries(successMessages).map(([key, value], index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        ) : (
          <p>{successMessages}</p>
        )}
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeSuccessModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { SuccessModal };
