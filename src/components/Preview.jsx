import React from "react";
import { Button, Modal } from "react-bootstrap";

export const PreviewFile = (props) => {
  return (
    <div>
      <Modal
        className="shadow"
        centered
        backdrop="static"
        keyboard={false}
        show={props.showInfoModal}
        onHide={props.closeInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.infoModalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.infoModalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeInfoModal}>
            Close
          </Button>
          <Button variant="primary" onClick={props.infoModalAction}>
            {props.infoModalActionText}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
