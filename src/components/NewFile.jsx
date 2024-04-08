import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FileService } from "../service/FileService";

export const NewFile = (props) => {
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const fileInput = useRef();

  const parentFolderId = props.currentFolderId;

  const addFile = async () => {
    const fileService = new FileService();
    const formData = new FormData();
    if (!fileInput.current.files[0]) {
      props.showErrorModal("Please select a file to upload");
      return;
    }
    formData.append("multipartFile", fileInput.current.files[0]);
    formData.append("fileName", fileName);
    if (fileName === "") {
      const newFileName = fileInput.current.files[0].name;

      formData.set("fileName", newFileName);
    }

    formData.append("description", fileDescription);
    formData.append("folderId", parentFolderId);

    try {
      const response = await fileService.uploadFile(formData);

      if (response.ok) {
        props.showSuccessModal("File Added Successfully");
        props.closeNewFileModal();
      } else {
        const data = await response.json();
        const stringArray = data.map((item) => JSON.stringify(item));

        props.showErrorModal(stringArray.join("\n"));
      }
    } catch (error) {
      props.showErrorModal(JSON.stringify(error.message));
    } finally {
      props.fetchFilesAndFolders();
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
