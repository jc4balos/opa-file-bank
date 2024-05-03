import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Context, FolderContext } from "../App";
import { FolderService } from "../service/FolderService";

export const NewFolder = (props) => {
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const { errorModal, successModal, fullScreenLoading } = useContext(Context);

  const { folderId } = useContext(FolderContext);
  const currentFolderId = parseInt(folderId);

  const addFolder = async () => {
    fullScreenLoading.show();
    const folderService = new FolderService();
    const data = {
      folderName: folderName,
      folderDescription: folderDescription,
      folderParentId: currentFolderId,
    };
    try {
      const response = await folderService.addFolder(data);
      if (response.ok) {
        successModal.showSuccessModal("Folder Added Successfully");
        props.showNewFolderModal(false);
      } else {
        const data = await response.json();
        const stringArray = data.map((item) => JSON.stringify(item));

        errorModal.showErrorModal(stringArray.join("\n"));
      }
    } catch (error) {
      errorModal.showErrorModal(JSON.stringify(error.message));
    } finally {
      props.fetchFilesAndFolders(currentFolderId);
      fullScreenLoading.close();
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
          <Button variant="outline-danger" onClick={props.closeNewFolderModal}>
            Close
          </Button>
          <Button
            variant="secondary"
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
