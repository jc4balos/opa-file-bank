import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const UserEdit = (props) => {
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
            <Form.Control className="mb-3" type="text" />

            <Form.Label>Middle Name</Form.Label>
            <Form.Control className="mb-3" type="text" />

            <Form.Label>Last Name</Form.Label>
            <Form.Control className="mb-3" type="text" />

            <Form.Label>Title</Form.Label>
            <Form.Control className="mb-3" type="text" />

            <Form.Label>Access Level</Form.Label>
            <Form.Select></Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={props.closeUserEditModal}>
            Close
          </Button>
          <Button variant="secondary" onClick={() => {}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
