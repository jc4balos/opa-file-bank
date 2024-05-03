import React, { useContext, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Context, FolderContext } from "../App";
import { FileService } from "../service/FileService";

export const NewFile = (props) => {
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const fileInput = useRef();
  const { errorModal, successModal, fullScreenLoading } = useContext(Context);
  const { folderId } = useContext(FolderContext);
  const currentFolderId = parseInt(folderId);

  const addFile = async () => {
    fullScreenLoading.show();
    const fileService = new FileService();
    const formData = new FormData();
    if (!fileInput.current.files[0]) {
      errorModal.showErrorModal("Please select a file to upload");
      fullScreenLoading.close();
      return;
    }
    formData.append("multipartFile", fileInput.current.files[0]);
    formData.append("fileName", fileName);
    if (fileName === "") {
      const newFileName = fileInput.current.files[0].name;
      const formattedFileName = newFileName.substr(
        0,
        newFileName.lastIndexOf(".")
      );

      formData.set("fileName", formattedFileName);
    }

    formData.append("description", fileDescription);
    formData.append("folderId", currentFolderId);

    try {
      const response = await fileService.uploadFile(formData);

      if (response.ok) {
        successModal.showSuccessModal("File Added Successfully");
        props.closeNewFileModal();
      } else {
        const data = await response.json();
        const stringArray = data.map((item) => JSON.stringify(item));
        errorModal.showErrorModal(stringArray.join("\n"));
      }
    } catch (error) {
      errorModal.showErrorModal(JSON.stringify(error.message));
    } finally {
      props.fetchFilesAndFolders(folderId);
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
        show={props.showNewFileModal}
        onHide={props.closeNewFileModal}>
        <Modal.Header closeButton>
          <Modal.Title>New File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="folderName">
              <Form.Label>File</Form.Label>
              <Form.Control
                name="multipartFile"
                ref={fileInput}
                type="file"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="folderName">
              <Form.Label>
                Custom File Name{" "}
                <small className="font-italic">(Optional)</small>
              </Form.Label>
              <Form.Control
                type="text"
                name="fileName"
                maxLength={100}
                placeholder="Enter Folder Name"
                onChange={(e) => {
                  setFileName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="folderDescription">
              <Form.Label>File Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                maxLength={2000}
                type="textarea"
                placeholder="Say something about this folder."
                onChange={(e) => {
                  setFileDescription(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={props.closeNewFileModal}>
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              addFile();
            }}>
            Add File
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
