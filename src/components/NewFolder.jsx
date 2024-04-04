import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FolderService } from "../service/FolderService";

export const NewFolder = (props) => {
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");

  const parentFolderId = props.currentFolderId;
  console.log(parentFolderId);

  const addFolder = async () => {
    const folderService = new FolderService();
    const data = {
      folderName: folderName,
      folderDescription: folderDescription,
      folderParentId: parentFolderId,
    };
    try {
      const response = await folderService.addFolder(data);
      console.log("executed");
      if (response.ok) {
        props.showSuccessModal("Folder Added Successfully");
        props.showNewFolderModal(false);
      } else {
        const data = await response.json();
        const stringArray = data.map((item) => JSON.stringify(item));

        props.showErrorModal(stringArray.join("\n"));
      }
    } catch (error) {
      props.showErrorModal(JSON.stringify(error.message));
    }
  };

  return (
    <div>
      <Modal
        className="shadow"
        centered
        backdrop="static"
        keyboard={false}
        show={props.showNewFolderModal}
        onHide={props.closeNewFolderModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="folderName">
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                maxLength={100}
                placeholder="Enter Folder Name"
                onChange={(e) => {
                  setFolderName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="folderDescription">
              <Form.Label>Folder Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={2000}
                type="textarea"
                placeholder="Say something about this folder."
                onChange={(e) => {
                  setFolderDescription(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeNewFolderModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addFolder();
            }}>
            Create Folder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
