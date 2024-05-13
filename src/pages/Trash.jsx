import {
  faFile,
  faFolder,
  faTrash,
  faTrashAlt,
  faTrashRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Dropdown,
  FormCheck,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Context } from "../App";
import { Navigation } from "../components/Navigation";
import { SideNav } from "../components/SideNav";
import "../css/global.css";
import { AdminService } from "../service/AdminService";

export const Trash = () => {
  const location = useLocation();

  const {
    errorModal,
    userData,
    fullScreenLoading,
    session,
    infoModal,
    successModal,
  } = useContext(Context);

  const [deletedFiles, setDeletedFiles] = useState([]);
  const [deletedFolders, setDeletedFolders] = useState([]);

  useEffect(() => {
    fullScreenLoading.show();
    session.fetchSessionData(location);

    if (userData.userId) {
      getAllTrashFiles();
    }
    fullScreenLoading.close();
  }, [userData.userId]);

  const getAllTrashFiles = async () => {
    const adminService = new AdminService();
    const response = await adminService.getAllTrashFiles();
    if (response.status === 200) {
      const data = await response.json();
      setDeletedFiles(data.files);
      setDeletedFolders(data.folders);
      console.log(data);
    } else {
      const data = await response.json();
      errorModal.showErrorModal(data);
    }
  };

  const [foldersToDelete, setFoldersToDelete] = useState(new Set());
  const [filesToDelete, setFilesToDelete] = useState(new Set());

  const handleFolderCheckChange = (event, folderId) => {
    const updatedFoldersToDelete = new Set(foldersToDelete);
    if (event.target.checked) {
      updatedFoldersToDelete.add(folderId);
    } else {
      updatedFoldersToDelete.delete(folderId);
    }
    setFoldersToDelete(updatedFoldersToDelete);
  };

  const handleFileCheckChange = (event, fileId) => {
    const updatedFilesToDelete = new Set(filesToDelete);
    if (event.target.checked) {
      updatedFilesToDelete.add(fileId);
    } else {
      updatedFilesToDelete.delete(fileId);
    }
    setFilesToDelete(updatedFilesToDelete);
  };

  const confirmDeleteFiles = (onDelete) => {
    const fileCount = filesToDelete.size + foldersToDelete.size;
    infoModal.showInfoModal(
      "Delete Files",
      `We are going to delete ${fileCount} files. Are you sure you want to proceed?`,
      onDelete,
      `Delete Permanently (${fileCount} files)`
    );
  };

  const deleteFilesAndFoldersPermanent = async () => {
    console.log("executed");
    fullScreenLoading.show();
    const adminService = new AdminService();
    const response = await adminService.deleteTrashFiles(
      Array.from(foldersToDelete.values()).map(Number),
      Array.from(filesToDelete.values()).map(Number)
    );
    if (response.status === 200) {
      const data = await response.json();
      infoModal.closeInfoModal();
      successModal.showSuccessModal(data);
      setFoldersToDelete(new Set());
      setFilesToDelete(new Set());
    } else {
      const data = await response.json();
      errorModal.showErrorModal(data);
    }
    getAllTrashFiles();
    fullScreenLoading.close();
  };

  const clearToDelete = () => {
    filesToDelete.clear();
    foldersToDelete.clear();
  };

  const deleteSingleFile = (fileId) => {
    clearToDelete();
    filesToDelete.add(fileId);

    confirmDeleteFiles(() => {
      deleteFilesAndFoldersPermanent();
    });
  };

  const deleteSingleFolder = (folderId) => {
    clearToDelete();
    foldersToDelete.add(folderId);

    confirmDeleteFiles(() => {
      deleteFilesAndFoldersPermanent();
    });
  };
  const confirmRestoreFile = (onFileRestore) => {
    infoModal.showInfoModal(
      "Restore File",
      "Are you sure you want to restore this file?",
      onFileRestore,
      "Restore"
    );
  };

  const restoreFile = async (fileId) => {
    fullScreenLoading.show();
    const adminService = new AdminService();
    const response = await adminService.restoreFile(fileId);
    if (response.status === 200) {
      const data = await response.json();
      infoModal.closeInfoModal();
      successModal.showSuccessModal("File successfully restored.");
    } else {
      const data = await response.json();
      errorModal.showErrorModal(data);
    }
    getAllTrashFiles();

    fullScreenLoading.close();
  };

  const confirmRestoreFolder = (onFolderRestore) => {
    infoModal.showInfoModal(
      "Restore Folder",
      "Are you sure you want to restore this folder?",
      onFolderRestore,
      "Restore"
    );
  };

  const restoreFolder = async (folderId) => {
    fullScreenLoading.show();
    const adminService = new AdminService();
    const response = await adminService.restoreFolder(folderId);
    if (response.status === 200) {
      const data = await response.json();
      infoModal.closeInfoModal();
      successModal.showSuccessModal(data);
    } else {
      const data = await response.json();
      errorModal.showErrorModal(data);
    }
    getAllTrashFiles();

    fullScreenLoading.close();
  };

  return (
    <div>
      <Navigation />
      <div className="m-lg-3 m-1">
        <Row>
          <Col className="d-none d-lg-flex" lg="2">
            <SideNav />
          </Col>
          <Col lg="10">
            <div className="sticky-top bg-white p-lg-3 p-1 d-flex justify-content-between shadow-sm">
              <h4 className="fw-bold">Trash</h4>
              <div className="d-flex align-items-center gap-3">
                <FormCheck label="Select All" />
                <ButtonGroup>
                  {foldersToDelete.size + filesToDelete.size !== 0 ? (
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        confirmDeleteFiles(() =>
                          deleteFilesAndFoldersPermanent()
                        );
                      }}>
                      <FontAwesomeIcon icon={faTrash} /> Delete Permanently
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="outline-danger"
                      onClick={() => {
                        confirmDeleteFiles(() =>
                          deleteFilesAndFoldersPermanent()
                        );
                      }}>
                      <FontAwesomeIcon icon={faTrash} /> Delete Permanently
                    </Button>
                  )}
                </ButtonGroup>
              </div>
            </div>
            <Row className="p-lg-3 p-1">
              {deletedFolders.length !== 0 && <span>Folders</span>}
              {deletedFolders.map((folder) => {
                return (
                  <Col lg="3" md="4" sm="6" xs="6" key={folder.folderId}>
                    <OverlayTrigger
                      placement="left"
                      overlay={
                        <Tooltip className="d-flex flex-column">
                          <div className="fw-bold"> {folder.folderName}</div>
                          <div>{folder.folderDescription}</div>
                        </Tooltip>
                      }>
                      <Card className="pointer-hover bg-light p-2 m-1">
                        <div
                          className="d-flex justify-content-between align-items-center"
                          style={{ width: "100%" }}>
                          <div className="d-flex text-truncate">
                            <FormCheck
                              className=" pe-1 ps-1"
                              onChange={(e) => {
                                handleFolderCheckChange(e, folder.folderId);
                              }}
                            />
                            <span className="pe-1">
                              <FontAwesomeIcon icon={faFolder} />
                            </span>

                            <span className="text-truncate">
                              {folder.folderName}
                            </span>
                          </div>

                          <Dropdown className="ellipsis-v rounded ms-1">
                            <Dropdown.Toggle
                              variant="none"
                              className="p-2 rounded custom-dropdown-toggle"
                              id="dropdown-basic"></Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => {
                                  confirmRestoreFolder(() => {
                                    restoreFolder(folder.folderId);
                                  });
                                }}>
                                Restore
                              </Dropdown.Item>

                              <Dropdown.Item
                                variant="danger"
                                onClick={() => {
                                  deleteSingleFolder(folder.folderId);
                                }}>
                                Delete Permanently
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Card>
                    </OverlayTrigger>
                  </Col>
                );
              })}
            </Row>
            <Row className="p-lg-3 p-1">
              {deletedFiles.length !== 0 && <span>Files</span>}
              {deletedFiles.map((file) => {
                return (
                  <Col lg="3" md="4" sm="6" xs="6" key={file.fileId}>
                    <OverlayTrigger
                      placement="left"
                      overlay={
                        <Tooltip>
                          <div className="fw-bold"> {file.fileName}</div>
                          <div>{file.description}</div>
                        </Tooltip>
                      }>
                      <Card
                        className="bg-light p-2 m-1 "
                        style={{ height: "200px" }}>
                        <div
                          className="align-items-top d-flex justify-content-between"
                          style={{ width: "100%" }}>
                          <div
                            className="align-items-center d-flex text-truncate"
                            style={{ width: "100%" }}>
                            <FormCheck
                              className="pe-1 ps-1"
                              onChange={(e) => {
                                handleFileCheckChange(e, file.fileId);
                              }}
                            />

                            <span className="text-truncate">
                              {file.fileName}
                            </span>
                            <span>.{file.fileType}</span>
                          </div>

                          <Dropdown className="ellipsis-v rounded ms-1">
                            <Dropdown.Toggle
                              variant="none"
                              className="p-2 rounded custom-dropdown-toggle"
                              id="dropdown-basic"></Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => {
                                  confirmRestoreFile(() => {
                                    restoreFile(file.fileId);
                                  });
                                }}>
                                Restore
                              </Dropdown.Item>

                              <Dropdown.Item
                                onClick={() => {
                                  deleteSingleFile(file.fileId);
                                }}>
                                Delete Permanently
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: "100%" }}
                          onMouseEnter={() => {
                            document.querySelector(
                              `#fileIcon_${file.fileId}`
                            ).style.display = "none";
                            document.querySelector(
                              `#file_${file.fileId}`
                            ).style.display = "flex";
                          }}
                          onMouseLeave={() => {
                            document.querySelector(
                              `#fileIcon_${file.fileId}`
                            ).style.display = "flex";
                            document.querySelector(
                              `#file_${file.fileId}`
                            ).style.display = "none";
                          }}>
                          <FontAwesomeIcon
                            className="zoom-on-hover "
                            id={"fileIcon_" + file.fileId}
                            style={{ fontSize: "50px" }}
                            icon={faFile}
                          />
                          <div
                            className="justify-content-evenly w-100"
                            id={"file_" + file.fileId}
                            style={{ display: "none" }}>
                            <FontAwesomeIcon
                              className="zoom-on-hover "
                              style={{ fontSize: "30px" }}
                              icon={faTrashAlt}
                              onClick={() => {
                                deleteSingleFile(file.fileId);
                              }}
                            />
                            <FontAwesomeIcon
                              className="zoom-on-hover "
                              onClick={() => {
                                confirmRestoreFile(() => {
                                  restoreFile(file.fileId);
                                });
                              }}
                              style={{ fontSize: "30px" }}
                              icon={faTrashRestore}
                            />
                          </div>
                        </div>
                      </Card>
                    </OverlayTrigger>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};
