import { React, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BasicSpinner } from "./Spinners";

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

        {props.showSuccessModalLoading && (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              height: "30vh",
              fontSize: "10px",
              transform: "scale(2, 2)",
            }}>
            <BasicSpinner />
          </div>
        )}
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
