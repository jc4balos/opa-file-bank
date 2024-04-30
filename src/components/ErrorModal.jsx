import { React, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BasicSpinner } from "./Spinners";

const ErrorModal = (props) => {
  const [errorMessages, setErrorMessages] = useState(props.errorMessages);
  useEffect(() => {
    setErrorMessages(props.errorMessages);
  }, [props.errorMessages]);

  return (
    <Modal
      centered
      backdrop="static"
      keyboard={false}
      onHide={props.closeErrorModal}
      show={props.showErrorModal}>
      <Modal.Header className="bg-danger text-light" closeButton>
        <Modal.Title>{props.errorModalHeading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Array.isArray(errorMessages) ? (
          <ul>
            {errorMessages.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        ) : typeof errorMessages === "object" ? (
          <ul>
            {Object.entries(errorMessages).map(([key, value], index) => (
              <li key={index}>{value} </li>
            ))}
          </ul>
        ) : (
          <p>{errorMessages}</p>
        )}

        {props.showErrorModalLoading && (
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
        <Button variant="secondary" onClick={props.closeErrorModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ErrorModal };
