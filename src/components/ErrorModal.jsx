import { React, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
            {errorMessages.map((errorMessage, index) => {
              return <li key={index}>{errorMessage}</li>;
            })}
          </ul>
        ) : (
          <p>{errorMessages}</p>
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
