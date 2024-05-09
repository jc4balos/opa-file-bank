import React, { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Context, FolderContext } from "../App";
import { FolderService } from "../service/FolderService";

export const ModifyFolderModal = (props) => {
  const { errorModal, successModal, fullScreenLoading, infoModal } =
    useContext(Context);

  const { folderId } = useContext(FolderContext);
  const currentFolderId = parseInt(folderId);

  const confirmModifyFolder = (onModify) => {
    infoModal.showInfoModal(
      "Modify Folder",
      "Are you sure you want to modify this folder?",
      onModify,
      "Modify Folder"
    );
  };
  const modifyFolder = async () => {
    fullScreenLoading.show();
    const folderService = new FolderService();
    const data = {
      folderName: props.folderName,
      folderDescription: props.folderDescription,
    };

    const response = await folderService.modifyFolder(data, props.folderId);
    if (response.status === 200) {
      props.closeModifyFolderModal();
      infoModal.closeInfoModal();
      props.fetchFilesAndFolders(currentFolderId);
      successModal.showSuccessModal("Folder modified successfully");
      fullScreenLoading.close();
    } else {
      const data = response.json();
      infoModal.closeInfoModal();
      errorModal.showErrorModal(data);
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
        show={props.showModifyFolderModal}
        onHide={props.closeModifyFolderModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="folderName">
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                maxLength={100}
                placeholder="Enter Folder Name"
                value={props.folderName}
                onChange={(e) => {
                  props.setFolderName(e.target.value);
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
                value={props.folderDescription}
                placeholder="Say something about this folder."
                onChange={(e) => {
                  props.setFolderDescription(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={props.closeModifyFolderModal}>
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              confirmModifyFolder(() => {
                modifyFolder();
              });
            }}>
            Modify Folder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
