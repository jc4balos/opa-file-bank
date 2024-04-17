import { React, useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

const SuccessModal = (props) => {
  const [SuccessMessages, setSuccessMessages] = useState(props.successMessages);
  console.log(SuccessMessages);
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
        <span className="d-block">{props.successMessages}</span>
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
