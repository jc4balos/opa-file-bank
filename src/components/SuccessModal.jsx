import { React, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const SuccessModal = (props) => {
  const [SuccessMessages, setSuccessMessages] = useState(props.successMessages);
  console.log(SuccessMessages);
  useEffect(() => {
    setSuccessMessages(props.successMessages);
  });

  return (
    <div>
      <Modal
        centered
        backdrop="static"
        keyboard={false}
        cancel={props.closeSuccessModal}
        show={props.showSuccessModal}
        onHide={props.closeSuccessModal}>
        <Modal.Header className="bg-success text-light" closeButton>
          <Modal.Title>{props.successModalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="d-block">{props.successMessages}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { SuccessModal };
